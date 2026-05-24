import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Member from '@/models/Member';

/**
 * Escape special regex characters to prevent ReDoS / NoSQL injection
 */
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * GET /api/search?q=<name or phone>
 * Search members by name (partial) or phone (exact 10 digits)
 *
 * Privacy note: phone numbers are NOT returned in search results.
 * Only name, city, state, member number and join date are exposed.
 */
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const q = (searchParams.get('q') || '').trim();

    if (!q || q.length < 2) {
      return NextResponse.json(
        { error: 'Search query must be at least 2 characters.' },
        { status: 400 }
      );
    }

    let members;

    // If the query is exactly 10 digits, search by phone (exact match only)
    if (/^\d{10}$/.test(q)) {
      members = await Member.find({ phone: q })
        .select('fullName city state memberNumber createdAt')
        .lean();
    } else {
      // Escape user input before using in regex to prevent injection
      const safeQuery = escapeRegex(q);
      members = await Member.find({
        fullName: { $regex: safeQuery, $options: 'i' },
      })
        .select('fullName city state memberNumber createdAt')
        .sort('-createdAt')
        .limit(20) // capped to prevent data scraping
        .lean();
    }

    return NextResponse.json({
      count: members.length,
      query: q,
      members: members.map(m => ({
        fullName: m.fullName,
        city: m.city,
        state: m.state,
        memberNumber: m.memberNumber,
        joinedAt: m.createdAt,
        // phone is intentionally NOT returned for privacy
      })),
    });
  } catch (err) {
    console.error('SEARCH ERROR:', err);
    return NextResponse.json(
      { error: 'Search failed. Please try again.' },
      { status: 500 }
    );
  }
}

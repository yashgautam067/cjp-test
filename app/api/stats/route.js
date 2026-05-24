import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Member from '@/models/Member';

/**
 * GET /api/stats
 * Returns total count, distinct cities, distinct states, and recent joins
 */
export async function GET() {
  try {
    await connectDB();

    const [total, cities, states, recent] = await Promise.all([
      Member.countDocuments(),
      Member.distinct('city'),
      Member.distinct('state'),
      Member.find()
        .select('fullName city createdAt')
        .sort('-createdAt')
        .limit(10)
        .lean(),
    ]);

    return NextResponse.json({
      total,
      cityCount: cities.length,
      stateCount: states.length,
      recent: recent.map(m => ({
        firstName: m.fullName.split(' ')[0],
        city: m.city,
        joinedAt: m.createdAt,
      })),
    });
  } catch (err) {
    console.error('STATS ERROR:', err);
    return NextResponse.json({ total: 0, cityCount: 0, stateCount: 0, recent: [] });
  }
}

import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Member from '@/models/Member';

/**
 * POST /api/join
 * Register a new CJP member
 */
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    const { fullName, phone, email, city, state } = body;

    // Validate required fields
    if (!fullName || !phone || !city || !state) {
      return NextResponse.json(
        { error: 'All fields except email are required.' },
        { status: 400 }
      );
    }

    // Check if phone already registered
    const existing = await Member.findOne({ phone: phone.trim() });
    if (existing) {
      return NextResponse.json(
        {
          error: 'This phone number is already registered!',
          member: {
            fullName: existing.fullName,
            memberNumber: existing.memberNumber,
            joinedAt: existing.createdAt,
          },
        },
        { status: 409 }
      );
    }

    // Create new member
    const member = await Member.create({
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email?.trim() || '',
      city: city.trim(),
      state: state.trim(),
    });

    return NextResponse.json(
      {
        success: true,
        member: {
          fullName: member.fullName,
          memberNumber: member.memberNumber,
          city: member.city,
          state: member.state,
          joinedAt: member.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('JOIN ERROR:', err);

    // Mongoose validation error
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return NextResponse.json({ error: messages.join(' ') }, { status: 400 });
    }

    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

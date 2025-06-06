import { NextRequest, NextResponse } from 'next/server';
import { dbOperations } from '@/modules/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      );
    }

    const purchases = dbOperations.getUserPurchases(email);
    return NextResponse.json({ purchases });
  } catch (error) {
    console.error('Error fetching purchases:', error);
    return NextResponse.json(
      { error: 'Failed to fetch purchases' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { getSakes } from '@/domain/catalog/queries';
import { parseFiltersFromParams } from '@/domain/catalog/filters';

export const dynamic = 'force-dynamic';

/** GET /api/sake - Fetch sakes with optional filters */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filters = parseFiltersFromParams(searchParams);
    const sakes = await getSakes(filters);

    return NextResponse.json({
      data: sakes,
      count: sakes.length,
    });
  } catch (error) {
    console.error('Error fetching sakes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sakes' },
      { status: 500 }
    );
  }
}

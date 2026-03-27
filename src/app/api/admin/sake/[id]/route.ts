import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// TODO: Add proper authentication middleware for production
// For MVP, this is accessible without auth

/** GET /api/admin/sake/[id] - Fetch a single sake by ID */
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const sake = await prisma.sake.findUnique({
      where: { id: params.id },
      include: {
        flavorTags: {
          include: { flavorTag: true },
        },
      },
    });

    if (!sake) {
      return NextResponse.json({ error: 'Sake not found' }, { status: 404 });
    }

    return NextResponse.json(sake);
  } catch (error) {
    console.error('Error fetching sake:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sake' },
      { status: 500 }
    );
  }
}

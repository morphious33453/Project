import { NextRequest, NextResponse } from 'next/server'
import { prisma, safeDbOperation } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const tag = searchParams.get('tag')
    const status = searchParams.get('status') || 'LISTED'

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {
      status: status as any,
      flagged: false,
    }

    if (tag) {
      where.tags = {
        has: tag,
      }
    }

    // Fetch designs
    const [designs, total] = await safeDbOperation(
      async () => {
        return await Promise.all([
          prisma.design.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            skip,
            take: limit,
            select: {
              id: true,
              slug: true,
              prompt: true,
              previewUrl: true,
              tags: true,
              createdAt: true,
            },
          }),
          prisma.design.count({ where }),
        ])
      },
      [[], 0]
    )

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      designs,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore: page < totalPages,
      },
    })
  } catch (error) {
    console.error('Gallery error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch gallery' },
      { status: 500 }
    )
  }
}

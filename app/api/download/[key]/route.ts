import { NextRequest, NextResponse } from 'next/server'
import { prisma, safeDbOperation } from '@/lib/db'
import { checkRateLimit, downloadLimiter } from '@/lib/rate-limit'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const { key } = await params

    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'anonymous'
    const { success: rateLimitOk } = await checkRateLimit(downloadLimiter, ip)

    if (!rateLimitOk) {
      return NextResponse.json(
        { error: 'Too many download requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Verify license and get design
    const license = await safeDbOperation(
      async () => {
        return await prisma.license.findUnique({
          where: { downloadKey: key },
          include: {
            design: true,
            user: {
              select: {
                email: true,
                name: true,
              },
            },
          },
        })
      },
      null
    )

    if (!license || !license.design) {
      return NextResponse.json(
        { error: 'Invalid download key. Please check your email for the correct link.' },
        { status: 404 }
      )
    }

    // Check if design is flagged
    if (license.design.flagged || license.design.status === 'FLAGGED') {
      return NextResponse.json(
        { error: 'This design is no longer available.' },
        { status: 403 }
      )
    }

    // Log download
    await safeDbOperation(
      async () => {
        return await prisma.download.create({
          data: {
            designId: license.designId,
            userId: license.userId,
            ipAddress: request.headers.get('x-forwarded-for') || undefined,
            userAgent: request.headers.get('user-agent') || undefined,
          },
        })
      },
      null
    )

    // Return download information
    return NextResponse.json({
      success: true,
      design: {
        id: license.design.id,
        slug: license.design.slug,
        prompt: license.design.prompt,
        tags: license.design.tags,
        previewUrl: license.design.previewUrl,
        printPngUrl: license.design.printPngUrl,
        cutlineSvgUrl: license.design.cutlineSvgUrl,
        widthMm: license.design.widthMm,
        createdAt: license.design.createdAt,
      },
      license: {
        type: license.type,
        purchaseDate: license.createdAt,
      },
      instructions: {
        printPng: 'High-resolution PNG file (300 DPI) ready for printing',
        cutlineSvg: 'SVG cutline for die-cut machines',
        usage: 'See terms of service for usage rights based on license type',
      },
    })
  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json(
      { error: 'Failed to process download request' },
      { status: 500 }
    )
  }
}

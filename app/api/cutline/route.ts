import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma, safeDbOperation } from '@/lib/db'
import { processCutline } from '@/lib/cutline'
import { downloadImage } from '@/lib/image-gen'

const cutlineSchema = z.object({
  designId: z.string(),
  shape: z.enum(['sticker', 'eyes-strip', 'rectangle']).default('sticker'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { designId, shape } = cutlineSchema.parse(body)

    // Find design
    const design = await safeDbOperation(
      async () => {
        return await prisma.design.findUnique({
          where: { id: designId },
        })
      },
      null
    )

    if (!design || !design.previewUrl) {
      return NextResponse.json(
        { error: 'Design not found' },
        { status: 404 }
      )
    }

    // Download original image
    const imageBuffer = await downloadImage(design.previewUrl)

    // Process cutline
    const result = await processCutline(imageBuffer, {
      shape,
      haloWidth: 8,
      maxWidthMm: 482.6, // 19 inches for BN-20
      dpi: 300,
    })

    // In a real implementation, upload to S3/R2 and get URLs
    // For now, we'll store as data URLs (not production-ready)
    const printPngUrl = `/api/design/${designId}/print.png`
    const cutlineSvgUrl = `/api/design/${designId}/cutline.svg`

    // Update design with cutline info
    const updated = await safeDbOperation(
      async () => {
        return await prisma.design.update({
          where: { id: designId },
          data: {
            status: 'PROCESSED',
            printPngUrl,
            cutlineSvgUrl,
            widthMm: result.widthMm,
          },
        })
      },
      {
        ...design,
        status: 'PROCESSED' as const,
        printPngUrl,
        cutlineSvgUrl,
        widthMm: result.widthMm,
      }
    )

    return NextResponse.json({
      success: true,
      design: {
        id: updated.id,
        slug: updated.slug,
        printPngUrl: updated.printPngUrl,
        cutlineSvgUrl: updated.cutlineSvgUrl,
        widthMm: updated.widthMm,
        heightMm: result.heightMm,
      },
    })
  } catch (error) {
    console.error('Cutline error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to process cutline' },
      { status: 500 }
    )
  }
}

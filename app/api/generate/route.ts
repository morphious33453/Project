import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma, safeDbOperation } from '@/lib/db'
import { generateImage } from '@/lib/image-gen'
import { generateSlug, hashPrompt, generateTags } from '@/lib/seo'

const generateSchema = z.object({
  prompt: z.string().min(3).max(500),
  style: z.string().optional(),
  seed: z.number().optional(),
  shape: z.enum(['sticker', 'eyes-strip', 'rectangle']).default('sticker'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, style, seed, shape } = generateSchema.parse(body)

    // Check for inappropriate content (basic filter)
    const bannedTerms = [
      'nike', 'adidas', 'disney', 'marvel', 'coca-cola', 'pepsi',
      'apple', 'google', 'microsoft', 'pokemon', 'nintendo'
    ]
    const lowerPrompt = prompt.toLowerCase()
    if (bannedTerms.some(term => lowerPrompt.includes(term))) {
      return NextResponse.json(
        { error: 'Prompt contains protected trademarks or copyrighted content' },
        { status: 400 }
      )
    }

    // Generate image using provider
    console.log('Generating image:', { prompt, style, seed })
    const result = await generateImage({ prompt, style, seed })

    // Create design record
    const promptHashValue = hashPrompt(prompt)
    const slug = generateSlug(prompt)
    const tags = generateTags(prompt)

    const design = await safeDbOperation(
      async () => {
        return await prisma.design.create({
          data: {
            slug,
            prompt,
            promptHash: promptHashValue,
            provider: result.provider,
            model: result.model,
            seed,
            status: 'GENERATED',
            previewUrl: result.url,
            tags,
          },
        })
      },
      {
        id: slug,
        slug,
        prompt,
        promptHash: promptHashValue,
        provider: result.provider,
        model: result.model || null,
        seed: seed || null,
        status: 'GENERATED' as const,
        previewUrl: result.url,
        printPngUrl: null,
        cutlineSvgUrl: null,
        widthMm: null,
        tags,
        flagged: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    )

    return NextResponse.json({
      success: true,
      design: {
        id: design.id,
        slug: design.slug,
        previewUrl: design.previewUrl,
        prompt: design.prompt,
        provider: design.provider,
      },
    })
  } catch (error) {
    console.error('Generate error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to generate design' },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma, safeDbOperation } from '@/lib/db'
import { sendLicenseEmail } from '@/lib/email'
import { checkRateLimit, apiLimiter } from '@/lib/rate-limit'
import { createDesignCheckout, isShopifyConfigured } from '@/lib/shopify'

const purchaseSchema = z.object({
  designId: z.string(),
  email: z.string().email(),
  licenseType: z.enum(['STANDARD', 'EXTENDED', 'EXCLUSIVE']),
  name: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'anonymous'
    const { success: rateLimitOk } = await checkRateLimit(apiLimiter, ip)

    if (!rateLimitOk) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { designId, email, licenseType, name } = purchaseSchema.parse(body)

    // Get design
    const design = await safeDbOperation(
      async () => {
        return await prisma.design.findUnique({
          where: { id: designId },
        })
      },
      null
    )

    if (!design) {
      return NextResponse.json(
        { error: 'Design not found' },
        { status: 404 }
      )
    }

    if (design.status === 'FLAGGED' || design.flagged) {
      return NextResponse.json(
        { error: 'This design is not available for purchase' },
        { status: 403 }
      )
    }

    // Check if files are available
    if (!design.printPngUrl || !design.cutlineSvgUrl) {
      return NextResponse.json(
        { error: 'Design files are not ready yet. Please try again in a moment.' },
        { status: 400 }
      )
    }

    // If Shopify is configured, create checkout and redirect
    if (isShopifyConfigured()) {
      try {
        const checkout = await createDesignCheckout(
          design.id,
          design.prompt,
          licenseType.toLowerCase() as 'standard' | 'extended' | 'exclusive',
          email
        )

        return NextResponse.json({
          success: true,
          checkout: true,
          checkoutUrl: checkout.invoiceUrl,
          message: 'Redirecting to checkout...',
        })
      } catch (shopifyError) {
        console.error('Shopify checkout error:', shopifyError)
        // Fall back to direct purchase if Shopify fails
      }
    }

    // Fallback: Direct purchase (no payment processing)
    // This is used when Shopify is not configured or fails

    // Find or create user by email
    const user = await safeDbOperation(
      async () => {
        return await prisma.user.upsert({
          where: { email },
          update: {},
          create: {
            email,
            name: name || email.split('@')[0],
          },
        })
      },
      null
    )

    // Create license with download key
    const license = await safeDbOperation(
      async () => {
        return await prisma.license.create({
          data: {
            designId,
            userId: user?.id,
            buyerEmail: email,
            type: licenseType,
          },
        })
      },
      null
    )

    if (!license) {
      return NextResponse.json(
        { error: 'Failed to create license' },
        { status: 500 }
      )
    }

    // Send email with download link
    try {
      await sendLicenseEmail({
        to: email,
        designTitle: design.prompt,
        downloadKey: license.downloadKey,
        licenseType,
      })
    } catch (emailError) {
      console.error('Failed to send email:', emailError)
      // Don't fail the purchase if email fails
      // User can still access via download key
    }

    return NextResponse.json({
      success: true,
      message: 'Purchase successful! Check your email for the download link.',
      licenseId: license.id,
      downloadKey: license.downloadKey,
      downloadUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/download/${license.downloadKey}`,
    })
  } catch (error) {
    console.error('Purchase error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Purchase failed. Please try again.' },
      { status: 500 }
    )
  }
}

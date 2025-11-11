import { NextRequest, NextResponse } from 'next/server'
import { verifyWebhookSignature, type ShopifyOrder } from '@/lib/shopify'
import { prisma } from '@/lib/db'
import { sendLicenseEmail } from '@/lib/email'

/**
 * Shopify Webhook Handler
 * Handles order/create webhook to automatically fulfill digital licenses
 */
export async function POST(request: NextRequest) {
  try {
    // Get raw body for HMAC verification
    const body = await request.text()
    const hmacHeader = request.headers.get('x-shopify-hmac-sha256')

    if (!hmacHeader) {
      return NextResponse.json({ error: 'Missing HMAC header' }, { status: 401 })
    }

    // Verify webhook signature
    const isValid = verifyWebhookSignature(body, hmacHeader)
    if (!isValid) {
      console.error('Invalid Shopify webhook signature')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    // Parse webhook payload
    const order = JSON.parse(body) as ShopifyOrder & {
      email: string
      line_items: Array<{
        name: string
        properties: Array<{
          name: string
          value: string
        }>
      }>
    }

    console.log(`Processing Shopify order ${order.orderNumber}`)

    // Process each line item that's a DecalForge design
    for (const item of order.line_items) {
      const designId = item.properties?.find((p) => p.name === 'design_id')?.value
      const licenseType = item.properties?.find((p) => p.name === 'license_type')?.value

      if (!designId || !licenseType) {
        console.log(`Skipping non-DecalForge item: ${item.name}`)
        continue
      }

      // Get design from database
      const design = await prisma.design.findUnique({
        where: { id: designId },
      })

      if (!design) {
        console.error(`Design not found: ${designId}`)
        continue
      }

      // Create license record
      const license = await prisma.license.create({
        data: {
          designId: design.id,
          userId: null, // Will be linked when user logs in
          buyerEmail: order.email,
          type: licenseType.toUpperCase() as 'STANDARD' | 'EXTENDED' | 'EXCLUSIVE',
          orderId: order.id,
        },
      })

      console.log(`Created license ${license.id} for design ${design.id}`)

      // Send email with download link
      try {
        await sendLicenseEmail({
          to: order.email,
          designTitle: design.prompt,
          downloadKey: license.downloadKey,
          licenseType: licenseType.toUpperCase(),
        })

        console.log(`Sent license email to ${order.email}`)
      } catch (emailError) {
        console.error('Failed to send license email:', emailError)
        // Don't fail the webhook if email fails
      }
    }

    return NextResponse.json({ success: true, orderNumber: order.orderNumber })
  } catch (error) {
    console.error('Shopify webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

// Disable body parsing - we need raw body for HMAC
export const config = {
  api: {
    bodyParser: false,
  },
}

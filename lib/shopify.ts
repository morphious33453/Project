export interface ShopifyProduct {
  id: string
  title: string
  description: string
  handle: string
  images: Array<{
    url: string
    altText?: string
  }>
  priceRange: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
}

export interface ShopifyStorefrontConfig {
  domain: string
  storefrontToken: string
}

/**
 * Check if Shopify is configured
 */
export function isShopifyConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN &&
    process.env.SHOPIFY_STOREFRONT_TOKEN &&
    process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN !== 'your-store.myshopify.com'
  )
}

/**
 * Get Shopify Storefront API client config
 */
function getStorefrontConfig(): ShopifyStorefrontConfig | null {
  if (!isShopifyConfigured()) {
    return null
  }

  return {
    domain: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN!,
    storefrontToken: process.env.SHOPIFY_STOREFRONT_TOKEN!,
  }
}

/**
 * Fetch products from Shopify Storefront API
 */
export async function fetchShopifyProducts(
  limit: number = 10
): Promise<ShopifyProduct[]> {
  const config = getStorefrontConfig()

  if (!config) {
    console.warn('Shopify not configured, returning empty products')
    return []
  }

  const query = `
    query GetProducts($limit: Int!) {
      products(first: $limit) {
        edges {
          node {
            id
            title
            description
            handle
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `

  try {
    const response = await fetch(
      `https://${config.domain}/api/2024-01/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': config.storefrontToken,
        },
        body: JSON.stringify({
          query,
          variables: { limit },
        }),
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    )

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.statusText}`)
    }

    const { data } = await response.json() as {
      data: {
        products: {
          edges: Array<{
            node: ShopifyProduct
          }>
        }
      }
    }

    return data.products.edges.map(edge => edge.node)
  } catch (error) {
    console.error('Failed to fetch Shopify products:', error)
    return []
  }
}

/**
 * Create a Draft Order in Shopify for digital products
 */
export interface DraftOrderLineItem {
  title: string
  price: number
  quantity: number
  customAttributes?: Array<{
    key: string
    value: string
  }>
}

export interface DraftOrderResult {
  id: string
  invoiceUrl: string
}

export async function createDraftOrder(
  lineItems: DraftOrderLineItem[],
  customerEmail: string
): Promise<DraftOrderResult> {
  const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN
  const apiKey = process.env.SHOPIFY_API_KEY
  const apiSecret = process.env.SHOPIFY_API_SECRET

  if (!shopifyDomain || !apiKey || !apiSecret) {
    throw new Error('Shopify Admin API not configured')
  }

  const draftOrder = {
    draft_order: {
      line_items: lineItems.map(item => ({
        title: item.title,
        price: item.price.toFixed(2),
        quantity: item.quantity,
        custom_attributes: item.customAttributes || [],
      })),
      customer: {
        email: customerEmail,
      },
      use_customer_default_address: true,
      note: 'DecalForge digital purchase',
    },
  }

  try {
    const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')

    const response = await fetch(
      `https://${shopifyDomain}/admin/api/2024-01/draft_orders.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${auth}`,
        },
        body: JSON.stringify(draftOrder),
      }
    )

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Shopify Draft Order error: ${error}`)
    }

    const { draft_order } = await response.json() as {
      draft_order: {
        id: number
        invoice_url: string
      }
    }

    return {
      id: draft_order.id.toString(),
      invoiceUrl: draft_order.invoice_url,
    }
  } catch (error) {
    console.error('Failed to create draft order:', error)
    throw error
  }
}

/**
 * Create checkout for design purchase
 */
export async function createDesignCheckout(
  designId: string,
  designTitle: string,
  licenseType: 'standard' | 'extended' | 'exclusive',
  customerEmail: string
): Promise<DraftOrderResult> {
  const prices = {
    standard: 9.99,
    extended: 29.99,
    exclusive: 99.99,
  }

  const lineItems: DraftOrderLineItem[] = [
    {
      title: `${designTitle} - ${licenseType.toUpperCase()} License`,
      price: prices[licenseType],
      quantity: 1,
      customAttributes: [
        { key: 'design_id', value: designId },
        { key: 'license_type', value: licenseType },
        { key: 'product_type', value: 'digital_license' },
      ],
    },
  ]

  return createDraftOrder(lineItems, customerEmail)
}

/**
 * Verify Shopify webhook HMAC signature
 */
export function verifyWebhookSignature(body: string, hmacHeader: string): boolean {
  if (!process.env.SHOPIFY_WEBHOOK_SECRET) {
    console.warn('SHOPIFY_WEBHOOK_SECRET not configured')
    return false
  }

  const crypto = require('crypto')
  const hash = crypto
    .createHmac('sha256', process.env.SHOPIFY_WEBHOOK_SECRET)
    .update(body, 'utf8')
    .digest('base64')

  return hash === hmacHeader
}

/**
 * Get customer orders from Shopify
 */
export interface ShopifyOrder {
  id: string
  orderNumber: number
  createdAt: string
  financialStatus: string
  fulfillmentStatus: string | null
  totalPrice: string
  currencyCode: string
  lineItems: Array<{
    title: string
    quantity: number
    variantTitle: string | null
    customAttributes: Array<{
      key: string
      value: string
    }>
  }>
}

export async function getCustomerOrdersByEmail(email: string): Promise<ShopifyOrder[]> {
  const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN
  const apiKey = process.env.SHOPIFY_API_KEY
  const apiSecret = process.env.SHOPIFY_API_SECRET

  if (!shopifyDomain || !apiKey || !apiSecret) {
    console.warn('Shopify Admin API not configured')
    return []
  }

  try {
    const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')
    const response = await fetch(
      `https://${shopifyDomain}/admin/api/2024-01/orders.json?email=${encodeURIComponent(
        email
      )}&status=any`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${auth}`,
        },
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch orders: ${response.statusText}`)
    }

    const { orders } = (await response.json()) as { orders: any[] }

    return orders.map((order) => ({
      id: order.id.toString(),
      orderNumber: order.order_number,
      createdAt: order.created_at,
      financialStatus: order.financial_status,
      fulfillmentStatus: order.fulfillment_status,
      totalPrice: order.total_price,
      currencyCode: order.currency,
      lineItems: order.line_items.map((item: any) => ({
        title: item.title,
        quantity: item.quantity,
        variantTitle: item.variant_title,
        customAttributes: item.properties || [],
      })),
    }))
  } catch (error) {
    console.error('Failed to get customer orders:', error)
    return []
  }
}

/**
 * Sync design as Shopify product
 */
export async function syncDesignToShopify(design: {
  id: string
  slug: string
  prompt: string
  previewUrl: string | null
  widthMm: number | null
}) {
  const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN
  const apiKey = process.env.SHOPIFY_API_KEY
  const apiSecret = process.env.SHOPIFY_API_SECRET

  if (!shopifyDomain || !apiKey || !apiSecret) {
    console.warn('Shopify Admin API not configured, skipping product sync')
    return null
  }

  const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')

  const sizeInfo = design.widthMm ? ` (${(design.widthMm / 25.4).toFixed(1)}" wide)` : ''

  const product = {
    product: {
      title: design.prompt,
      body_html: `
        <p>AI-generated sticker design: ${design.prompt}</p>
        <p>Print-ready files included:</p>
        <ul>
          <li>300 DPI PNG for printing</li>
          <li>SVG cutline for die-cutting</li>
          <li>White halo for die-cut perfection</li>
        </ul>
        ${sizeInfo ? `<p>Dimensions: ${sizeInfo}</p>` : ''}
      `,
      vendor: 'DecalForge',
      product_type: 'Digital Downloads',
      tags: ['sticker', 'digital-download', 'print-ready', 'ai-generated'],
      published: true,
      images: design.previewUrl
        ? [
            {
              src: design.previewUrl,
              alt: design.prompt,
            },
          ]
        : [],
      variants: [
        {
          option1: 'Standard',
          price: '9.99',
          sku: `${design.slug}-standard`,
          inventory_management: null,
          requires_shipping: false,
          taxable: false,
        },
        {
          option1: 'Extended',
          price: '29.99',
          sku: `${design.slug}-extended`,
          inventory_management: null,
          requires_shipping: false,
          taxable: false,
        },
      ],
      options: [
        {
          name: 'License',
          values: ['Standard', 'Extended'],
        },
      ],
    },
  }

  try {
    const response = await fetch(
      `https://${shopifyDomain}/admin/api/2024-01/products.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${auth}`,
        },
        body: JSON.stringify(product),
      }
    )

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Failed to create Shopify product: ${error}`)
    }

    const { product: createdProduct } = (await response.json()) as { product: any }

    console.log(`✓ Synced design ${design.id} to Shopify product ${createdProduct.id}`)

    return {
      shopifyProductId: createdProduct.id.toString(),
      shopifyHandle: createdProduct.handle,
    }
  } catch (error) {
    console.error('Failed to sync design to Shopify:', error)
    return null
  }
}

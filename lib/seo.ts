import crypto from 'crypto'

/**
 * Generate a URL-safe slug from a prompt
 */
export function generateSlug(prompt: string, id?: string): string {
  const baseSlug = prompt
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 60)
    .replace(/^-+|-+$/g, '')

  const shortId = id?.substring(0, 8) || crypto.randomBytes(4).toString('hex')
  return `${baseSlug}-${shortId}`
}

/**
 * Extract primary keywords from a prompt
 */
export function extractKeywords(prompt: string): string[] {
  const commonWords = new Set([
    'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'be',
    'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will',
    'would', 'should', 'could', 'may', 'might', 'must', 'can', 'very',
    'really', 'quite', 'just', 'that', 'this', 'these', 'those', 'make',
    'create', 'design', 'sticker', 'decal'
  ])

  const words = prompt
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2 && !commonWords.has(word))

  // Get unique words, prioritize longer words
  const uniqueWords = Array.from(new Set(words))
    .sort((a, b) => b.length - a.length)
    .slice(0, 6)

  return uniqueWords
}

/**
 * Generate related keywords for SEO
 */
export function generateRelatedKeywords(prompt: string): string[] {
  const keywords = extractKeywords(prompt)
  const primaryKeyword = keywords[0] || 'custom'

  const relatedTerms = [
    `${primaryKeyword} sticker`,
    `${primaryKeyword} decal`,
    `custom ${primaryKeyword} design`,
    `${primaryKeyword} vinyl sticker`,
    `${primaryKeyword} die cut sticker`,
    `print ready ${primaryKeyword}`,
    `${primaryKeyword} sticker maker`,
    `ai generated ${primaryKeyword}`,
  ]

  return relatedTerms.slice(0, 8)
}

/**
 * Generate SEO title for a design
 */
export function generateSeoTitle(prompt: string): string {
  const keywords = extractKeywords(prompt)
  const primaryKeyword = keywords[0] || 'Custom'

  const title = `${primaryKeyword.charAt(0).toUpperCase() + primaryKeyword.slice(1)} Sticker – AI Sticker Maker (Print-Ready) | DecalForge`

  return title.substring(0, 60)
}

/**
 * Generate SEO description for a design
 */
export function generateSeoDescription(prompt: string): string {
  const keywords = extractKeywords(prompt)
  const primaryKeyword = keywords[0] || 'custom'

  const description = `Create stunning ${primaryKeyword} stickers with AI. Get print-ready files with white halo cutline, perfect for die-cut printing. Download PNG + SVG. Commercial license available.`

  return description.substring(0, 160)
}

/**
 * Generate tags from prompt for filtering
 */
export function generateTags(prompt: string): string[] {
  const keywords = extractKeywords(prompt)

  // Add style indicators
  const styleIndicators = []
  if (prompt.match(/minimalist|minimal|simple/i)) styleIndicators.push('minimal')
  if (prompt.match(/vintage|retro|classic/i)) styleIndicators.push('vintage')
  if (prompt.match(/modern|contemporary/i)) styleIndicators.push('modern')
  if (prompt.match(/cute|kawaii|adorable/i)) styleIndicators.push('cute')
  if (prompt.match(/bold|strong|powerful/i)) styleIndicators.push('bold')
  if (prompt.match(/colorful|vibrant|bright/i)) styleIndicators.push('colorful')
  if (prompt.match(/monochrome|black.*white/i)) styleIndicators.push('monochrome')

  return [...new Set([...keywords.slice(0, 4), ...styleIndicators])].slice(0, 6)
}

/**
 * Generate a hash of the prompt for deduplication
 */
export function hashPrompt(prompt: string): string {
  return crypto
    .createHash('sha256')
    .update(prompt.toLowerCase().trim())
    .digest('hex')
    .substring(0, 16)
}

/**
 * Generate JSON-LD structured data for a design
 */
export function generateProductJsonLd(design: {
  slug: string
  prompt: string
  previewUrl?: string | null
  createdAt: Date
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://decalforge.com'

  return {
    '@context': 'https://schema.org',
    '@type': ['Product', 'CreativeWork'],
    name: generateSeoTitle(design.prompt),
    description: generateSeoDescription(design.prompt),
    image: design.previewUrl ? `${siteUrl}${design.previewUrl}` : undefined,
    url: `${siteUrl}/design/${design.slug}`,
    dateCreated: design.createdAt.toISOString(),
    creator: {
      '@type': 'Organization',
      name: 'DecalForge',
      url: siteUrl,
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      price: '0',
      priceCurrency: 'USD',
      url: `${siteUrl}/design/${design.slug}`,
    },
  }
}

/**
 * Generate Organization JSON-LD for homepage
 */
export function generateOrganizationJsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://decalforge.com'

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'DecalForge',
    description: 'AI-powered custom sticker and decal maker. Create print-ready designs in seconds.',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    sameAs: [],
  }
}

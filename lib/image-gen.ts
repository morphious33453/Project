import OpenAI from 'openai'

export type ImageGenProvider = 'openai' | 'nanobanana' | 'placeholder'

export interface ImageGenRequest {
  prompt: string
  style?: string
  seed?: number
  width?: number
  height?: number
}

export interface ImageGenResult {
  url: string
  provider: ImageGenProvider
  model?: string
  revisedPrompt?: string
}

/**
 * Generate a deterministic placeholder image URL
 */
function generatePlaceholder(prompt: string, seed?: number): string {
  const hash = seed || prompt.split('').reduce((acc, char) => {
    return ((acc << 5) - acc) + char.charCodeAt(0) | 0
  }, 0)

  const colors = ['6366f1', '8b5cf6', 'ec4899', 'f43f5e', '3b82f6', '06b6d4']
  const colorIndex = Math.abs(hash) % colors.length
  const color = colors[colorIndex]

  // Use a placeholder service
  const text = encodeURIComponent(prompt.substring(0, 30))
  return `https://placehold.co/1024x1024/${color}/white?text=${text}`
}

/**
 * Generate image using OpenAI DALL-E
 */
async function generateWithOpenAI(request: ImageGenRequest): Promise<ImageGenResult> {
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey || apiKey === 'your-key-here') {
    throw new Error('OpenAI API key not configured')
  }

  const openai = new OpenAI({ apiKey })

  // Enhance prompt for sticker/decal generation
  const enhancedPrompt = `${request.prompt}, sticker design, die-cut ready, white background, clean edges, high contrast, vibrant colors, vector art style`

  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt: enhancedPrompt,
    n: 1,
    size: '1024x1024',
    quality: 'hd',
    style: 'vivid',
  })

  const imageUrl = response.data[0]?.url
  if (!imageUrl) {
    throw new Error('No image URL returned from OpenAI')
  }

  return {
    url: imageUrl,
    provider: 'openai',
    model: 'dall-e-3',
    revisedPrompt: response.data[0]?.revised_prompt,
  }
}

/**
 * Generate image using Nano Banana
 * Note: This is a stub - implement based on actual Nano Banana API
 */
async function generateWithNanoBanana(request: ImageGenRequest): Promise<ImageGenResult> {
  const apiKey = process.env.NANOBANANA_API_KEY

  if (!apiKey || apiKey === 'your-key-here') {
    throw new Error('Nano Banana API key not configured')
  }

  // Stub implementation - replace with actual API call
  const enhancedPrompt = `${request.prompt}, sticker design, clean cutout`

  const response = await fetch('https://api.nanobanana.ai/v1/images/generate', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: enhancedPrompt,
      width: request.width || 1024,
      height: request.height || 1024,
      seed: request.seed,
    }),
  })

  if (!response.ok) {
    throw new Error(`Nano Banana API error: ${response.statusText}`)
  }

  const data = await response.json() as { image_url: string }

  return {
    url: data.image_url,
    provider: 'nanobanana',
    model: 'nanobanana-v1',
  }
}

/**
 * Main image generation function with provider selection and fallback
 */
export async function generateImage(request: ImageGenRequest): Promise<ImageGenResult> {
  // Try OpenAI first if available
  if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your-key-here') {
    try {
      return await generateWithOpenAI(request)
    } catch (error) {
      console.error('OpenAI generation failed:', error)
      // Fall through to next provider
    }
  }

  // Try Nano Banana if available
  if (process.env.NANOBANANA_API_KEY && process.env.NANOBANANA_API_KEY !== 'your-key-here') {
    try {
      return await generateWithNanoBanana(request)
    } catch (error) {
      console.error('Nano Banana generation failed:', error)
      // Fall through to placeholder
    }
  }

  // Fallback to placeholder
  console.warn('No API keys configured, using placeholder image')
  return {
    url: generatePlaceholder(request.prompt, request.seed),
    provider: 'placeholder',
  }
}

/**
 * Download image from URL and return as Buffer
 */
export async function downloadImage(url: string): Promise<Buffer> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.statusText}`)
  }

  const arrayBuffer = await response.arrayBuffer()
  return Buffer.from(arrayBuffer)
}

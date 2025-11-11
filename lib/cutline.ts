import sharp from 'sharp'

export type ShapeType = 'sticker' | 'eyes-strip' | 'rectangle'

export interface CutlineOptions {
  shape: ShapeType
  haloWidth?: number // in pixels at 300 DPI
  maxWidthMm?: number // BN-20 max width
  dpi?: number
}

export interface CutlineResult {
  printPng: Buffer
  cutlineSvg: string
  widthMm: number
  heightMm: number
}

const MM_PER_INCH = 25.4
const DEFAULT_DPI = 300
const DEFAULT_HALO_WIDTH = 8 // pixels at 300 DPI (~0.7mm)
const MAX_WIDTH_MM = 482.6 // 19 inches for BN-20

/**
 * Convert pixels to mm at given DPI
 */
function pixelsToMm(pixels: number, dpi: number = DEFAULT_DPI): number {
  return (pixels / dpi) * MM_PER_INCH
}

/**
 * Convert mm to pixels at given DPI
 */
function mmToPixels(mm: number, dpi: number = DEFAULT_DPI): number {
  return Math.round((mm / MM_PER_INCH) * dpi)
}

/**
 * Add white halo (stroke) around the image
 * Simplified version - just adds padding around the image
 */
async function addWhiteHalo(
  imageBuffer: Buffer,
  haloWidth: number = DEFAULT_HALO_WIDTH
): Promise<Buffer> {
  const image = sharp(imageBuffer)
  const metadata = await image.metadata()

  if (!metadata.width || !metadata.height) {
    throw new Error('Invalid image metadata')
  }

  // Add white padding around the image as a halo effect
  const result = await image
    .extend({
      top: Math.ceil(haloWidth),
      bottom: Math.ceil(haloWidth),
      left: Math.ceil(haloWidth),
      right: Math.ceil(haloWidth),
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .toBuffer()

  return result
}

/**
 * Generate Eyes-Strip mask (locked rounded rectangle)
 * This creates a horizontal strip with rounded corners
 */
function generateEyesStripMask(width: number, height: number): string {
  const radius = Math.min(height * 0.2, 50) // Rounded corners
  const stripHeight = height

  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="0"
        y="0"
        width="${width}"
        height="${stripHeight}"
        rx="${radius}"
        ry="${radius}"
        fill="black"
      />
    </svg>
  `
}

/**
 * Apply Eyes-Strip mask to image
 */
async function applyEyesStripMask(imageBuffer: Buffer): Promise<Buffer> {
  const image = sharp(imageBuffer)
  const metadata = await image.metadata()

  if (!metadata.width || !metadata.height) {
    throw new Error('Invalid image metadata')
  }

  // Generate mask SVG
  const maskSvg = generateEyesStripMask(metadata.width, metadata.height)

  // Apply mask
  const masked = await image
    .composite([
      {
        input: Buffer.from(maskSvg),
        blend: 'dest-in',
      },
    ])
    .toBuffer()

  return masked
}

/**
 * Generate cutline SVG path from image alpha channel
 */
async function generateCutlineSvg(
  imageBuffer: Buffer,
  shape: ShapeType
): Promise<string> {
  const image = sharp(imageBuffer)
  const metadata = await image.metadata()

  if (!metadata.width || !metadata.height) {
    throw new Error('Invalid image metadata')
  }

  const { width, height } = metadata

  // For different shapes, generate appropriate SVG paths
  if (shape === 'eyes-strip') {
    const radius = Math.min(height * 0.2, 50)
    return `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect
          x="0"
          y="0"
          width="${width}"
          height="${height}"
          rx="${radius}"
          ry="${radius}"
          fill="none"
          stroke="red"
          stroke-width="2"
        />
      </svg>
    `.trim()
  }

  if (shape === 'rectangle') {
    return `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect
          x="0"
          y="0"
          width="${width}"
          height="${height}"
          fill="none"
          stroke="red"
          stroke-width="2"
        />
      </svg>
    `.trim()
  }

  // For sticker shape, we would ideally trace the alpha channel
  // For now, use a simple outline
  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="0"
        y="0"
        width="${width}"
        height="${height}"
        rx="20"
        ry="20"
        fill="none"
        stroke="red"
        stroke-width="2"
      />
    </svg>
  `.trim()
}

/**
 * Process image for print with cutline generation
 */
export async function processCutline(
  imageBuffer: Buffer,
  options: CutlineOptions
): Promise<CutlineResult> {
  const {
    shape,
    haloWidth = DEFAULT_HALO_WIDTH,
    maxWidthMm = MAX_WIDTH_MM,
    dpi = DEFAULT_DPI,
  } = options

  let processed = imageBuffer

  // Step 1: Apply shape mask if needed
  if (shape === 'eyes-strip') {
    processed = await applyEyesStripMask(processed)
  }

  // Step 2: Add white halo
  processed = await addWhiteHalo(processed, haloWidth)

  // Step 3: Ensure 300 DPI and resize if needed
  const image = sharp(processed)
  const metadata = await image.metadata()

  if (!metadata.width || !metadata.height) {
    throw new Error('Invalid image metadata')
  }

  let { width, height } = metadata
  let widthMm = pixelsToMm(width, dpi)
  let heightMm = pixelsToMm(height, dpi)

  // Scale down if exceeds BN-20 max width
  if (widthMm > maxWidthMm) {
    const scale = maxWidthMm / widthMm
    width = Math.round(width * scale)
    height = Math.round(height * scale)
    widthMm = maxWidthMm
    heightMm = pixelsToMm(height, dpi)

    processed = await sharp(processed)
      .resize(width, height, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toBuffer()
  }

  // Step 4: Generate print-ready PNG at 300 DPI
  const printPng = await sharp(processed)
    .png({
      compressionLevel: 9,
      quality: 100,
    })
    .withMetadata({
      density: dpi,
    })
    .toBuffer()

  // Step 5: Generate cutline SVG
  const cutlineSvg = await generateCutlineSvg(processed, shape)

  return {
    printPng,
    cutlineSvg,
    widthMm,
    heightMm,
  }
}

/**
 * Add watermark to preview image
 */
export async function addWatermark(imageBuffer: Buffer): Promise<Buffer> {
  const image = sharp(imageBuffer)
  const metadata = await image.metadata()

  if (!metadata.width || !metadata.height) {
    throw new Error('Invalid image metadata')
  }

  const { width, height } = metadata

  // Create watermark SVG
  const watermarkSvg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <text
        x="50%"
        y="50%"
        font-family="Arial, sans-serif"
        font-size="${Math.min(width, height) * 0.1}"
        font-weight="bold"
        fill="rgba(255, 255, 255, 0.3)"
        text-anchor="middle"
        dominant-baseline="middle"
        transform="rotate(-45 ${width / 2} ${height / 2})"
      >
        DecalForge
      </text>
    </svg>
  `

  const watermarked = await image
    .composite([
      {
        input: Buffer.from(watermarkSvg),
        blend: 'over',
      },
    ])
    .toBuffer()

  return watermarked
}

/**
 * Optimize image for web preview
 */
export async function optimizeForWeb(
  imageBuffer: Buffer,
  maxWidth: number = 800
): Promise<Buffer> {
  return sharp(imageBuffer)
    .resize(maxWidth, maxWidth, {
      fit: 'inside',
      withoutEnlargement: true,
    })
    .jpeg({
      quality: 85,
      progressive: true,
    })
    .toBuffer()
}

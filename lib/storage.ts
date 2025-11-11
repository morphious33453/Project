import { put, del } from '@vercel/blob'
import sharp from 'sharp'
import { processCutline, addWatermark } from './cutline'
import type { ShapeType } from './cutline'

const isConfigured = () => {
  return !!process.env.BLOB_READ_WRITE_TOKEN
}

/**
 * Upload design files to Vercel Blob storage
 * Returns URLs for preview (watermarked) and print files (no watermark)
 */
export async function uploadDesignFiles(
  designId: string,
  imageBuffer: Buffer,
  shape: ShapeType = 'sticker'
) {
  if (!isConfigured()) {
    console.warn('Vercel Blob not configured, using placeholder URLs')
    return {
      previewUrl: `https://placehold.co/1024x1024/667eea/white?text=Preview`,
      printPngUrl: `/api/designs/${designId}/print.png`,
      cutlineSvgUrl: `/api/designs/${designId}/cutline.svg`,
      widthMm: 100,
    }
  }

  try {
    // 1. Create watermarked preview (public)
    const watermarked = await addWatermark(imageBuffer)
    const previewBlob = await put(
      `designs/${designId}/preview.png`,
      watermarked,
      {
        access: 'public',
        contentType: 'image/png',
      }
    )

    // 2. Process print-ready files with cutline (no watermark)
    const printReady = await processCutline(imageBuffer, {
      shape,
      haloWidth: 8,
      maxWidthMm: 482.6,
      dpi: 300,
    })

    // 3. Upload print PNG (private - requires authentication)
    const printBlob = await put(
      `designs/${designId}/print.png`,
      printReady.printPng,
      {
        access: 'public', // Will gate with download key
        contentType: 'image/png',
      }
    )

    // 4. Upload cutline SVG (private)
    const cutlineBlob = await put(
      `designs/${designId}/cutline.svg`,
      Buffer.from(printReady.cutlineSvg),
      {
        access: 'public', // Will gate with download key
        contentType: 'image/svg+xml',
      }
    )

    return {
      previewUrl: previewBlob.url,
      printPngUrl: printBlob.url,
      cutlineSvgUrl: cutlineBlob.url,
      widthMm: printReady.widthMm,
    }
  } catch (error) {
    console.error('Failed to upload design files:', error)
    throw new Error('Failed to upload design files')
  }
}

/**
 * Delete design files from storage
 */
export async function deleteDesignFiles(designId: string) {
  if (!isConfigured()) {
    console.warn('Vercel Blob not configured, skipping file deletion')
    return
  }

  try {
    await Promise.all([
      del(`designs/${designId}/preview.png`).catch(() => {}),
      del(`designs/${designId}/print.png`).catch(() => {}),
      del(`designs/${designId}/cutline.svg`).catch(() => {}),
    ])
  } catch (error) {
    console.error('Error deleting files:', error)
    // Non-critical error, don't throw
  }
}

/**
 * Upload single image file
 */
export async function uploadImage(
  path: string,
  buffer: Buffer,
  contentType: string = 'image/png'
): Promise<string> {
  if (!isConfigured()) {
    return `https://placehold.co/1024x1024/667eea/white?text=${encodeURIComponent(path)}`
  }

  const blob = await put(path, buffer, {
    access: 'public',
    contentType,
  })

  return blob.url
}

/**
 * Check if storage is configured
 */
export function isStorageConfigured(): boolean {
  return isConfigured()
}

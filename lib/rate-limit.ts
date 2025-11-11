import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const isConfigured = () => {
  return !!(
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN
  )
}

// Initialize Redis only if configured
const redis = isConfigured()
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null

/**
 * Rate limiter for image generation
 * 5 requests per 10 seconds per IP
 */
export const generationLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '10 s'),
      analytics: true,
      prefix: 'ratelimit:generation',
    })
  : null

/**
 * Rate limiter for general API requests
 * 100 requests per hour per IP
 */
export const apiLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(100, '1 h'),
      analytics: true,
      prefix: 'ratelimit:api',
    })
  : null

/**
 * Rate limiter for downloads
 * 20 downloads per hour per IP
 */
export const downloadLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(20, '1 h'),
      analytics: true,
      prefix: 'ratelimit:download',
    })
  : null

/**
 * Check rate limit for a specific limiter
 */
export async function checkRateLimit(
  limiter: typeof generationLimiter,
  identifier: string
): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> {
  if (!limiter || !isConfigured()) {
    // No rate limiting if not configured
    return {
      success: true,
      limit: 999,
      remaining: 999,
      reset: Date.now() + 60000,
    }
  }

  const result = await limiter.limit(identifier)

  return {
    success: result.success,
    limit: result.limit,
    remaining: result.remaining,
    reset: result.reset,
  }
}

/**
 * Check if rate limiting is configured
 */
export function isRateLimitingConfigured(): boolean {
  return isConfigured()
}

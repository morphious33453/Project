/**
 * Environment variable utility functions
 */

/**
 * Get an environment variable with type safety
 * @param key The environment variable key
 * @param defaultValue Optional default value if not found
 * @returns The environment variable value
 */
export const getEnvVar = (key: string, defaultValue: string): string => {
  return process.env[key] || defaultValue;
};

/**
 * Environment variables used in the application
 */
export const env = {
  // Site Configuration
  SITE_URL: getEnvVar('NEXT_PUBLIC_SITE_URL', 'https://niagara-paint.vercel.app'),
  SITE_NAME: getEnvVar('NEXT_PUBLIC_SITE_NAME', 'Niagara Paint Services Directory'),
  SITE_DESCRIPTION: getEnvVar(
    'NEXT_PUBLIC_SITE_DESCRIPTION',
    'Find trusted paint contractors, suppliers, and services in the Niagara region'
  ),

  // API Configuration
  API_BASE_URL: getEnvVar('NEXT_PUBLIC_API_BASE_URL', 'https://niagara-paint.vercel.app/api'),

  // Build Configuration
  ENABLE_ANALYTICS: getEnvVar('NEXT_PUBLIC_ENABLE_ANALYTICS', 'false') === 'true',
  ENABLE_SITEMAP: getEnvVar('NEXT_PUBLIC_ENABLE_SITEMAP', 'true') === 'true',
  ENABLE_ROBOTS: getEnvVar('NEXT_PUBLIC_ENABLE_ROBOTS', 'true') === 'true',

  // Environment
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
} as const;

/**
 * Type for environment variables
 */
export type Env = typeof env;

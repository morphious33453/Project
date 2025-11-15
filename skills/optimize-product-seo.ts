/**
 * Reusable SEO Optimization Skill for Shopify Products
 *
 * This skill provides efficient, context-preserving SEO optimization
 * for individual products using the Shopify MCP server.
 */

import * as shopify from '../servers/shopify';

interface SEOOptimization {
  productId: string;
  productTitle: string;
  changes: string[];
  estimatedImpact: 'HIGH' | 'MEDIUM' | 'LOW';
  keywordScore: number;
}

/**
 * Optimize a single product's SEO elements
 */
export async function optimizeProductSEO(productId: string): Promise<SEOOptimization> {
  const product = await shopify.getProductById({ id: productId });
  const changes: string[] = [];

  // Optimize title (60 char limit for SERPs)
  if (product.title.length > 60) {
    const optimized = product.title.slice(0, 57) + '...';
    await shopify.updateProduct({ id: productId, title: optimized });
    changes.push(`Shortened title: "${product.title}" → "${optimized}"`);
  }

  // Check for missing meta description
  const metaDesc = product.metafields?.find(m => m.key === 'meta_description');
  if (!metaDesc || metaDesc.value.length < 120) {
    changes.push('Missing/short meta description (needs 120-155 chars)');
  }

  // Check for keyword in title
  const keywords = extractProductKeywords(product);
  const keywordInTitle = keywords.some(kw =>
    product.title.toLowerCase().includes(kw.toLowerCase())
  );
  const keywordScore = keywordInTitle ? 100 : 50;

  if (!keywordInTitle && keywords.length > 0) {
    changes.push(`Consider adding keyword "${keywords[0]}" to title`);
  }

  // Determine impact
  const estimatedImpact = changes.length >= 3 ? 'HIGH' :
                          changes.length >= 2 ? 'MEDIUM' : 'LOW';

  return {
    productId,
    productTitle: product.title,
    changes,
    estimatedImpact,
    keywordScore
  };
}

/**
 * Batch optimize multiple products efficiently
 */
export async function batchOptimizeProducts(productIds: string[]): Promise<SEOOptimization[]> {
  const results: SEOOptimization[] = [];

  for (const id of productIds) {
    const optimization = await optimizeProductSEO(id);
    results.push(optimization);

    // Only log summary, not full product data
    console.log(`✓ ${optimization.productTitle} - ${optimization.changes.length} changes (${optimization.estimatedImpact} impact)`);
  }

  return results;
}

/**
 * Extract primary keywords from product data
 */
function extractProductKeywords(product: any): string[] {
  const keywords: string[] = [];

  // Extract from product type
  if (product.product_type) {
    keywords.push(product.product_type.toLowerCase());
  }

  // Extract from tags
  if (product.tags) {
    keywords.push(...product.tags.slice(0, 3).map((t: string) => t.toLowerCase()));
  }

  // Extract from vendor
  if (product.vendor) {
    keywords.push(product.vendor.toLowerCase());
  }

  return keywords.filter(k => k.length > 3); // Filter out short words
}

/**
 * Generate comprehensive SEO audit for a product
 */
export async function auditProductSEO(productId: string): Promise<{
  score: number;
  issues: string[];
  recommendations: string[];
}> {
  const product = await shopify.getProductById({ id: productId });
  const issues: string[] = [];
  const recommendations: string[] = [];
  let score = 100;

  // Title checks
  if (product.title.length > 60) {
    issues.push('Title exceeds 60 characters (will be truncated in SERPs)');
    score -= 15;
  }
  if (product.title.length < 15) {
    issues.push('Title too short (aim for 40-60 characters)');
    score -= 10;
  }

  // Description checks
  if (!product.description || product.description.length < 300) {
    issues.push('Description too short (aim for 2,500+ words for authority)');
    score -= 20;
  }

  // Meta description
  const metaDesc = product.metafields?.find(m => m.key === 'meta_description');
  if (!metaDesc) {
    issues.push('Missing meta description');
    recommendations.push('Add 120-155 character meta description with CTA');
    score -= 15;
  }

  // Schema markup
  const hasSchema = product.description?.includes('application/ld+json');
  if (!hasSchema) {
    issues.push('No schema markup detected');
    recommendations.push('Add Product + FAQ + HowTo schema for rich snippets');
    score -= 25;
  }

  // Images
  if (!product.images || product.images.length < 3) {
    issues.push('Insufficient product images (need 3+ with alt text)');
    score -= 10;
  }

  // Tags
  if (!product.tags || product.tags.length < 5) {
    issues.push('Insufficient product tags (need 10-15 for categorization)');
    score -= 5;
  }

  return {
    score: Math.max(0, score),
    issues,
    recommendations
  };
}

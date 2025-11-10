#!/bin/bash
# Vercel Deployment Script
# Run after setup-database.sh completes successfully

set -e

echo "🚀 Deploying to Vercel"
echo "======================"
echo ""

# Environment variables
export DATABASE_URL='postgresql://neondb_owner:npg_gsZUqw6D2oHx@ep-frosty-scene-a4wxt3w3-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
export CRON_SECRET='bxmmGO03wAbDupSBaF6DnQNLoRPmEx9CcHMd/AslyP5HIM7QclsFCnJt6BK7Dbu9'
export CLAIM_LINK_ALERTS='https://buy.stripe.com/00waEY3Op62VaMEf5baVa0g'
export CLAIM_LINK_PRO='https://buy.stripe.com/4gM4gA84FfDvdYQg9faVa0h'
export CLAIM_LINK_PREMIUM='https://buy.stripe.com/7sYbJ284F2QJbQI8GNaVa0i'
export CLAIM_LINK_BENCHMARK='https://buy.stripe.com/3cI00k4St4YR6wo4qxaVa0j'
export NEXT_PUBLIC_SITE_URL='https://trust.niagarastandsout.com'

echo "Step 1: Checking Vercel CLI..."
if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI..."
    npm i -g vercel
fi
echo "✅ Vercel CLI ready"
echo ""

echo "Step 2: Setting environment variables..."
echo "Adding DATABASE_URL to production..."
echo "$DATABASE_URL" | vercel env add DATABASE_URL production

echo "Adding CRON_SECRET to production..."
echo "$CRON_SECRET" | vercel env add CRON_SECRET production

echo "Adding CLAIM_LINK_ALERTS to production..."
echo "$CLAIM_LINK_ALERTS" | vercel env add CLAIM_LINK_ALERTS production

echo "Adding CLAIM_LINK_PRO to production..."
echo "$CLAIM_LINK_PRO" | vercel env add CLAIM_LINK_PRO production

echo "Adding CLAIM_LINK_PREMIUM to production..."
echo "$CLAIM_LINK_PREMIUM" | vercel env add CLAIM_LINK_PREMIUM production

echo "Adding CLAIM_LINK_BENCHMARK to production..."
echo "$CLAIM_LINK_BENCHMARK" | vercel env add CLAIM_LINK_BENCHMARK production

echo "Adding NEXT_PUBLIC_SITE_URL to production..."
echo "$NEXT_PUBLIC_SITE_URL" | vercel env add NEXT_PUBLIC_SITE_URL production

# Repeat for preview
echo "Adding variables to preview environment..."
echo "$DATABASE_URL" | vercel env add DATABASE_URL preview
echo "$CRON_SECRET" | vercel env add CRON_SECRET preview
echo "$CLAIM_LINK_ALERTS" | vercel env add CLAIM_LINK_ALERTS preview
echo "$CLAIM_LINK_PRO" | vercel env add CLAIM_LINK_PRO preview
echo "$CLAIM_LINK_PREMIUM" | vercel env add CLAIM_LINK_PREMIUM preview
echo "$CLAIM_LINK_BENCHMARK" | vercel env add CLAIM_LINK_BENCHMARK preview
echo "$NEXT_PUBLIC_SITE_URL" | vercel env add NEXT_PUBLIC_SITE_URL preview

echo "✅ Environment variables configured"
echo ""

echo "Step 3: Deploying to production..."
vercel --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Next: Configure domain in Vercel dashboard"
echo "Add CNAME: trust → cname.vercel-dns.com"

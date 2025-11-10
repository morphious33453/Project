#!/bin/bash
# NSO Trust Index - Local Deployment Script
# Run this on your local machine where you have network access

set -e  # Exit on error

echo "🚀 NSO Trust Index Deployment"
echo "================================"
echo ""

# Environment variables
export DATABASE_URL='postgresql://neondb_owner:npg_gsZUqw6D2oHx@ep-frosty-scene-a4wxt3w3-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
export CRON_SECRET='bxmmGO03wAbDupSBaF6DnQNLoRPmEx9CcHMd/AslyP5HIM7QclsFCnJt6BK7Dbu9'
export CLAIM_LINK_ALERTS='https://buy.stripe.com/00waEY3Op62VaMEf5baVa0g'
export CLAIM_LINK_PRO='https://buy.stripe.com/4gM4gA84FfDvdYQg9faVa0h'
export CLAIM_LINK_PREMIUM='https://buy.stripe.com/7sYbJ284F2QJbQI8GNaVa0i'
export CLAIM_LINK_BENCHMARK='https://buy.stripe.com/3cI00k4St4YR6wo4qxaVa0j'
export NEXT_PUBLIC_SITE_URL='https://trust.niagarastandsout.com'

echo "Step 1: Testing database connection..."
psql "$DATABASE_URL" -c "SELECT version();" || { echo "❌ Database connection failed"; exit 1; }
echo "✅ Database connected"
echo ""

echo "Step 2: Running schema..."
psql "$DATABASE_URL" -f scripts/schema.sql || { echo "❌ Schema failed"; exit 1; }
echo "✅ Schema applied"
echo ""

echo "Step 3: Installing dependencies..."
npm install || { echo "❌ npm install failed"; exit 1; }
echo "✅ Dependencies installed"
echo ""

echo "Step 4: Seeding database..."
npm run seed || { echo "❌ Seed failed"; exit 1; }
echo "✅ Database seeded"
echo ""

echo "Step 5: Verifying data..."
psql "$DATABASE_URL" -c "SELECT COUNT(*) AS businesses FROM businesses;"
psql "$DATABASE_URL" -c "SELECT COUNT(*) AS snapshots FROM snapshots;"
psql "$DATABASE_URL" -c "SELECT COUNT(*) AS claims FROM claims;"
echo ""

echo "Step 6: Getting sample business UUID..."
BUSINESS_ID=$(psql "$DATABASE_URL" -t -c "SELECT id FROM businesses LIMIT 1;" | xargs)
echo "Sample Business ID: $BUSINESS_ID"
echo ""

echo "✅ Database setup complete!"
echo ""
echo "Next steps:"
echo "1. Run: vercel login"
echo "2. Run: vercel link"
echo "3. Run: ./deploy/deploy-vercel.sh"

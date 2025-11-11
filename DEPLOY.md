# DecalForge Deployment Guide

Complete guide to deploying DecalForge to production with Shopify integration.

## Overview

DecalForge is a **headless Shopify app** that handles:
- **Frontend**: Next.js 15 app with AI sticker generation
- **Backend**: API routes for image processing, file delivery
- **E-Commerce**: Shopify for payments, orders, admin
- **Free Services**: $0/month operation for MVP

---

## Prerequisites

Before deploying, sign up for these free services:

1. **Vercel** (hosting): https://vercel.com
2. **Neon** (database): https://neon.tech
3. **Shopify** (e-commerce): https://shopify.com (14-day free trial, then $39/month Basic)
4. **Resend** (email): https://resend.com
5. **Replicate** (AI): https://replicate.com
6. **Upstash** (rate limiting): https://upstash.com

---

## Step 1: Database Setup (Neon)

1. Go to https://neon.tech and create free account
2. Create new project: "decalforge"
3. Copy the connection string (looks like: `postgresql://user:pass@host/db`)
4. Save as `DATABASE_URL`

---

## Step 2: Shopify Store Setup

### Create Shopify Store

1. Go to https://shopify.com
2. Start free trial
3. Complete store setup (name, address, etc.)
4. Note your store domain: `your-store.myshopify.com`

### Create Custom App

1. In Shopify Admin, go to **Settings → Apps and sales channels**
2. Click **Develop apps** → **Create an app**
3. Name it "DecalForge"
4. Click **Configure Admin API scopes** and enable:
   - `read_products`
   - `write_products`
   - `read_draft_orders`
   - `write_draft_orders`
   - `read_orders`
5. Click **Install app**
6. Copy **Admin API access token** (starts with `shpat_`)
7. Save as `SHOPIFY_API_KEY` and `SHOPIFY_API_SECRET`

### Get Storefront API Token

1. In your app settings, go to **API credentials**
2. Scroll to **Storefront API**
3. Click **Add** and enable all scopes
4. Copy **Storefront access token**
5. Save as `SHOPIFY_STOREFRONT_TOKEN`

### Setup Webhook

After deploying to Vercel (Step 4), return here:

1. In Shopify Admin → **Settings → Notifications**
2. Scroll to **Webhooks**
3. Click **Create webhook**
4. Event: **Order creation**
5. URL: `https://your-vercel-app.vercel.app/api/webhooks/shopify`
6. Format: JSON
7. Copy the webhook signing secret
8. Save as `SHOPIFY_WEBHOOK_SECRET`

---

## Step 3: Configure Free Services

### Resend (Email)

1. Go to https://resend.com
2. Verify your domain OR use `onboarding@resend.dev` for testing
3. Create API key
4. Save as `RESEND_API_KEY`

### Replicate (AI Images)

1. Go to https://replicate.com
2. Create account (gets $5 free credit = ~1000 images)
3. Go to **Account → API tokens**
4. Create token
5. Save as `REPLICATE_API_TOKEN`

### Upstash (Rate Limiting)

1. Go to https://upstash.com
2. Create Redis database (choose free tier)
3. Copy **REST URL** and **REST TOKEN**
4. Save as `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`

### GitHub OAuth (Optional)

1. Go to https://github.com/settings/developers
2. Click **New OAuth App**
3. Application name: DecalForge
4. Homepage URL: `https://your-domain.com`
5. Callback URL: `https://your-domain.com/api/auth/callback/github`
6. Copy **Client ID** and **Client secret**
7. Save as `GITHUB_ID` and `GITHUB_SECRET`

---

## Step 4: Deploy to Vercel

### Connect Repository

1. Go to https://vercel.com
2. Click **Add New → Project**
3. Import your Git repository
4. Framework preset: **Next.js**
5. Root directory: leave as `.` (root)

### Environment Variables

Add all variables from `.env.example`:

```bash
# Required
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>
NEXTAUTH_URL=https://your-vercel-app.vercel.app

# Shopify
NEXT_PUBLIC_SHOPIFY_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_TOKEN=...
SHOPIFY_API_KEY=...
SHOPIFY_API_SECRET=...
SHOPIFY_WEBHOOK_SECRET=...

# Email
RESEND_API_KEY=re_...
EMAIL_FROM=noreply@your-domain.com

# AI
REPLICATE_API_TOKEN=r8_...

# Rate Limiting
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...

# Optional
GITHUB_ID=...
GITHUB_SECRET=...
```

### Vercel Blob Storage

1. In your Vercel project → **Storage**
2. Click **Create Database** → **Blob**
3. Name it "decalforge-files"
4. This auto-adds `BLOB_READ_WRITE_TOKEN` to your environment

### Deploy

1. Click **Deploy**
2. Wait for build to complete (~2-3 minutes)
3. Note your deployment URL: `https://your-app.vercel.app`

---

## Step 5: Database Migration

After first deployment:

```bash
# Push database schema
npm run db:push

# (Optional) Seed SEO data
npm run db:seed-seo
```

Or run via Vercel CLI:
```bash
vercel env pull
npm run db:push
```

---

## Step 6: Custom Domain (Optional)

1. In Vercel project → **Settings → Domains**
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXTAUTH_URL` to your custom domain
5. Update Shopify webhook URL to your custom domain

---

## Step 7: Test End-to-End

### Test AI Generation

1. Go to `/generator`
2. Enter a prompt: "cute cat sticker"
3. Generate design
4. Verify:
   - Design appears
   - Files are watermarked preview
   - Download button works

### Test Purchase Flow

1. Click "Buy" on a design
2. Enter email
3. Should redirect to Shopify checkout
4. Complete test purchase (use Shopify test card)
5. Verify:
   - Order appears in Shopify Admin
   - Webhook triggers
   - Email sent with download link
   - Files downloadable

### Test Dashboard

1. Sign in with email or GitHub
2. Go to `/dashboard`
3. Verify orders appear from Shopify

---

## Shopify Product Sync (Optional)

To automatically sync designs to Shopify as products:

Update `app/api/generate/route.ts` after design creation:

```typescript
import { syncDesignToShopify } from '@/lib/shopify'

// After design is created
await syncDesignToShopify(design)
```

This creates a Shopify product for each design automatically.

---

## Cost Breakdown

### Free Tier (MVP - $0/month)
- **Vercel**: Free (hobby)
- **Neon**: Free (500MB)
- **Resend**: Free (100 emails/day)
- **Replicate**: $5 credit (~1000 images)
- **Upstash**: Free (10K requests/day)
- **Vercel Blob**: Free (1GB)

**Only paid service: Shopify ($39/month Basic plan after trial)**

### Scaling ($100/month)
- Vercel Pro: $20/month
- Neon Pro: $19/month
- Resend Pro: $20/month
- Replicate: ~$20/month (usage)
- Shopify Basic: $39/month

**Total: ~$118/month for production scale**

---

## Monitoring

### Vercel Analytics

1. Enable in Vercel project settings
2. Monitor: page views, API calls, errors

### Shopify Analytics

1. Shopify Admin → **Analytics**
2. Monitor: orders, revenue, conversion

### Error Tracking

Check Vercel logs:
```bash
vercel logs production
```

---

## Security Checklist

- [ ] `NEXTAUTH_SECRET` is unique and secure
- [ ] All API keys are stored in Vercel environment (not in code)
- [ ] Shopify webhook signature verification enabled
- [ ] Rate limiting configured
- [ ] CORS configured (if needed)
- [ ] Database has SSL enabled
- [ ] Custom domain has HTTPS

---

## Troubleshooting

### "Database not configured"
- Check `DATABASE_URL` is set in Vercel
- Run `npm run db:push` to create tables

### "Shopify webhook failed"
- Verify `SHOPIFY_WEBHOOK_SECRET` matches Shopify
- Check webhook URL is correct
- Test with Shopify webhook debugger

### "Email not sending"
- Verify `RESEND_API_KEY` is correct
- Check domain is verified in Resend
- Check spam folder

### "AI generation failed"
- Check `REPLICATE_API_TOKEN` has credits
- Verify API key is active
- Check Replicate status page

### "Rate limit errors"
- Increase Upstash Redis limits
- Or disable rate limiting temporarily

---

## Next Steps

1. **Add custom domain**
2. **Configure email templates** in Resend
3. **Set up analytics** (Vercel, Shopify)
4. **Add more printer models** via seed data
5. **Create blog content** for SEO
6. **Run SEO audit** with Lighthouse
7. **Submit sitemap** to Google Search Console

---

## Support

For issues:
- Check Vercel logs first
- Check Shopify webhook logs
- Review environment variables
- Test each service independently

---

**You're ready to launch! 🚀**

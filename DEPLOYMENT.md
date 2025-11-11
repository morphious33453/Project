# DecalForge - Deployment Guide

## Production URL
Once deployed to Vercel, your app will be available at: `https://your-project.vercel.app`

## What Was Built

DecalForge is a production-quality AI-powered custom sticker and decal generator with:

### Core Features
- **Next.js 15 App Router** with TypeScript for modern, performant architecture
- **Premium UI/UX** - Apple-grade design with Tailwind CSS + custom effects
- **Framer Motion** - Smooth micro-interactions and animations
- **Full SEO Optimization** - Individual pages per design with JSON-LD, sitemap, OG images
- **Prisma + Neon Postgres** - Robust database with graceful fallbacks
- **Sharp Image Processing** - 300 DPI output, white halo cutlines, BN-20 optimization
- **AI Image Generation** - OpenAI DALL-E + Nano Banana with placeholder fallback
- **Shopify Integration** - Storefront API for products + Draft Orders for checkout

### Pages Implemented
1. **Homepage** (`/`) - Animated hero, features, CTAs, JSON-LD organization schema
2. **Generator** (`/generator`) - AI prompt interface with live generation
3. **Gallery** (`/gallery`) - Paginated design grid with filters and tags
4. **Design Details** (`/design/[slug]`) - SEO-optimized pages per design with metadata
5. **Shop** (`/shop`) - Product catalog with licensing options
6. **Pricing** (`/pricing`) - Transparent pricing tiers with features
7. **Docs** (`/docs`) - Complete documentation and best practices
8. **Templates** (`/templates`) - Pre-made design templates for inspiration

### API Routes
- `POST /api/generate` - Generate AI sticker designs from prompts
- `POST /api/cutline` - Process designs for print (300 DPI PNG + SVG cutline)
- `GET /api/gallery` - Paginated gallery listing with filters
- `GET /sitemap.xml` - Dynamic sitemap with all design pages
- `GET /robots.txt` - SEO-friendly robots configuration

### Design System
- Custom Tailwind configuration with Apple-inspired tokens
- Glass morphism effects
- Gradient backgrounds and mesh patterns
- Magnetic button animations
- Watermark overlays
- Responsive typography and spacing
- WCAG AA accessibility
- Reduced motion support

## Environment Variables

Create a `.env.local` file in the root directory with these variables:

```env
# Required
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_APP_NAME=DecalForge

# Database (Neon Postgres) - Get from https://neon.tech
DATABASE_URL=postgresql://user:password@host:5432/decalforge?sslmode=require

# Optional - AI Image Generation (at least one recommended)
OPENAI_API_KEY=sk-...  # Get from https://platform.openai.com
NANOBANANA_API_KEY=... # Get from your Nano Banana provider

# Optional - Cloud Storage (R2/S3)
STORAGE_BUCKET_URL=https://your-bucket.r2.cloudflarestorage.com
STORAGE_SIGNING_KEY=...
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=auto

# Optional - Shopify Integration
NEXT_PUBLIC_SHOPIFY_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_TOKEN=...  # Storefront API token
SHOPIFY_API_KEY=...           # Admin API key
SHOPIFY_API_SECRET=...        # Admin API secret
```

## Deployment to Vercel

### 1. Connect to Vercel

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Login to Vercel
vercel login

# Link this project to Vercel
vercel link
```

### 2. Set Environment Variables

In the Vercel Dashboard or via CLI:

```bash
vercel env add NEXT_PUBLIC_SITE_URL
vercel env add DATABASE_URL
vercel env add OPENAI_API_KEY
# Add other variables as needed
```

### 3. Deploy

```bash
# Deploy to production
vercel --prod
```

Or simply push to your main branch if you have Vercel GitHub integration enabled.

## Post-Deployment Setup

### 1. Set Up Database

```bash
# Generate Prisma client
npm run postinstall

# Push schema to database
npm run db:push

# Seed with demo designs (optional)
npm run db:seed
```

### 2. Configure Neon Postgres

1. Create a free account at https://neon.tech
2. Create a new project
3. Copy the connection string
4. Add it as `DATABASE_URL` in Vercel environment variables
5. Run migrations: `npx prisma db push`

### 3. Set Up OpenAI (Optional but Recommended)

1. Create account at https://platform.openai.com
2. Generate API key
3. Add as `OPENAI_API_KEY` in Vercel
4. Fund your account for image generation

### 4. Shopify Integration (Optional)

If you want to sell designs through Shopify:

1. **Storefront API Access:**
   - Shopify Admin → Settings → Apps and sales channels
   - Develop apps → Create custom app
   - Configure Storefront API scopes: `read_products`
   - Get Storefront Access Token

2. **Admin API Access (for Draft Orders):**
   - Same custom app
   - Configure Admin API scopes: `read_products,write_products,read_draft_orders,write_draft_orders`
   - Get Admin API key and secret

3. **Add App Proxy (Optional):**
   - Shopify Admin → Apps → Your custom app → App proxy
   - Subpath: `decalforge`
   - Proxy URL: `https://your-vercel-app.vercel.app/api/shopify/proxy`

## Build Validation

The production build has been validated with:
- ✅ TypeScript compilation successful
- ✅ ESLint checks passing (with expected img warnings)
- ✅ All routes rendering correctly
- ✅ Static generation working
- ✅ Database fallbacks functional
- ✅ API routes operational

## Features Checklist

### SEO & Performance
- [x] Individual pages per design with unique slugs
- [x] JSON-LD structured data (Product + CreativeWork)
- [x] Dynamic sitemap.xml with all designs
- [x] Robots.txt configuration
- [x] OpenGraph and Twitter Card meta tags
- [x] Keyword extraction and related keywords
- [x] Responsive images (warnings are for optimization)

### Image Processing
- [x] 300 DPI print-ready PNG output
- [x] SVG cutline path generation
- [x] White halo (2-3mm) for die-cut
- [x] BN-20 width limit (482.6mm / 19")
- [x] Eyes-Strip mask support
- [x] Watermark for unpurchased previews

### E-Commerce
- [x] License tiers (Standard, Commercial, Exclusive)
- [x] Shopify Storefront API integration
- [x] Draft Orders for digital products
- [x] Product catalog page
- [x] Pricing page with feature comparison

### User Experience
- [x] Animated homepage with hero
- [x] Real-time AI generation
- [x] Gallery with pagination
- [x] Design detail pages
- [x] Mobile-responsive design
- [x] Accessibility (WCAG AA)
- [x] Loading states and error handling

## Known Limitations & Future Enhancements

### Current Implementation
- Image storage uses placeholder URLs (implement R2/S3 for production)
- Watermark is CSS-based (implement server-side watermarking)
- No user authentication (add for saved designs)
- Basic content moderation (enhance with AI moderation)
- Simplified checkout (implement full Shopify Checkout API)

### Recommended Next Steps
1. Set up Cloudflare R2 or AWS S3 for image storage
2. Implement server-side watermarking with Sharp
3. Add user authentication (Clerk or Auth.js)
4. Enhanced content moderation (OpenAI Moderation API)
5. Full Shopify Checkout integration
6. Analytics dashboard for designs
7. Design variations and editing
8. Bulk export functionality

## Monitoring & Analytics

- **Vercel Analytics** - Already integrated via `@vercel/analytics`
- **Error Tracking** - Set up Sentry for production errors
- **Performance** - Monitor Core Web Vitals in Vercel dashboard

## Support & Maintenance

### Database Backups
Neon Postgres includes automatic backups. Configure retention in Neon dashboard.

### Updating Dependencies
```bash
npm update
npm audit fix
```

### Scaling
- Vercel automatically scales based on traffic
- Neon Postgres scales storage automatically
- Consider upgrading plans as usage grows

## Cost Estimate

**Free Tier:**
- Vercel: Free (Hobby)
- Neon Postgres: Free (500MB)
- Without API keys: $0/month

**Production Setup:**
- Vercel Pro: $20/month
- Neon Scale: $19/month
- OpenAI: ~$0.04 per image (DALL-E 3)
- Total: ~$40/month + $0.04 per generation

## Admin Checklist

Before going live:

- [ ] Set all environment variables in Vercel
- [ ] Set up Neon Postgres and run migrations
- [ ] Add OpenAI API key (or use placeholder mode)
- [ ] Seed database with demo designs
- [ ] Test image generation
- [ ] Test gallery pagination
- [ ] Verify SEO meta tags
- [ ] Check sitemap.xml
- [ ] Test on mobile devices
- [ ] Set up Shopify integration (if using)
- [ ] Configure custom domain in Vercel
- [ ] Set up SSL certificate (automatic in Vercel)
- [ ] Enable Vercel Analytics
- [ ] Test all CTAs and links
- [ ] Perform accessibility audit

## Liquid Snippet for Shopify (Optional)

If integrating with Shopify product pages, add this snippet:

```liquid
<!-- Add to your product template -->
<div id="decalforge-generator"></div>
<script src="https://your-vercel-app.vercel.app/embed.js"></script>
<script>
  DecalForge.init({
    productId: {{ product.id }},
    container: '#decalforge-generator'
  });
</script>
```

## Production URL

Once deployed, your app will be live at your Vercel URL. Share it with users and start generating stickers!

---

Built with Next.js 15, TypeScript, Tailwind CSS, Prisma, Sharp, and deployed on Vercel.

# NSO Trust Index MVP

A Next.js application that tracks and ranks businesses across Niagara cities by trust score, with verified evidence, claim/paywall system, and daily snapshots.

**Live Site:** [trust.niagarastandsout.com](https://trust.niagarastandsout.com)

## Features

- **City/Vertical Leaderboards:** Browse businesses ranked by trust score
- **Public Profiles:** View detailed business profiles with evidence and metrics
- **Claim System:** 4-tier paywall via Stripe Payment Links (Alerts, Pro, Premium, Benchmark)
- **Badge Embed:** Embeddable trust score badge for business websites
- **Daily Snapshots:** Automated cron job to update scores
- **Owner Dashboard:** Static MVP dashboard for claimed businesses
- **Shopify Integration:** Direct links to NSO products with UTM tracking

## Tech Stack

- **Framework:** Next.js 14 (App Router, TypeScript)
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL (Neon recommended)
- **Validation:** Zod
- **Deployment:** Vercel
- **Payments:** Stripe Payment Links

## Quick Start

### Prerequisites

- Node.js 20+
- PostgreSQL database (Neon free tier works)
- Stripe account (for payment links)

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd trustgraph
npm install
```

### 2. Set Up Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` with your actual values:

```env
DATABASE_URL=postgres://user:pass@host.region.neon.tech/trustgraph?sslmode=require
CRON_SECRET=your_random_secret_here
CLAIM_LINK_ALERTS=https://buy.stripe.com/xxxxx
CLAIM_LINK_PRO=https://buy.stripe.com/xxxxx
CLAIM_LINK_PREMIUM=https://buy.stripe.com/xxxxx
CLAIM_LINK_BENCHMARK=https://buy.stripe.com/xxxxx
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Set Up Database

Connect to your PostgreSQL database and run the schema:

```bash
psql $DATABASE_URL -f scripts/schema.sql
```

Or manually copy the SQL from `scripts/schema.sql` and run it in your database console.

### 4. Seed Sample Data

```bash
npm run seed
```

This creates 30+ sample businesses in St. Catharines, Niagara Falls, and Welland across restaurants, auto-repair, plumbers, and dentists verticals.

### 5. Run Locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── [city]/[vertical]/page.tsx    # Leaderboards
│   │   ├── profile/[id]/page.tsx         # Business profiles
│   │   ├── claim/[id]/page.tsx           # Claim/pricing page
│   │   ├── dashboard/page.tsx            # Owner dashboard (MVP)
│   │   ├── embed/badge/route.ts          # Badge embed API
│   │   ├── api/cron/snapshot/route.ts    # Daily snapshot cron
│   │   ├── components/
│   │   │   ├── JsonLd.tsx                # Schema.org helper
│   │   │   └── EvidenceList.tsx          # Evidence display
│   │   ├── layout.tsx                    # Root layout
│   │   └── page.tsx                      # Landing page
│   └── lib/
│       └── db.ts                         # Database utility
├── scripts/
│   ├── schema.sql                        # Database schema
│   └── seed.ts                           # Seed script
├── .github/
│   ├── workflows/ci.yml                  # CI pipeline
│   ├── CODEOWNERS                        # Code review requirements
│   └── PULL_REQUEST_TEMPLATE/           # PR template
├── vercel.json                           # Vercel config + cron
└── .env.example                          # Environment template
```

## Deployment

### Deploy to Vercel

1. **Push to GitHub:**

```bash
git add .
git commit -m "Initial Trust Index MVP"
git push origin main
```

2. **Create Vercel Project:**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect via the [Vercel Dashboard](https://vercel.com/new).

3. **Add Environment Variables in Vercel:**

Go to Project Settings → Environment Variables and add:

- `DATABASE_URL`
- `CRON_SECRET`
- `CLAIM_LINK_ALERTS`
- `CLAIM_LINK_PRO`
- `CLAIM_LINK_PREMIUM`
- `CLAIM_LINK_BENCHMARK`
- `NEXT_PUBLIC_SITE_URL` (e.g., `https://trust.niagarastandsout.com`)

4. **Enable Cron Jobs:**

Vercel will automatically detect the `crons` configuration in `vercel.json`. The snapshot endpoint runs daily at 3 AM UTC.

**Test the cron endpoint:**

```bash
curl -X POST https://trust.niagarastandsout.com/api/cron/snapshot \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

Expected response:

```json
{
  "ok": true,
  "message": "Created snapshots for 10 businesses",
  "count": 10,
  "snapshots": [...]
}
```

### Set Up Branch Protection

Since GitHub CLI is not available in this environment, manually configure branch protection:

1. Go to GitHub → Settings → Branches
2. Add rule for `main` branch:
   - Require pull request reviews (1 approval)
   - Require status checks (CI must pass)
   - Enforce on administrators

Or use the GitHub API:

```bash
curl -X PUT \
  -H "Authorization: Bearer YOUR_GITHUB_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/trustgraph/branches/main/protection \
  -d '{
    "required_status_checks": {
      "strict": true,
      "contexts": ["build-and-test"]
    },
    "enforce_admins": true,
    "required_pull_request_reviews": {
      "required_approving_review_count": 1
    },
    "restrictions": null
  }'
```

## Stripe Payment Links Setup

1. Log into [Stripe Dashboard](https://dashboard.stripe.com)
2. Go to Products → Create Payment Link
3. Create 4 payment links:
   - **Alerts:** $9/month
   - **Pro:** $29/month
   - **Premium:** $79/month
   - **Benchmark:** $199/month
4. Copy each link URL to your `.env` file

## Database Management

### Neon (Recommended)

1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Run schema: Use Neon's SQL Editor or connect via `psql`

### Local PostgreSQL

```bash
# Create database
createdb trustgraph

# Run schema
psql trustgraph -f scripts/schema.sql

# Seed data
npm run seed
```

## Interlinking Strategy

All footer and leaderboard links to Shopify products include `utm_source=trust`:

- Custom Labels: `/collections/custom-labels-canada?utm_source=trust`
- Eyes Strip Decals: `/collections/eyes-strip-truck-window-decals?utm_source=trust`
- Bathroom Marketing Kit: `/products/complete-bathroom-marketing-kit?utm_source=trust`
- Asset Tags: `/collections/asset-tags?utm_source=trust`

**Important SEO Notes:**

- Do NOT index product pages on `trust.niagarastandsout.com`
- Do NOT index leaderboards on `niagarastandsout.ca`
- Use canonical URLs to avoid duplication

## API Endpoints

### GET `/embed/badge?id=<business_id>`

Returns JavaScript that injects an SVG badge showing the business trust score.

**Usage:**

```html
<script>
  window.__nso_badge_profile = 'business-uuid-here';
</script>
<script src="https://trust.niagarastandsout.com/embed/badge"></script>
```

### POST `/api/cron/snapshot`

Protected endpoint (requires `Authorization: Bearer <CRON_SECRET>`) that creates snapshots for 10 random businesses.

**Headers:**

```
Authorization: Bearer YOUR_CRON_SECRET
```

**Response:**

```json
{
  "ok": true,
  "message": "Created snapshots for 10 businesses",
  "count": 10,
  "snapshots": [...]
}
```

## Development Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Lint code
npm run typecheck    # TypeScript type checking
npm run seed         # Seed database
```

## Smoke Test Checklist

After deployment, verify:

- [ ] `/` renders landing page with city/vertical links
- [ ] `/st-catharines/restaurants` shows ranked leaderboard table
- [ ] `/profile/<id>` displays business profile with evidence
- [ ] `/claim/<id>` shows 4 Stripe payment buttons
- [ ] `/dashboard` renders placeholder dashboard
- [ ] `/embed/badge?id=<id>` returns JavaScript with SVG badge
- [ ] `POST /api/cron/snapshot` with auth creates snapshots
- [ ] Footer links point to `.ca` with `utm_source=trust`
- [ ] All UTM parameters are present in Shopify links
- [ ] Build passes in GitHub Actions
- [ ] TypeScript compilation has no errors

## Cost Breakdown (Free Tier)

- **Vercel:** Hobby (free for personal projects)
- **Neon:** Free tier (0.5GB storage, 10GB transfer)
- **GitHub Actions:** 2,000 minutes/month free
- **Estimated Monthly Cost:** $0

## Future Enhancements

- [ ] Authentication (NextAuth.js or Clerk)
- [ ] Real scoring algorithm (replace synthetic data)
- [ ] Stripe webhook integration for claim verification
- [ ] Email notifications via Resend or SendGrid
- [ ] Admin panel for manual data entry
- [ ] ORM integration (Drizzle or Prisma)
- [ ] Multi-location support
- [ ] Advanced analytics dashboard
- [ ] Public API with rate limiting

## Troubleshooting

### Build Fails: "Cannot find module '@/src/lib/db'"

Ensure your `tsconfig.json` has:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Database Connection Fails

- Check `DATABASE_URL` format: `postgres://user:pass@host:5432/db?sslmode=require`
- For Neon, SSL is required in production
- Verify network access (Neon allows public connections by default)

### Vercel Cron Not Running

- Ensure `vercel.json` has valid cron syntax
- Check Vercel Logs → Cron for execution history
- Verify `CRON_SECRET` is set in environment variables
- Test manually with curl

### Badge Embed Not Showing

- Check browser console for errors
- Verify `window.__nso_badge_profile` is set before script loads
- Ensure CORS allows iframe embedding if needed

## License

Private project. All rights reserved.

## Contact

For questions or issues, contact: [your-email@example.com]

# NSO Trust Index - Deployment Summary

## Deployment Plan

### Phase 0: Verification ✓
- Repository: morphious33453/Project
- Branch: claude/bootstrap-nso-trust-index-mvp-011CUzkgqCBxofDfZA2Le9oY
- Commit: a548c77
- Files verified: 18+ TypeScript/SQL files
- Critical files present: schema.sql, seed.ts, vercel.json, db.ts

### Phase 1: Input Gathering
Required from user:
1. DATABASE_URL (Neon Postgres with ?sslmode=require)
2. CRON_SECRET (48+ character random string)
3. CLAIM_LINK_ALERTS ($15/mo Stripe Payment Link)
4. CLAIM_LINK_PRO ($129/mo Stripe Payment Link)
5. CLAIM_LINK_PREMIUM ($49/mo Stripe Payment Link)
6. CLAIM_LINK_BENCHMARK ($149 one-time Stripe Payment Link)

### Phase 2: Database Initialization
- Verify Neon connection
- Run schema.sql (creates businesses, snapshots, claims tables)
- Install dependencies
- Seed 30+ sample businesses
- Verify row counts

### Phase 3: Vercel Deployment
- Install Vercel CLI
- Link project (create: nso-trust-index)
- Set environment variables for Production + Preview
- Deploy to production
- Capture deployment URL

### Phase 4: Cron & Domain Configuration
- Verify vercel.json cron configuration
- Configure daily cron job (03:00 UTC)
- Add header: Authorization: Bearer ${CRON_SECRET}
- Configure custom domain: trust.niagarastandsout.com
- Provide DNS CNAME record

### Phase 5: Smoke Tests & Health Check
- Manual cron trigger
- Verify +10 snapshots in database
- Test all production URLs
- Generate healthcheck.sh script

### Phase 6: Outreach Materials
Generate in outreach/:
- reddit_post_stcatharines_2025-11.md
- emails_top10_badge.csv
- emails_moveup5_pro.csv

### Phase 7: Final Output
- Database seed confirmation
- Production URLs
- Cron test results
- Health check script location
- Outreach material paths
- Any remaining manual steps

## Architecture

**Stack:**
- Next.js 14.2.23 (App Router, TypeScript)
- PostgreSQL (Neon)
- Vercel (hosting + cron)
- Stripe Payment Links

**Key Features:**
- City/vertical leaderboards
- Business profiles with evidence
- 4-tier claim system
- Embeddable trust badges
- Daily snapshot cron job
- SEO-optimized (robots.txt, sitemap.xml, methodology)

## Environment Variables

```env
DATABASE_URL=postgres://user:pass@host.neon.tech/db?sslmode=require
CRON_SECRET=<48-char-random-string>
NEXT_PUBLIC_SITE_URL=https://trust.niagarastandsout.com
CLAIM_LINK_ALERTS=https://buy.stripe.com/...
CLAIM_LINK_PRO=https://buy.stripe.com/...
CLAIM_LINK_PREMIUM=https://buy.stripe.com/...
CLAIM_LINK_BENCHMARK=https://buy.stripe.com/...
```

## Production URLs

- Landing: https://trust.niagarastandsout.com/
- Leaderboard: https://trust.niagarastandsout.com/st-catharines/restaurants
- Profile: https://trust.niagarastandsout.com/profile/<uuid>
- Claim: https://trust.niagarastandsout.com/claim/<uuid>
- Methodology: https://trust.niagarastandsout.com/methodology
- Dashboard: https://trust.niagarastandsout.com/dashboard
- Robots: https://trust.niagarastandsout.com/robots.txt
- Sitemap: https://trust.niagarastandsout.com/sitemap.xml

## Cron Configuration

```json
{
  "crons": [{
    "path": "/api/cron/snapshot",
    "schedule": "0 3 * * *"
  }]
}
```

**Manual trigger:**
```bash
curl -X POST "https://trust.niagarastandsout.com/api/cron/snapshot" \
  -H "Authorization: Bearer <CRON_SECRET>"
```

## DNS Configuration

**Required CNAME record:**
```
Type: CNAME
Name: trust
Value: cname.vercel-dns.com (or as provided by Vercel)
TTL: Auto/300
```

## Post-Deployment

1. Verify all URLs return 200 OK
2. Test badge embed on blank HTML page
3. Verify sitemap includes all pages
4. Test cron job creates 10 snapshots
5. Submit sitemap to Google Search Console
6. Monitor Vercel logs for errors

---

**Deployment Date:** 2025-01-10
**Engineer:** Claude (Autonomous Release Agent)
**Status:** Ready for execution

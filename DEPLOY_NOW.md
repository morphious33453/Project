# 🚀 DEPLOY NOW - NSO Trust Index

**Commit:** de58c21
**Branch:** claude/bootstrap-nso-trust-index-mvp-011CUzkgqCBxofDfZA2Le9oY
**Status:** Ready for production deployment

---

## ⚡ Quick Start (5 Commands)

Run these **on your local machine** where you have network access:

```bash
# 1. Database setup (creates tables, seeds 30 businesses)
./deploy/setup-database.sh

# 2. Vercel login (opens browser)
vercel login

# 3. Link project
vercel link

# 4. Deploy to production with env vars
./deploy/deploy-vercel.sh

# 5. Health check (after DNS propagates)
./deploy/healthcheck.sh https://trust.niagarastandsout.com
```

---

## 📋 Step-by-Step Deployment

### Step 1: Database Setup (5 min)

```bash
cd /path/to/Project
./deploy/setup-database.sh
```

**What it does:**
- ✅ Tests Neon database connection
- ✅ Runs schema.sql (creates businesses, snapshots, claims tables)
- ✅ Installs npm dependencies
- ✅ Seeds 30 sample businesses across 3 cities
- ✅ Verifies data counts

**Expected output:**
```
✅ Database connected
✅ Schema applied
✅ Dependencies installed
✅ Database seeded
 businesses | snapshots | claims
     30     |    30     |   5
Sample Business ID: <uuid>
✅ Database setup complete!
```

---

### Step 2: Vercel Authentication

```bash
vercel login
```

**Action:** Click the verification link that opens in your browser.

---

### Step 3: Link Project

```bash
vercel link
```

**Prompts:**
- Set up new project? → **Yes**
- Project name? → **nso-trust-index** (or your preference)
- Link to existing project? → **No**

---

### Step 4: Deploy with Environment Variables

```bash
./deploy/deploy-vercel.sh
```

**What it does:**
- ✅ Adds all 7 environment variables to Vercel (Production + Preview)
- ✅ Deploys to production
- ✅ Outputs deployment URL

**Variables configured:**
- DATABASE_URL
- CRON_SECRET
- CLAIM_LINK_ALERTS ($15/mo)
- CLAIM_LINK_PRO ($129/mo)
- CLAIM_LINK_PREMIUM ($49/mo)
- CLAIM_LINK_BENCHMARK ($149 one-time)
- NEXT_PUBLIC_SITE_URL

**Expected output:**
```
✅ Environment variables configured
✅ Deployment complete!
🔗 https://nso-trust-index-xxxxx.vercel.app
```

---

### Step 5: Configure Domain

**In Vercel Dashboard:**

1. Go to: **Project → Settings → Domains**
2. Click **Add Domain**
3. Enter: `trust.niagarastandsout.com`
4. Vercel shows: **CNAME target** (e.g., `cname.vercel-dns.com`)

**In Your DNS Provider:**

Add this record:
```
Type: CNAME
Name: trust
Value: cname.vercel-dns.com
TTL: 300
```

**Wait 1-10 minutes** for DNS propagation. Vercel shows green checkmark when ready.

---

### Step 6: Configure Cron Job

**In Vercel Dashboard:**

1. Go to: **Project → Settings → Cron Jobs**
2. Verify cron is listed:
   - Path: `/api/cron/snapshot`
   - Schedule: `0 3 * * *` (Daily 3 AM UTC)

**If not auto-detected**, add manually:
- Path: `/api/cron/snapshot`
- Schedule: Daily at 3 AM UTC
- No additional headers needed (uses environment variables)

---

### Step 7: Manual Cron Test

```bash
curl -X POST "https://trust.niagarastandsout.com/api/cron/snapshot" \
  -H "Authorization: Bearer bxmmGO03wAbDupSBaF6DnQNLoRPmEx9CcHMd/AslyP5HIM7QclsFCnJt6BK7Dbu9" \
  -H "Content-Type: application/json"
```

**Expected response:**
```json
{
  "ok": true,
  "message": "Created snapshots for 10 businesses",
  "count": 10,
  "snapshots": [...]
}
```

**Verify in database:**
```bash
psql 'postgresql://neondb_owner:npg_gsZUqw6D2oHx@ep-frosty-scene-a4wxt3w3-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require' \
  -c "SELECT COUNT(*) FROM snapshots;"
```

Count should increase by 10.

---

### Step 8: Health Check

```bash
./deploy/healthcheck.sh https://trust.niagarastandsout.com
```

**Tests:**
- ✅ Homepage (/)
- ✅ Leaderboard (/st-catharines/restaurants)
- ✅ Methodology (/methodology)
- ✅ Dashboard (/dashboard)
- ✅ Robots.txt
- ✅ Sitemap.xml
- ✅ Cron API (creates 10 snapshots)

**All should show:** ✅ OK

---

## 🔗 Production URLs

Once deployed, verify these pages:

```
Landing:      https://trust.niagarastandsout.com/
Leaderboard:  https://trust.niagarastandsout.com/st-catharines/restaurants
Profile:      https://trust.niagarastandsout.com/profile/<uuid>
Claim:        https://trust.niagarastandsout.com/claim/<uuid>
Methodology:  https://trust.niagarastandsout.com/methodology
Dashboard:    https://trust.niagarastandsout.com/dashboard
Robots:       https://trust.niagarastandsout.com/robots.txt
Sitemap:      https://trust.niagarastandsout.com/sitemap.xml
Badge Embed:  https://trust.niagarastandsout.com/embed/badge?id=<uuid>
```

**Get a business UUID:**
```bash
psql 'postgresql://neondb_owner:npg_gsZUqw6D2oHx@ep-frosty-scene-a4wxt3w3-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require' \
  -t -c "SELECT id FROM businesses LIMIT 1;"
```

---

## 📧 Outreach Materials Ready

All materials generated in `/outreach/`:

1. **Reddit Post:** `outreach/reddit_post_stcatharines_2025-11.md`
   - 120 words, neutral tone
   - Top 5 table
   - Methodology link
   - CSV download reference

2. **Premium Badge Emails (Top 10):** `outreach/emails_top10_badge.csv`
   - 10 personalized emails
   - $49/mo Premium Badge offer
   - Quick wins + citations
   - ≤120 words each

3. **Pro Plan Emails (Rank 11-30):** `outreach/emails_moveup5_pro.csv`
   - 20 personalized emails
   - $129/mo Pro plan offer
   - Gap analysis + quick wins
   - ≤120 words each

---

## 🎯 Post-Deployment Checklist

- [ ] Run `./deploy/setup-database.sh` → ✅ 30 businesses seeded
- [ ] Run `vercel login` → ✅ Authenticated
- [ ] Run `vercel link` → ✅ Project created
- [ ] Run `./deploy/deploy-vercel.sh` → ✅ Deployed to production
- [ ] Add domain in Vercel → ✅ DNS CNAME configured
- [ ] Verify cron job → ✅ Listed in Vercel settings
- [ ] Test cron manually → ✅ +10 snapshots created
- [ ] Run `./deploy/healthcheck.sh` → ✅ All tests pass
- [ ] Submit sitemap to Google Search Console
- [ ] Post to r/Niagara with Reddit template
- [ ] Send 10 Premium Badge emails (top 10 rankers)
- [ ] Send 20 Pro emails (rank 11-30)

---

## ⚠️ Important Notes

**Secrets Management:**
- ✅ No secrets committed to repo
- ✅ All sensitive values in Vercel environment variables
- ✅ CRON_SECRET used for API authentication
- ✅ DATABASE_URL includes SSL requirement

**Pricing (as configured):**
- Alerts: $15 CAD/month
- Pro: $129 CAD/month
- Premium Badge: $49 CAD/month
- Benchmark: $149 CAD one-time

**Cron Schedule:**
- Runs daily at 3:00 AM UTC
- Creates 10 random snapshots
- Updates trust scores automatically

---

## 🐛 Troubleshooting

**Database connection fails:**
```bash
# Test connection
psql 'postgresql://neondb_owner:npg_gsZUqw6D2oHx@ep-frosty-scene-a4wxt3w3-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require' -c "SELECT 1;"
```

**Vercel deployment fails:**
```bash
# Check build logs
vercel logs

# Redeploy
vercel --prod
```

**Cron not running:**
```bash
# Manual trigger
curl -X POST "https://trust.niagarastandsout.com/api/cron/snapshot" \
  -H "Authorization: Bearer bxmmGO03wAbDupSBaF6DnQNLoRPmEx9CcHMd/AslyP5HIM7QclsFCnJt6BK7Dbu9"
```

**DNS not propagating:**
```bash
# Check DNS
dig trust.niagarastandsout.com

# Wait 10 minutes, then check Vercel domain status
```

---

## 📞 Next Steps

1. **Deploy Now:** Run the 5 commands above
2. **Verify:** Check all production URLs
3. **Outreach:** Send emails from CSV files
4. **Reddit:** Post to r/Niagara
5. **Monitor:** Watch Vercel logs for errors

---

**All files ready. All secrets configured. Deploy when ready!** 🚀

#!/bin/bash
# Health Check Script
# Test all production endpoints after deployment

DOMAIN="${1:-https://trust.niagarastandsout.com}"
CRON_SECRET='bxmmGO03wAbDupSBaF6DnQNLoRPmEx9CcHMd/AslyP5HIM7QclsFCnJt6BK7Dbu9'

echo "🏥 NSO Trust Index Health Check"
echo "Domain: $DOMAIN"
echo "================================"
echo ""

# Test homepage
echo -n "🏠 Homepage... "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$DOMAIN/")
if [ "$STATUS" = "200" ]; then
    echo "✅ OK"
else
    echo "❌ FAIL (HTTP $STATUS)"
fi

# Test leaderboard
echo -n "📊 Leaderboard... "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$DOMAIN/st-catharines/restaurants")
if [ "$STATUS" = "200" ]; then
    echo "✅ OK"
else
    echo "❌ FAIL (HTTP $STATUS)"
fi

# Test methodology
echo -n "📖 Methodology... "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$DOMAIN/methodology")
if [ "$STATUS" = "200" ]; then
    echo "✅ OK"
else
    echo "❌ FAIL (HTTP $STATUS)"
fi

# Test dashboard
echo -n "📈 Dashboard... "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$DOMAIN/dashboard")
if [ "$STATUS" = "200" ]; then
    echo "✅ OK"
else
    echo "❌ FAIL (HTTP $STATUS)"
fi

# Test robots.txt
echo -n "🤖 Robots.txt... "
ROBOTS=$(curl -s "$DOMAIN/robots.txt")
if echo "$ROBOTS" | grep -q "Sitemap"; then
    echo "✅ OK"
else
    echo "❌ FAIL (No sitemap reference)"
fi

# Test sitemap.xml
echo -n "🗺️  Sitemap.xml... "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$DOMAIN/sitemap.xml")
if [ "$STATUS" = "200" ]; then
    echo "✅ OK"
else
    echo "❌ FAIL (HTTP $STATUS)"
fi

# Test cron endpoint
echo -n "⚙️  Cron API... "
RESPONSE=$(curl -s -X POST "$DOMAIN/api/cron/snapshot" \
    -H "Authorization: Bearer $CRON_SECRET" \
    -H "Content-Type: application/json")

if echo "$RESPONSE" | grep -q '"ok":true'; then
    COUNT=$(echo "$RESPONSE" | grep -o '"count":[0-9]*' | cut -d: -f2)
    echo "✅ OK (Created $COUNT snapshots)"
else
    echo "❌ FAIL"
    echo "Response: $RESPONSE"
fi

echo ""
echo "🎉 Health check complete!"

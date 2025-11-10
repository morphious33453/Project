import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env') });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false }
    : false,
});

const cities = ['st-catharines', 'niagara-falls', 'welland'];
const verticals = ['restaurants', 'auto-repair', 'plumbers', 'dentists'];

const businessNames = {
  restaurants: [
    'The Local Bistro', 'Harvest Table', 'Waterfront Grill', 'Main Street Diner',
    'Bella Vista', 'The Garden Cafe', 'Sunset Restaurant', 'Urban Kitchen'
  ],
  'auto-repair': [
    'Precision Auto', 'Quick Fix Garage', 'Master Mechanics', 'City Auto Repair',
    'Premium Auto Service', 'Family Car Care', 'Express Auto', 'Elite Motors'
  ],
  plumbers: [
    'Rapid Response Plumbing', 'Clear Flow Solutions', 'Professional Plumbers',
    'Drain Masters', 'Quick Fix Plumbing', 'Reliable Pipes', 'Flow Pro', 'Pipe Perfect'
  ],
  dentists: [
    'Bright Smiles Dental', 'Family Dental Care', 'Apex Dentistry', 'Gentle Dental',
    'Crown & Bridge Clinic', 'Perfect Smile Dental', 'Downtown Dental', 'Care Dental Group'
  ]
};

const evidenceTemplates = [
  { url: 'https://google.com/maps', title: 'Google Maps listing verified', type: 'map' },
  { url: 'https://facebook.com', title: 'Active Facebook business page', type: 'social' },
  { url: 'https://yelp.com', title: 'Claimed Yelp profile', type: 'review' },
  { url: 'https://bbb.org', title: 'BBB Accredited Business', type: 'accreditation' },
  { url: 'https://example.com/reviews', title: 'Recent customer reviews', type: 'review' },
];

async function seed() {
  const client = await pool.connect();

  try {
    console.log('Starting seed process...');

    // Insert 30 businesses (10 per city for restaurants/auto-repair)
    const businesses = [];

    for (const city of cities) {
      for (const vertical of ['restaurants', 'auto-repair']) {
        const names = businessNames[vertical];

        for (let i = 0; i < 5; i++) {
          const name = `${names[i % names.length]} - ${city}`;
          const website = `https://${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.com`;

          const result = await client.query(
            `INSERT INTO businesses (name, city, vertical, website, gbp_cid)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id`,
            [name, city, vertical, website, `gbp_${Math.random().toString(36).slice(2, 11)}`]
          );

          businesses.push({
            id: result.rows[0].id,
            name,
            city,
            vertical
          });
        }
      }
    }

    console.log(`Inserted ${businesses.length} businesses`);

    // Create snapshots for each business
    for (const business of businesses) {
      const score = Math.floor(Math.random() * 40) + 60; // 60-99
      const numEvidence = Math.floor(Math.random() * 3) + 2; // 2-4 pieces of evidence

      const evidence = [];
      for (let i = 0; i < numEvidence; i++) {
        const template = evidenceTemplates[i % evidenceTemplates.length];
        evidence.push({
          url: template.url,
          title: template.title,
          date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        });
      }

      const metrics = {
        reviews: Math.floor(Math.random() * 200) + 10,
        rating: (Math.random() * 1.5 + 3.5).toFixed(1),
        map_pack: Math.random() > 0.7,
        claimed: Math.random() > 0.3
      };

      await client.query(
        `INSERT INTO snapshots (business_id, score, evidence, metrics, taken_at)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          business.id,
          score,
          JSON.stringify(evidence),
          JSON.stringify(metrics),
          new Date()
        ]
      );
    }

    console.log('Created snapshots for all businesses');

    // Create a few sample claims
    const claimedBusinesses = businesses.slice(0, 5);
    const plans = ['alerts', 'pro', 'premium', 'benchmark'];

    for (let i = 0; i < claimedBusinesses.length; i++) {
      await client.query(
        `INSERT INTO claims (business_id, owner_email, plan, stripe_customer_id)
         VALUES ($1, $2, $3, $4)`,
        [
          claimedBusinesses[i].id,
          `owner${i + 1}@example.com`,
          plans[i % plans.length],
          `cus_${Math.random().toString(36).slice(2, 15)}`
        ]
      );
    }

    console.log(`Created ${claimedBusinesses.length} sample claims`);
    console.log('✅ Seed completed successfully!');

  } catch (error) {
    console.error('❌ Seed failed:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch(console.error);

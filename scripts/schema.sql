-- Enable required extensions
create extension if not exists pgcrypto;

-- Businesses table
create table if not exists businesses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  city text not null,
  vertical text not null,
  website text,
  gbp_cid text,
  created_at timestamptz default now()
);

-- Create indexes for common queries
create index if not exists idx_businesses_city_vertical on businesses(city, vertical);
create index if not exists idx_businesses_gbp_cid on businesses(gbp_cid) where gbp_cid is not null;

-- Snapshots table (stores daily score snapshots)
create table if not exists snapshots (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete cascade,
  taken_at timestamptz default now(),
  score int not null check (score >= 0 and score <= 100),
  evidence jsonb not null default '[]'::jsonb,
  metrics jsonb not null default '{}'::jsonb
);

-- Create indexes for snapshot queries
create index if not exists idx_snapshots_business_id on snapshots(business_id);
create index if not exists idx_snapshots_taken_at on snapshots(taken_at desc);
create index if not exists idx_snapshots_business_taken on snapshots(business_id, taken_at desc);

-- Claims table (tracks business ownership claims)
create table if not exists claims (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete set null,
  owner_email text not null,
  plan text not null check (plan in ('alerts', 'pro', 'premium', 'benchmark')),
  stripe_customer_id text,
  stripe_sub_id text,
  created_at timestamptz default now()
);

-- Create indexes for claims
create index if not exists idx_claims_business_id on claims(business_id);
create index if not exists idx_claims_owner_email on claims(owner_email);
create index if not exists idx_claims_stripe_customer on claims(stripe_customer_id) where stripe_customer_id is not null;

-- Create a view for latest scores (useful for leaderboards)
create or replace view latest_scores as
select distinct on (b.id)
  b.id,
  b.name,
  b.city,
  b.vertical,
  b.website,
  b.gbp_cid,
  s.score,
  s.taken_at as last_updated,
  s.evidence,
  s.metrics
from businesses b
left join snapshots s on s.business_id = b.id
order by b.id, s.taken_at desc;

-- Comments for documentation
comment on table businesses is 'Core business listings in the trust index';
comment on table snapshots is 'Historical score snapshots with evidence and metrics';
comment on table claims is 'Business ownership claims and subscription plans';
comment on column snapshots.evidence is 'Array of evidence objects: [{url, title, date}]';
comment on column snapshots.metrics is 'Additional metrics: {reviews, rating, map_pack, ...}';

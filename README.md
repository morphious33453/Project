# Niagara Paint Services Directory

A comprehensive directory of paint services, suppliers, and contractors in the Niagara region.

## Environment Variables for Vercel Deployment

When deploying to Vercel, you'll need to set up the following environment variables in your Vercel project settings:

### Required Environment Variables

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-vercel-domain.vercel.app
NEXT_PUBLIC_SITE_NAME="Niagara Paint Services Directory"
NEXT_PUBLIC_SITE_DESCRIPTION="Find trusted paint contractors, suppliers, and services in the Niagara region"

# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://your-vercel-domain.vercel.app/api

# Build Configuration
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_SITEMAP=true
NEXT_PUBLIC_ENABLE_ROBOTS=true

# Deployment Mode
NODE_ENV=production
```

### Setting Up Environment Variables in Vercel

1. Go to your project in the Vercel dashboard
2. Click on "Settings"
3. Click on "Environment Variables"
4. Add each of the above variables
5. Deploy your project

## Local Development

For local development, create a `.env.local` file in the root directory with:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
NODE_ENV=development
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

```bash
npm run build
```

## Deployment

The project is configured for deployment on Vercel. Simply push to your GitHub repository and Vercel will automatically deploy your changes.

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding SEO data...')

  // Seed Printer Models
  const printers = [
    {
      slug: 'roland-bn-20',
      name: 'Roland BN-20',
      manufacturer: 'Roland DG',
      maxWidthMm: 482.6, // 19 inches
      maxHeightMm: 297,
      supportsContourCutting: true,
      description: 'Desktop eco-solvent printer/cutter perfect for small format stickers. Industry standard for quality die-cut decals.',
      popular: true,
      recommendedMaterials: ['Vinyl', 'Printable Vinyl', 'Adhesive Paper', 'Clear Vinyl'],
      specs: {
        printMethod: 'Piezo inkjet',
        resolution: '1440 dpi',
        ink: 'ECO-SOL MAX 3 (CMYK)',
        cuttingForce: '30-350 gf',
        software: 'VersaWorks 6',
      },
    },
    {
      slug: 'cricut-maker',
      name: 'Cricut Maker',
      manufacturer: 'Cricut',
      maxWidthMm: 292, // 11.5 inches
      maxHeightMm: 3600, // up to 10 feet with roll
      supportsContourCutting: true,
      description: 'Popular home crafting machine with Print Then Cut feature. Perfect for DIY stickers and small business.',
      popular: true,
      recommendedMaterials: ['Printable Vinyl', 'Sticker Paper', 'Adhesive Cardstock', 'Printable Magnet'],
      specs: {
        printMethod: 'Compatible with inkjet/laser',
        cuttingForce: '4kg',
        materials: '300+ compatible',
        software: 'Cricut Design Space',
      },
    },
    {
      slug: 'silhouette-cameo-4',
      name: 'Silhouette Cameo 4',
      manufacturer: 'Silhouette America',
      maxWidthMm: 305, // 12 inches
      maxHeightMm: 3048, // up to 10 feet
      supportsContourCutting: true,
      description: 'Versatile cutting machine with registration marks for print and cut. Great for sticker businesses.',
      popular: true,
      recommendedMaterials: ['Printable Vinyl', 'Printable Adhesive', 'Tattoo Paper', 'Printable HTV'],
      specs: {
        printMethod: 'Compatible with inkjet/laser',
        cuttingForce: '5000 gf',
        speed: '3x faster than Cameo 3',
        software: 'Silhouette Studio',
      },
    },
    {
      slug: 'epson-surecolor-f170',
      name: 'Epson SureColor F170',
      manufacturer: 'Epson',
      maxWidthMm: 215.9, // 8.5 inches
      maxHeightMm: 1200,
      supportsContourCutting: false,
      description: 'Compact dye-sublimation printer. Best for heat transfer but also works with printable vinyl.',
      popular: false,
      recommendedMaterials: ['Sublimation Paper', 'Printable Vinyl'],
      specs: {
        printMethod: 'PrecisionCore Heat-Free',
        resolution: '5760 x 1440 dpi',
        ink: 'UltraChrome DS',
      },
    },
    {
      slug: 'brother-scanncut-sdx125e',
      name: 'Brother ScanNCut SDX125E',
      manufacturer: 'Brother',
      maxWidthMm: 296, // 11.6 inches
      maxHeightMm: 296,
      supportsContourCutting: true,
      description: 'Home cutting machine with built-in scanner. Great for cutting printed stickers.',
      popular: false,
      recommendedMaterials: ['Printable Vinyl', 'Sticker Paper', 'Adhesive Paper'],
      specs: {
        scanner: 'Built-in 300 DPI',
        cuttingArea: '296 x 296mm',
        software: 'ScanNCut Canvas',
      },
    },
    {
      slug: 'roland-bn-20a',
      name: 'Roland BN-20A',
      manufacturer: 'Roland DG',
      maxWidthMm: 515, // 20.5 inches
      maxHeightMm: 297,
      supportsContourCutting: true,
      description: 'Updated version of BN-20 with improved features. Perfect for professional sticker making.',
      popular: true,
      recommendedMaterials: ['Vinyl', 'Printable Vinyl', 'Adhesive Paper', 'Clear Vinyl'],
      specs: {
        printMethod: 'Piezo inkjet',
        resolution: '1440 dpi',
        ink: 'ECO-SOL MAX 4',
        whiteInk: 'Optional',
      },
    },
    {
      slug: 'hp-latex-315',
      name: 'HP Latex 315',
      manufacturer: 'HP',
      maxWidthMm: 1371, // 54 inches
      maxHeightMm: 15240,
      supportsContourCutting: false,
      description: 'Wide format latex printer for large sticker production. Commercial grade.',
      popular: false,
      recommendedMaterials: ['Banner', 'Vinyl', 'Adhesive Vinyl', 'Canvas'],
      specs: {
        printMethod: 'HP Thermal Inkjet',
        resolution: '1200 dpi',
        ink: 'HP 881 Latex',
      },
    },
    {
      slug: 'uscutter-mh-871-mk2',
      name: 'USCutter MH-871 MK2',
      manufacturer: 'USCutter',
      maxWidthMm: 870, // 34 inches
      maxHeightMm: 10000,
      supportsContourCutting: true,
      description: 'Budget-friendly vinyl cutter for contour cutting printed stickers.',
      popular: false,
      recommendedMaterials: ['Vinyl', 'Adhesive Vinyl'],
      specs: {
        cuttingForce: '500g',
        speed: '800 mm/s',
        software: 'SignMaster',
      },
    },
  ]

  for (const printer of printers) {
    await prisma.printerModel.upsert({
      where: { slug: printer.slug },
      update: printer,
      create: printer,
    })
    console.log(`✓ Created printer: ${printer.name}`)
  }

  // Seed Use Cases
  const useCases = [
    {
      slug: 'youtube-creators',
      name: 'YouTube Creators',
      title: 'Custom Stickers for YouTube Creators',
      description: 'Create unique channel stickers for merchandise, giveaways, and branding.',
      targetAudience: 'YouTube content creators with 1K+ subscribers looking to monetize',
      painPoints: [
        'Expensive custom design services ($50-200 per design)',
        'Long turnaround times (1-2 weeks)',
        'Need multiple designs for testing',
        'Want to match channel branding',
      ],
      solutions: [
        'Generate unlimited designs for $9.99 each',
        'Instant AI generation in seconds',
        'Print-ready files with commercial license',
        'Perfect for merch, packaging, and giveaways',
      ],
      keywords: [
        'youtube stickers',
        'youtube merch',
        'channel stickers',
        'creator merch',
        'youtube branding',
      ],
      metaTitle: 'YouTube Channel Stickers | AI-Generated Merch Designs',
      metaDescription:
        'Create custom stickers for your YouTube channel in seconds. Print-ready designs with commercial license. Perfect for merch, packages, and giveaways.',
      featured: true,
    },
    {
      slug: 'twitch-streamers',
      name: 'Twitch Streamers',
      title: 'Custom Stickers for Twitch Streamers',
      description: 'Level up your stream branding with custom emote stickers and sub badges.',
      targetAudience: 'Twitch affiliates and partners wanting unique merch',
      painPoints: [
        'Generic emote packs look unprofessional',
        'Custom artists charge $25-100 per emote',
        'Need stickers for sub boxes and giveaways',
        'Want cohesive branding across platform',
      ],
      solutions: [
        'AI-generated emote-style stickers',
        'Commercial license for unlimited printing',
        'Match your stream aesthetic',
        'Perfect size for sub boxes and packages',
      ],
      keywords: [
        'twitch stickers',
        'twitch emotes',
        'streamer merch',
        'sub box stickers',
        'twitch branding',
      ],
      metaTitle: 'Twitch Streamer Stickers | Custom Emote Designs',
      metaDescription:
        'Custom stickers for Twitch streamers. Perfect for sub boxes, merch, and giveaways. Emote-style designs with commercial license.',
      featured: true,
    },
    {
      slug: 'etsy-sellers',
      name: 'Etsy Sellers',
      title: 'Print-Ready Sticker Designs for Etsy Sellers',
      description: 'Build your sticker inventory without design costs. Commercial license included.',
      targetAudience: 'Etsy shop owners selling stickers and handmade goods',
      painPoints: [
        'High cost of commissioning original designs',
        'Copyright concerns with stock designs',
        'Need consistent inventory to compete',
        'Want unique designs that stand out',
      ],
      solutions: [
        'Commercial license for unlimited resale',
        'Print-ready with 300 DPI + SVG cutline',
        'Unique AI designs nobody else has',
        'Perfect for Etsy listings and print-on-demand',
      ],
      keywords: [
        'etsy sticker designs',
        'print on demand stickers',
        'commercial use stickers',
        'resell stickers',
        'sticker inventory',
      ],
      metaTitle: 'Etsy Sticker Designs | Commercial Use Print Files',
      metaDescription:
        'Print-ready sticker designs for Etsy sellers. Commercial license included. 300 DPI PNG + SVG cutline. Unique AI-generated designs.',
      featured: true,
    },
    {
      slug: 'small-business',
      name: 'Small Business',
      title: 'Custom Logo Stickers for Small Businesses',
      description: 'Affordable custom stickers for branding, packaging, and promotions.',
      targetAudience: 'Small business owners needing branded materials on a budget',
      painPoints: [
        'Custom design agencies are too expensive',
        'Need stickers for products and packaging',
        'Want professional look without high cost',
        'Limited budget for marketing materials',
      ],
      solutions: [
        'Professional designs starting at $9.99',
        'Print-ready files you own forever',
        'Perfect for product labels and packaging',
        'Add to orders as thank-you stickers',
      ],
      keywords: [
        'custom business stickers',
        'logo stickers',
        'product stickers',
        'packaging stickers',
        'brand stickers affordable',
      ],
      metaTitle: 'Custom Business Stickers | Logo & Product Labels',
      metaDescription:
        'Affordable custom stickers for small businesses. Perfect for logos, products, and packaging. Print-ready files with commercial license.',
      featured: true,
    },
    {
      slug: 'content-creators',
      name: 'Content Creators',
      title: 'Stickers for Content Creators & Influencers',
      description: 'Stand out with custom stickers for your brand across all platforms.',
      targetAudience: 'Multi-platform creators (TikTok, Instagram, YouTube)',
      painPoints: [
        'Need merch that works across platforms',
        'Want to send stickers with orders',
        'Limited budget for custom design',
        'Need quick turnaround for trends',
      ],
      solutions: [
        'Cross-platform sticker designs',
        'Instant generation matches trends',
        'Include in merch packages',
        'Build recognizable brand identity',
      ],
      keywords: [
        'creator stickers',
        'influencer merch',
        'content creator branding',
        'social media stickers',
        'creator merch ideas',
      ],
      metaTitle: 'Content Creator Stickers | Influencer Merch Designs',
      metaDescription:
        'Custom stickers for content creators and influencers. Perfect for merch, packages, and fan giveaways. Instant AI generation.',
      featured: true,
    },
    {
      slug: 'podcasters',
      name: 'Podcasters',
      title: 'Custom Podcast Stickers & Merchandise',
      description: 'Turn listeners into brand ambassadors with custom podcast stickers.',
      targetAudience: 'Podcasters wanting to build community and create merch',
      painPoints: [
        'Want to reward loyal listeners',
        'Need affordable merch options',
        'Limited design budget',
        'Want to build podcast brand',
      ],
      solutions: [
        'Custom podcast artwork stickers',
        'Perfect for listener mailouts',
        'Add to supporter packages',
        'Build community with shareable designs',
      ],
      keywords: [
        'podcast stickers',
        'podcast merch',
        'podcast branding',
        'show stickers',
        'podcast giveaways',
      ],
      metaTitle: 'Podcast Stickers | Custom Show Merchandise',
      metaDescription:
        'Custom stickers for podcasters. Perfect for listener rewards, merch, and community building. Show artwork as stickers.',
      featured: false,
    },
    {
      slug: 'diy-crafters',
      name: 'DIY Crafters',
      title: 'DIY Sticker Designs for Crafters',
      description: 'Professional sticker designs for your crafting projects.',
      targetAudience: 'Hobby crafters using Cricut, Silhouette, or other cutting machines',
      painPoints: [
        'Limited SVG libraries are repetitive',
        'Want unique designs for projects',
        'Need print-and-cut compatible files',
        'Want professional-looking results',
      ],
      solutions: [
        'Unique AI designs nobody else has',
        'Print-and-cut ready with registration marks',
        'Works with all major cutting machines',
        'Professional quality for personal projects',
      ],
      keywords: [
        'diy stickers',
        'cricut stickers',
        'silhouette stickers',
        'print and cut',
        'craft stickers',
      ],
      metaTitle: 'DIY Sticker Designs | Print and Cut Files',
      metaDescription:
        'Unique sticker designs for DIY crafters. Compatible with Cricut, Silhouette, and all cutting machines. Print-and-cut ready.',
      featured: false,
    },
  ]

  for (const useCase of useCases) {
    await prisma.useCase.upsert({
      where: { slug: useCase.slug },
      update: useCase,
      create: useCase,
    })
    console.log(`✓ Created use case: ${useCase.name}`)
  }

  // Seed Categories
  const categories = [
    {
      slug: 'die-cut',
      name: 'Die-Cut Stickers',
      description: 'Custom shape stickers cut precisely around your design with white border.',
      featured: true,
      sortOrder: 1,
    },
    {
      slug: 'kiss-cut',
      name: 'Kiss-Cut Stickers',
      description: 'Stickers cut through the top layer only, perfect for sticker sheets.',
      featured: true,
      sortOrder: 2,
    },
    {
      slug: 'circle',
      name: 'Circle Stickers',
      description: 'Classic round stickers in all sizes.',
      featured: true,
      sortOrder: 3,
    },
    {
      slug: 'square',
      name: 'Square Stickers',
      description: 'Square-shaped stickers for clean, modern look.',
      featured: true,
      sortOrder: 4,
    },
    {
      slug: 'transparent',
      name: 'Transparent Stickers',
      description: 'Clear stickers with transparent background for premium look.',
      featured: false,
      sortOrder: 5,
    },
    {
      slug: 'holographic',
      name: 'Holographic Stickers',
      description: 'Eye-catching rainbow holographic effect stickers.',
      featured: false,
      sortOrder: 6,
    },
    {
      slug: 'waterproof',
      name: 'Waterproof Stickers',
      description: 'Durable vinyl stickers resistant to water and weather.',
      featured: true,
      sortOrder: 7,
    },
    {
      slug: 'logo',
      name: 'Logo Stickers',
      description: 'Professional brand and logo stickers for businesses.',
      featured: false,
      sortOrder: 8,
    },
    {
      slug: 'bumper',
      name: 'Bumper Stickers',
      description: 'Large format stickers perfect for vehicles.',
      featured: false,
      sortOrder: 9,
    },
    {
      slug: 'packaging',
      name: 'Packaging Stickers',
      description: 'Product labels and thank-you stickers for packages.',
      featured: false,
      sortOrder: 10,
    },
    {
      slug: 'planner',
      name: 'Planner Stickers',
      description: 'Small decorative stickers for planners and journals.',
      featured: false,
      sortOrder: 11,
    },
    {
      slug: 'emoji',
      name: 'Emoji Stickers',
      description: 'Fun emoji and emoticon stickers.',
      featured: false,
      sortOrder: 12,
    },
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    })
    console.log(`✓ Created category: ${category.name}`)
  }

  console.log('✓ SEO seed data completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

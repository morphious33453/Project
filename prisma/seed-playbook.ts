import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding SEO Playbook data...')

  // ==============================================
  // GLOSSARY TERMS (25% Traffic Strategy)
  // ==============================================
  console.log('Creating glossary terms...')

  const glossaryTerms = [
    {
      slug: 'die-cut-sticker',
      term: 'Die-Cut Sticker',
      definition: 'A sticker cut precisely around the design shape, creating a custom outline rather than a standard shape like a circle or square.',
      longDescription: 'Die-cut stickers are custom-shaped stickers where the cutting follows the exact contour of your design. This process uses a plotter or cutting machine to create unique shapes that match your artwork perfectly. Die-cut stickers typically include a small white border (called a "halo") around the design for durability and visual appeal.',
      relatedTerms: ['kiss-cut', 'contour-cut', 'vinyl-sticker', 'white-halo'],
      category: 'sticker-types',
      featured: true,
    },
    {
      slug: 'kiss-cut-sticker',
      term: 'Kiss-Cut Sticker',
      definition: 'A sticker cut through the top layer only, leaving the backing paper intact, allowing multiple stickers on one sheet.',
      longDescription: 'Kiss-cut stickers are cut only through the sticker material, not the backing paper. This allows you to create sticker sheets with multiple designs that users can peel off individually. Kiss-cutting is ideal for sticker packs, planner stickers, and bulk distributions.',
      relatedTerms: ['die-cut', 'sticker-sheet', 'peel-and-stick'],
      category: 'sticker-types',
      featured: true,
    },
    {
      slug: 'white-halo',
      term: 'White Halo',
      definition: 'A thin white border around a sticker design that enhances visibility and provides structural support during die-cutting.',
      longDescription: 'A white halo is a small border (typically 2-4mm) added around the edge of a die-cut sticker. This border serves multiple purposes: it improves contrast against dark surfaces, provides structural integrity during cutting, and prevents edge peeling. Professional sticker printers always recommend including a white halo.',
      relatedTerms: ['die-cut', 'bleed', 'border'],
      category: 'printing-terms',
      featured: false,
    },
    {
      slug: 'svg-cutline',
      term: 'SVG Cutline',
      definition: 'A vector path file that tells cutting machines exactly where to cut around a design.',
      longDescription: 'An SVG cutline is a scalable vector graphic file containing path data that guides cutting plotters like Cricut or Silhouette machines. Unlike raster images (PNG/JPG), SVG files maintain perfect quality at any size and provide precise cutting instructions. Professional sticker files always include both a high-resolution PNG for printing and an SVG cutline for cutting.',
      relatedTerms: ['vector', 'cutting-path', 'plotter-file'],
      category: 'file-formats',
      featured: true,
    },
    {
      slug: 'dpi',
      term: 'DPI (Dots Per Inch)',
      definition: 'A measurement of print resolution; higher DPI means sharper, more detailed prints.',
      longDescription: 'DPI stands for Dots Per Inch and measures print resolution. For professional sticker printing, 300 DPI is the industry standard. Files below 150 DPI will appear pixelated or blurry when printed. Always ensure your design files are at least 300 DPI at the final print size.',
      relatedTerms: ['resolution', 'print-quality', 'pixels'],
      category: 'printing-terms',
      featured: true,
    },
    {
      slug: 'vinyl-sticker',
      term: 'Vinyl Sticker',
      definition: 'A durable, waterproof sticker made from vinyl material, ideal for outdoor use.',
      longDescription: 'Vinyl stickers are made from PVC (polyvinyl chloride) material and are highly durable, waterproof, and UV-resistant. They can withstand outdoor conditions, dishwashing, and general wear. Vinyl stickers are the professional standard for products, laptops, water bottles, and vehicles.',
      relatedTerms: ['waterproof', 'outdoor-sticker', 'durability'],
      category: 'materials',
      featured: true,
    },
    {
      slug: 'cmyk',
      term: 'CMYK',
      definition: 'The four-color printing process (Cyan, Magenta, Yellow, Black) used for full-color prints.',
      longDescription: 'CMYK is the standard color model for professional printing. Unlike RGB (used for screens), CMYK uses four ink colors that combine to create the full spectrum. When designing for print, always work in CMYK color mode to ensure colors match your expectations.',
      relatedTerms: ['rgb', 'color-mode', 'printing-process'],
      category: 'printing-terms',
      featured: false,
    },
    {
      slug: 'bleed',
      term: 'Bleed',
      definition: 'Extra image area extending beyond the cut line to prevent white edges during printing.',
      longDescription: 'Bleed is additional design area (typically 3mm) extending beyond the final cut line. This ensures that if the cutting is slightly off-center, you won't see white paper edges. Professional print files always include bleed to guarantee edge-to-edge color coverage.',
      relatedTerms: ['cut-line', 'trim-line', 'safe-area'],
      category: 'printing-terms',
      featured: false,
    },
    {
      slug: 'contour-cut',
      term: 'Contour Cut',
      definition: 'The process of cutting around the exact shape of a printed design.',
      longDescription: 'Contour cutting is the automated process where a printer-cutter or separate cutting plotter follows a digital path to cut around your design. This creates custom-shaped stickers. Roland, Cricut, and Silhouette machines all use contour cutting to create die-cut stickers.',
      relatedTerms: ['die-cut', 'plotter', 'registration-marks'],
      category: 'printing-terms',
      featured: false,
    },
    {
      slug: 'laminate',
      term: 'Laminate',
      definition: 'A protective clear coating applied over printed stickers for durability and UV protection.',
      longDescription: 'Lamination is a thin, transparent layer applied over printed stickers to protect them from scratches, fading, and moisture. Laminate comes in various finishes: gloss (shiny), matte (flat), or specialty finishes like holographic. Professional outdoor stickers are always laminated.',
      relatedTerms: ['protective-coating', 'gloss', 'matte', 'uv-protection'],
      category: 'finishing',
      featured: false,
    },
  ]

  for (const term of glossaryTerms) {
    await prisma.glossaryTerm.upsert({
      where: { slug: term.slug },
      update: term,
      create: term,
    })
    console.log(`✓ Glossary: ${term.term}`)
  }

  // ==============================================
  // MATERIALS (Use-Case Saturation)
  // ==============================================
  console.log('\nCreating materials...')

  const materials = [
    {
      slug: 'vinyl',
      name: 'Vinyl',
      description: 'Durable, waterproof material perfect for outdoor stickers, laptops, and products.',
      useCases: ['outdoor', 'waterproof', 'dishwasher-safe', 'car-decals', 'laptop-stickers'],
      printers: ['roland-bn-20', 'epson-surecolor-f170'],
      finishes: ['gloss', 'matte', 'clear'],
      priceRange: '$0.10-0.50 per sticker',
      featured: true,
    },
    {
      slug: 'printable-vinyl',
      name: 'Printable Vinyl',
      description: 'Inkjet-compatible vinyl for home printers like Cricut and Silhouette.',
      useCases: ['diy', 'small-batch', 'cricut', 'silhouette'],
      printers: ['cricut-maker', 'silhouette-cameo-4'],
      finishes: ['white', 'clear', 'printable'],
      priceRange: '$0.25-0.75 per sheet',
      featured: true,
    },
    {
      slug: 'paper-sticker',
      name: 'Paper Sticker Stock',
      description: 'Cost-effective paper material for indoor use, packaging, and short-term applications.',
      useCases: ['packaging', 'indoor', 'bulk', 'budget'],
      printers: ['any-inkjet', 'laser-printer'],
      finishes: ['matte', 'glossy'],
      priceRange: '$0.05-0.15 per sticker',
      featured: true,
    },
    {
      slug: 'holographic',
      name: 'Holographic Vinyl',
      description: 'Eye-catching rainbow reflective material that shifts colors in light.',
      useCases: ['premium', 'branding', 'merchandise', 'aesthetic'],
      printers: ['roland-bn-20'],
      finishes: ['holographic', 'chrome'],
      priceRange: '$0.50-1.50 per sticker',
      featured: true,
    },
    {
      slug: 'clear-vinyl',
      name: 'Clear Vinyl',
      description: 'Transparent vinyl that shows the surface beneath, perfect for window decals.',
      useCases: ['window', 'glass', 'transparent-logo', 'overlay'],
      printers: ['roland-bn-20', 'cricut-maker'],
      finishes: ['clear', 'frosted'],
      priceRange: '$0.20-0.60 per sticker',
      featured: true,
    },
    {
      slug: 'removable-vinyl',
      name: 'Removable Vinyl',
      description: 'Low-tack adhesive vinyl that can be removed without residue.',
      useCases: ['temporary', 'wall-decals', 'renter-friendly', 'repositionable'],
      printers: ['cricut-maker', 'silhouette-cameo-4'],
      finishes: ['matte', 'removable'],
      priceRange: '$0.15-0.45 per sticker',
      featured: false,
    },
  ]

  for (const material of materials) {
    await prisma.material.upsert({
      where: { slug: material.slug },
      update: material,
      create: material,
    })
    console.log(`✓ Material: ${material.name}`)
  }

  // ==============================================
  // SOFTWARE (Compatibility Pages)
  // ==============================================
  console.log('\nCreating software entries...')

  const software = [
    {
      slug: 'cricut-design-space',
      name: 'Cricut Design Space',
      vendor: 'Cricut',
      description: 'Free design software for Cricut cutting machines with print-then-cut capabilities.',
      compatibility: ['cricut-maker', 'cricut-explore', 'cricut-joy'],
      fileFormats: ['SVG', 'PNG', 'JPG', 'DXF'],
      priceModel: 'Free (premium features $9.99/month)',
      featured: true,
    },
    {
      slug: 'silhouette-studio',
      name: 'Silhouette Studio',
      vendor: 'Silhouette America',
      description: 'Design and cutting software for Silhouette cutting machines.',
      compatibility: ['silhouette-cameo-4', 'silhouette-portrait'],
      fileFormats: ['SVG', 'PNG', 'JPG', 'PDF', 'studio3'],
      priceModel: 'Free (Designer Edition $49.99, Business Edition $99.99)',
      featured: true,
    },
    {
      slug: 'adobe-illustrator',
      name: 'Adobe Illustrator',
      vendor: 'Adobe',
      description: 'Professional vector graphics software for creating scalable sticker designs.',
      compatibility: ['universal'],
      fileFormats: ['AI', 'SVG', 'PDF', 'EPS', 'PNG'],
      priceModel: 'Subscription $20.99/month',
      featured: true,
    },
    {
      slug: 'inkscape',
      name: 'Inkscape',
      vendor: 'Open Source',
      description: 'Free, open-source vector graphics editor perfect for creating SVG cutlines.',
      compatibility: ['universal'],
      fileFormats: ['SVG', 'PNG', 'PDF', 'EPS'],
      priceModel: 'Free',
      featured: true,
    },
    {
      slug: 'canva',
      name: 'Canva',
      vendor: 'Canva',
      description: 'Easy-to-use online design tool with sticker templates.',
      compatibility: ['universal'],
      fileFormats: ['PNG', 'JPG', 'PDF', 'SVG (Pro)'],
      priceModel: 'Free (Pro $12.99/month)',
      featured: true,
    },
  ]

  for (const soft of software) {
    await prisma.software.upsert({
      where: { slug: soft.slug },
      update: soft,
      create: soft,
    })
    console.log(`✓ Software: ${soft.name}`)
  }

  // ==============================================
  // PRINT METHODS (Process Pages)
  // ==============================================
  console.log('\nCreating print methods...')

  const printMethods = [
    {
      slug: 'die-cut',
      name: 'Die-Cut Printing',
      description: 'Custom-shaped stickers cut precisely around the design using digital plotters.',
      bestFor: ['custom-shapes', 'logos', 'characters', 'professional'],
      materials: ['vinyl', 'printable-vinyl', 'holographic'],
      equipment: ['roland-bn-20', 'cricut-maker', 'silhouette-cameo-4'],
      featured: true,
    },
    {
      slug: 'kiss-cut',
      name: 'Kiss-Cut Printing',
      description: 'Stickers cut through the top layer only, leaving backing paper intact for sheets.',
      bestFor: ['sticker-sheets', 'bulk', 'planner-stickers', 'multipacks'],
      materials: ['vinyl', 'paper', 'printable-vinyl'],
      equipment: ['cricut-maker', 'silhouette-cameo-4'],
      featured: true,
    },
    {
      slug: 'screen-print',
      name: 'Screen Printing',
      description: 'Traditional printing method using mesh screens for each color, ideal for bulk orders.',
      bestFor: ['bulk', 'simple-designs', 'spot-colors', '1000+units'],
      materials: ['vinyl', 'paper'],
      equipment: ['screen-press', 'manual-press'],
      featured: false,
    },
    {
      slug: 'digital-print',
      name: 'Digital Printing',
      description: 'Direct-to-media printing using inkjet or laser for full-color, photo-quality stickers.',
      bestFor: ['full-color', 'small-batch', 'photo-stickers', 'complex-designs'],
      materials: ['vinyl', 'paper', 'printable-vinyl'],
      equipment: ['roland-bn-20', 'epson-surecolor', 'hp-latex'],
      featured: true,
    },
  ]

  for (const method of printMethods) {
    await prisma.printMethod.upsert({
      where: { slug: method.slug },
      update: method,
      create: method,
    })
    console.log(`✓ Print Method: ${method.name}`)
  }

  console.log('\n✓ SEO Playbook seed data completed!')
  console.log(`
  Summary:
  - ${glossaryTerms.length} glossary terms
  - ${materials.length} materials
  - ${software.length} software entries
  - ${printMethods.length} print methods

  Total new SEO pages: ${glossaryTerms.length + materials.length + software.length + printMethods.length}
  `)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

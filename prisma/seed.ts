import { PrismaClient } from '@prisma/client'
import { hashPrompt, generateSlug, generateTags } from '../lib/seo'

const prisma = new PrismaClient()

const demoDesigns = [
  {
    prompt: 'Cute smiling cat wearing sunglasses, retro style, vibrant colors',
    tags: ['cute', 'retro', 'colorful'],
  },
  {
    prompt: 'Vintage sunset with palm trees, 80s aesthetic, neon colors',
    tags: ['vintage', 'modern'],
  },
  {
    prompt: 'Watercolor wildflowers bouquet, delicate and colorful',
    tags: ['colorful'],
  },
  {
    prompt: 'Kawaii coffee cup with happy face, steam rising, pastel colors',
    tags: ['cute', 'colorful'],
  },
  {
    prompt: 'Abstract geometric shapes, bold colors, modern art style',
    tags: ['bold', 'modern', 'colorful'],
  },
  {
    prompt: 'Cute sleeping moon with stars, dreamy pastel aesthetic',
    tags: ['cute'],
  },
  {
    prompt: 'Retro skateboard with flames, vintage style',
    tags: ['vintage', 'bold'],
  },
  {
    prompt: 'Minimalist mountain landscape, simple lines, monochrome',
    tags: ['minimal', 'monochrome'],
  },
  {
    prompt: 'Kawaii sushi roll with cute face, vibrant colors',
    tags: ['cute', 'colorful'],
  },
  {
    prompt: 'Vintage camera with flowers, retro photography aesthetic',
    tags: ['vintage', 'colorful'],
  },
  {
    prompt: 'Bold lightning bolt with gradient colors, modern design',
    tags: ['bold', 'modern', 'colorful'],
  },
  {
    prompt: 'Cute planet with rings and stars, space theme, pastel colors',
    tags: ['cute', 'colorful'],
  },
]

async function main() {
  console.log('Seeding database with demo designs...')

  for (const design of demoDesigns) {
    const slug = generateSlug(design.prompt)
    const promptHashValue = hashPrompt(design.prompt)
    const tags = generateTags(design.prompt)

    await prisma.design.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        prompt: design.prompt,
        promptHash: promptHashValue,
        provider: 'placeholder',
        status: 'LISTED',
        previewUrl: `https://placehold.co/1024x1024/667eea/white?text=${encodeURIComponent(design.prompt.substring(0, 20))}`,
        tags: [...new Set([...tags, ...design.tags])],
      },
    })

    console.log(`Created design: ${design.prompt.substring(0, 50)}...`)
  }

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

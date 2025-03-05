import fs from 'fs/promises';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { Company, ServiceType, PaintType, Surface, Finish, Specialty } from './types';

// Function to generate a slug from a string
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Function to parse CSV data
async function parseCSV(filePath: string): Promise<any[]> {
  const fileContent = await fs.readFile(filePath, 'utf-8');
  return parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });
}

// Function to transform raw company data into Company objects
function transformCompanyData(rawData: any[]): Company[] {
  return rawData.map((row) => {
    const cities = row.city.split(',').map((city: string) => city.trim());
    const services = row.services.split(',').map((service: string) => service.trim());
    
    return {
      id: generateSlug(row.name),
      name: row.name,
      slug: generateSlug(row.name),
      type: row.type,
      services,
      locations: cities.map((city: string) => ({
        city,
        address: row.address,
        region: row.region,
      })),
      phone: row.phone,
      email: row.email,
      website: row.website,
      rating: row.rating,
      reviewCount: row.reviewCount,
      yearsInBusiness: row.yearsInBusiness,
      expertise: {
        description: `${row.name} has been providing professional painting services in the ${row.region} region for ${row.yearsInBusiness} years.`,
        specialties: services,
        certifications: [],
        specialProjects: [],
        awards: []
      },
      serviceDetails: {
        timeEstimates: "2-3 days for average-sized rooms",
        process: [
          "Initial consultation and color selection",
          "Surface preparation and cleaning",
          "Priming if necessary",
          "Application of paint coats",
          "Final inspection and touch-ups"
        ],
        preparation: [
          "Move or cover furniture",
          "Clean surfaces thoroughly",
          "Repair any wall damage",
          "Tape off areas not to be painted"
        ],
        maintenance: [
          "Regular cleaning with mild soap and water",
          "Touch up any chips or scratches promptly",
          "Repaint every 3-5 years for best results"
        ],
        aftercare: [
          "Allow paint to cure fully",
          "Clean walls gently",
          "Monitor for any issues"
        ],
        warranty: "5-year warranty on workmanship"
      },
      tips: {
        maintenance: [
          "Clean walls regularly with a soft cloth",
          "Address any water damage immediately",
          "Keep rooms well-ventilated"
        ],
        colorSelection: [
          "Consider room lighting",
          "Test samples on walls",
          "Think about room function"
        ],
        general: [
          "Schedule painting in dry weather",
          "Ensure proper ventilation",
          "Allow adequate drying time"
        ],
        applicationTips: [
          "Use quality brushes and rollers",
          "Apply thin, even coats",
          "Follow manufacturer guidelines"
        ]
      }
    };
  });
}

// Function to generate paint type data
function generatePaintTypes(): PaintType[] {
  return [
    {
      id: 'latex',
      name: 'Latex Paint',
      slug: 'latex',
      description: 'Water-based paint that offers easy cleanup and quick drying time.',
      applications: [
        'Interior walls and ceilings',
        'Exterior siding',
        'Trim and moldings',
        'New drywall'
      ],
      benefits: [
        'Quick drying time',
        'Easy cleanup with water',
        'Low VOC options available',
        'Excellent durability'
      ]
    },
    {
      id: 'oil-based',
      name: 'Oil-Based Paint',
      slug: 'oil-based',
      description: 'Traditional paint that provides a durable, high-gloss finish.',
      applications: [
        'Trim and moldings',
        'Doors and windows',
        'High-moisture areas',
        'Metal surfaces'
      ],
      benefits: [
        'Superior durability',
        'Rich, glossy finish',
        'Excellent coverage',
        'Moisture resistant'
      ]
    }
  ];
}

// Function to generate surface data
function generateSurfaces(): Surface[] {
  return [
    {
      id: 'wood',
      name: 'Wood Surfaces',
      slug: 'wood',
      description: 'Natural wood surfaces requiring specific preparation and paint types.',
      preparationSteps: [
        'Sand the surface thoroughly',
        'Clean dust and debris',
        'Apply wood primer',
        'Fill any holes or cracks'
      ],
      recommendedProducts: [
        'Oil-based primers',
        'Exterior wood stains',
        'High-quality brushes',
        'Wood fillers'
      ]
    },
    {
      id: 'drywall',
      name: 'Drywall',
      slug: 'drywall',
      description: 'Interior wall surfaces requiring smooth finish and proper preparation.',
      preparationSteps: [
        'Repair any damage',
        'Sand smooth',
        'Apply drywall primer',
        'Clean surface thoroughly'
      ],
      recommendedProducts: [
        'Drywall primer',
        'Interior latex paint',
        'Drywall repair compounds',
        'Fine-grit sandpaper'
      ]
    }
  ];
}

// Function to generate finish data
function generateFinishes(): Finish[] {
  return [
    {
      id: 'matte',
      name: 'Matte Finish',
      slug: 'matte',
      description: 'Non-reflective finish that hides surface imperfections.',
      characteristics: [
        'No shine or reflection',
        'Excellent hide of surface imperfections',
        'Rich color depth',
        'Difficult to clean'
      ],
      bestUsedFor: [
        'Living room walls',
        'Bedroom walls',
        'Ceilings',
        'Low-traffic areas'
      ]
    },
    {
      id: 'semi-gloss',
      name: 'Semi-Gloss Finish',
      slug: 'semi-gloss',
      description: 'Durable finish with moderate shine.',
      characteristics: [
        'Moderate shine',
        'Easy to clean',
        'Moisture resistant',
        'Shows some imperfections'
      ],
      bestUsedFor: [
        'Kitchens',
        'Bathrooms',
        'Trim and doors',
        'High-traffic areas'
      ]
    }
  ];
}

// Function to generate specialty data
function generateSpecialties(): Specialty[] {
  return [
    {
      id: 'faux-finishes',
      name: 'Faux Finishes',
      slug: 'faux-finishes',
      description: 'Decorative painting techniques that mimic other materials.',
      techniques: [
        'Color washing',
        'Sponging',
        'Ragging',
        'Marbling'
      ],
      requiredSkills: [
        'Color theory knowledge',
        'Specialized tool expertise',
        'Pattern recognition',
        'Attention to detail'
      ]
    },
    {
      id: 'murals',
      name: 'Mural Painting',
      slug: 'murals',
      description: 'Large-scale artistic paintings applied directly to walls.',
      techniques: [
        'Sketching and planning',
        'Color mixing',
        'Scale management',
        'Detail work'
      ],
      requiredSkills: [
        'Artistic ability',
        'Project planning',
        'Color matching',
        'Perspective drawing'
      ]
    }
  ];
}

// Main function to generate all data
export async function generateData() {
  try {
    // Create necessary directories
    await fs.mkdir(path.join(process.cwd(), 'data', 'companies'), { recursive: true });
    await fs.mkdir(path.join(process.cwd(), 'data', 'indexes', 'regions'), { recursive: true });
    await fs.mkdir(path.join(process.cwd(), 'data', 'indexes', 'services'), { recursive: true });
    await fs.mkdir(path.join(process.cwd(), 'data', 'indexes', 'paint-types'), { recursive: true });
    await fs.mkdir(path.join(process.cwd(), 'data', 'indexes', 'surfaces'), { recursive: true });
    await fs.mkdir(path.join(process.cwd(), 'data', 'indexes', 'finishes'), { recursive: true });
    await fs.mkdir(path.join(process.cwd(), 'data', 'indexes', 'specialties'), { recursive: true });

    // Read and parse CSV
    const rawData = await parseCSV(path.join(process.cwd(), 'data', 'data.csv'));
    const companies = transformCompanyData(rawData);

    // Generate individual company files
    for (const company of companies) {
      await fs.writeFile(
        path.join(process.cwd(), 'data', 'companies', `${company.slug}.json`),
        JSON.stringify(company, null, 2)
      );
    }

    // Generate region indexes
    const regions = Array.from(new Set(companies.flatMap(c => c.locations.map(l => l.region))));
    for (const region of regions) {
      const regionCompanies = companies.filter(c => 
        c.locations.some(l => l.region.toLowerCase() === region.toLowerCase())
      );
      const regionData = {
        name: region,
        slug: generateSlug(region),
        cities: Array.from(new Set(regionCompanies.flatMap(c => c.locations.map(l => l.city)))),
        companies: regionCompanies,
        totalCompanies: regionCompanies.length,
        popularServices: Array.from(new Set(regionCompanies.flatMap(c => c.services))).slice(0, 5)
      };
      await fs.writeFile(
        path.join(process.cwd(), 'data', 'indexes', 'regions', `${generateSlug(region)}.json`),
        JSON.stringify(regionData, null, 2)
      );
    }

    // Generate service indexes
    const services = Array.from(new Set(companies.flatMap(c => c.services)));
    for (const service of services) {
      const serviceCompanies = companies.filter(c => c.services.includes(service));
      const serviceData = {
        name: service,
        slug: generateSlug(service),
        companies: serviceCompanies,
        totalCompanies: serviceCompanies.length,
        regions: Array.from(new Set(serviceCompanies.flatMap(c => c.locations.map(l => l.region)))),
        averagePricing: {
          min: 500,
          max: 2500,
          unit: "per project"
        }
      };
      await fs.writeFile(
        path.join(process.cwd(), 'data', 'indexes', 'services', `${generateSlug(service)}.json`),
        JSON.stringify(serviceData, null, 2)
      );
    }

    // Generate paint type files
    const paintTypes = generatePaintTypes();
    for (const paintType of paintTypes) {
      await fs.writeFile(
        path.join(process.cwd(), 'data', 'indexes', 'paint-types', `${paintType.slug}.json`),
        JSON.stringify(paintType, null, 2)
      );
    }

    // Generate surface files
    const surfaces = generateSurfaces();
    for (const surface of surfaces) {
      await fs.writeFile(
        path.join(process.cwd(), 'data', 'indexes', 'surfaces', `${surface.slug}.json`),
        JSON.stringify(surface, null, 2)
      );
    }

    // Generate finish files
    const finishes = generateFinishes();
    for (const finish of finishes) {
      await fs.writeFile(
        path.join(process.cwd(), 'data', 'indexes', 'finishes', `${finish.slug}.json`),
        JSON.stringify(finish, null, 2)
      );
    }

    // Generate specialty files
    const specialties = generateSpecialties();
    for (const specialty of specialties) {
      await fs.writeFile(
        path.join(process.cwd(), 'data', 'indexes', 'specialties', `${specialty.slug}.json`),
        JSON.stringify(specialty, null, 2)
      );
    }

    console.log('Data generation completed successfully!');
  } catch (error) {
    console.error('Error generating data:', error);
    throw error;
  }
}

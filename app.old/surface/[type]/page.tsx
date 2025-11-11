import { notFound } from "next/navigation"
import fs from "fs/promises"
import path from "path"
import { Surface } from "@/lib/utils/types"

interface PageProps {
  params: {
    type: string
  }
}

async function getSurface(type: string): Promise<Surface | null> {
  try {
    const content = await fs.readFile(
      path.join(process.cwd(), "data", "indexes", "surfaces", `${type}.json`),
      "utf-8"
    )
    return JSON.parse(content)
  } catch (error) {
    return null
  }
}

export default async function SurfacePage({ params }: PageProps) {
  const surface = await getSurface(params.type)

  if (!surface) {
    notFound()
  }

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-4xl font-bold mb-4">{surface.name}</h1>
        <p className="text-lg text-muted-foreground">{surface.description}</p>
      </section>

      {surface.preparationSteps.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Surface Preparation</h2>
          <div className="grid gap-4">
            {surface.preparationSteps.map((step, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border bg-card text-card-foreground"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>
                  <p>{step}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {surface.recommendedProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Recommended Products</h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {surface.recommendedProducts.map((product, index) => (
              <li
                key={index}
                className="p-4 rounded-lg border bg-card text-card-foreground"
              >
                {product}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

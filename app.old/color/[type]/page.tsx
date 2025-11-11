import { notFound } from "next/navigation"
import fs from "fs/promises"
import path from "path"
import { PaintType } from "@/lib/utils/types"

interface PageProps {
  params: {
    type: string
  }
}

async function getColorType(type: string): Promise<PaintType | null> {
  try {
    const content = await fs.readFile(
      path.join(process.cwd(), "data", "indexes", "colors", `${type}.json`),
      "utf-8"
    )
    return JSON.parse(content)
  } catch (error) {
    return null
  }
}

export default async function ColorPage({ params }: PageProps) {
  const colorType = await getColorType(params.type)

  if (!colorType) {
    notFound()
  }

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-4xl font-bold mb-4">{colorType.name}</h1>
        <p className="text-lg text-muted-foreground">{colorType.description}</p>
      </section>

      {colorType.applications.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Best Applications</h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {colorType.applications.map((application, index) => (
              <li
                key={index}
                className="p-4 rounded-lg border bg-card text-card-foreground"
              >
                {application}
              </li>
            ))}
          </ul>
        </section>
      )}

      {colorType.benefits.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Benefits</h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {colorType.benefits.map((benefit, index) => (
              <li
                key={index}
                className="p-4 rounded-lg border bg-card text-card-foreground"
              >
                {benefit}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="bg-muted p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Color Psychology</h2>
        <div className="prose prose-slate max-w-none">
          <p>
            {colorType.name} colors are known to evoke certain emotions and moods in a space.
            Consider these psychological effects when choosing this color palette for your project.
          </p>
        </div>
      </section>
    </div>
  )
}

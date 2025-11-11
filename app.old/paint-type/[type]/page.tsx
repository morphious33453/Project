import { notFound } from "next/navigation"
import fs from "fs/promises"
import path from "path"
import { PaintType } from "@/lib/utils/types"

interface PageProps {
  params: {
    type: string
  }
}

async function getPaintType(type: string): Promise<PaintType | null> {
  try {
    const content = await fs.readFile(
      path.join(process.cwd(), "data", "indexes", "paint-types", `${type}.json`),
      "utf-8"
    )
    return JSON.parse(content)
  } catch (error) {
    return null
  }
}

export default async function PaintTypePage({ params }: PageProps) {
  const paintType = await getPaintType(params.type)

  if (!paintType) {
    notFound()
  }

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-4xl font-bold mb-4">{paintType.name}</h1>
        <p className="text-lg text-muted-foreground">{paintType.description}</p>
      </section>

      {paintType.applications.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Applications</h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {paintType.applications.map((application, index) => (
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

      {paintType.benefits.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Benefits</h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {paintType.benefits.map((benefit, index) => (
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
    </div>
  )
}

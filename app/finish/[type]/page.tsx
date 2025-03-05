import { notFound } from "next/navigation"
import fs from "fs/promises"
import path from "path"
import { Finish } from "@/lib/utils/types"

interface PageProps {
  params: {
    type: string
  }
}

async function getFinish(type: string): Promise<Finish | null> {
  try {
    const content = await fs.readFile(
      path.join(process.cwd(), "data", "indexes", "finishes", `${type}.json`),
      "utf-8"
    )
    return JSON.parse(content)
  } catch (error) {
    return null
  }
}

export default async function FinishPage({ params }: PageProps) {
  const finish = await getFinish(params.type)

  if (!finish) {
    notFound()
  }

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-4xl font-bold mb-4">{finish.name}</h1>
        <p className="text-lg text-muted-foreground">{finish.description}</p>
      </section>

      {finish.characteristics.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Characteristics</h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {finish.characteristics.map((characteristic, index) => (
              <li
                key={index}
                className="p-4 rounded-lg border bg-card text-card-foreground"
              >
                {characteristic}
              </li>
            ))}
          </ul>
        </section>
      )}

      {finish.bestUsedFor.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Best Used For</h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {finish.bestUsedFor.map((use, index) => (
              <li
                key={index}
                className="p-4 rounded-lg border bg-card text-card-foreground"
              >
                {use}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

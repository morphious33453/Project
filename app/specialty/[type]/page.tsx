import { notFound } from "next/navigation"
import fs from "fs/promises"
import path from "path"
import { Specialty } from "@/lib/utils/types"

interface PageProps {
  params: {
    type: string
  }
}

async function getSpecialty(type: string): Promise<Specialty | null> {
  try {
    const content = await fs.readFile(
      path.join(process.cwd(), "data", "indexes", "specialties", `${type}.json`),
      "utf-8"
    )
    return JSON.parse(content)
  } catch (error) {
    return null
  }
}

export default async function SpecialtyPage({ params }: PageProps) {
  const specialty = await getSpecialty(params.type)

  if (!specialty) {
    notFound()
  }

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-4xl font-bold mb-4">{specialty.name}</h1>
        <p className="text-lg text-muted-foreground">{specialty.description}</p>
      </section>

      {specialty.techniques.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Techniques</h2>
          <div className="grid gap-4">
            {specialty.techniques.map((technique, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border bg-card text-card-foreground"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>
                  <p>{technique}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {specialty.requiredSkills.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Required Skills</h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {specialty.requiredSkills.map((skill, index) => (
              <li
                key={index}
                className="p-4 rounded-lg border bg-card text-card-foreground"
              >
                {skill}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="bg-muted p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Professional Expertise</h2>
        <div className="prose prose-slate max-w-none">
          <p>
            {specialty.name} requires specialized knowledge and experience. 
            Consider hiring a professional with expertise in this technique for the best results.
          </p>
        </div>
      </section>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Sparkles, Loader2 } from 'lucide-react'

export default function GeneratorPage() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, shape: 'sticker' }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Generation failed')
      }

      setResult(data.design)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container max-w-screen-lg px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl font-bold mb-4">
          AI Sticker Generator
        </h1>
        <p className="text-lg text-muted-foreground">
          Describe your perfect sticker and let AI create it
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Describe your sticker
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A cute cat wearing sunglasses, retro style, vibrant colors"
            className="w-full h-32 px-4 py-3 rounded-xl border bg-background resize-none focus-ring"
            disabled={loading}
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          className="w-full inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground shadow-lg transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed focus-ring"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Generate Sticker
            </>
          )}
        </button>

        {error && (
          <div className="p-4 rounded-lg bg-destructive/10 text-destructive">
            {error}
          </div>
        )}

        {result && (
          <div className="p-6 rounded-2xl border bg-card">
            <h3 className="font-semibold mb-4">Generated Design</h3>
            <div className="aspect-square rounded-lg bg-muted mb-4 overflow-hidden">
              {result.previewUrl && (
                <img
                  src={result.previewUrl}
                  alt={result.prompt}
                  className="w-full h-full object-contain"
                />
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {result.prompt}
            </p>
            <a
              href={`/design/${result.slug}`}
              className="inline-flex items-center justify-center rounded-full border px-6 py-2 text-sm font-medium hover:bg-accent transition-colors"
            >
              View Details
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

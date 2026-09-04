function splitAndClean(text: string, pattern: RegExp): string[] {
  return text
    .split(pattern)
    .map((s) => s.trim())
    .filter(Boolean)
}

export function parseInstructions(raw: string): string[] {
  const trimmed = raw.trim()
  if (!trimmed) return []

  if (/STEP\s*\d+[:.]?/i.test(trimmed)) {
    return splitAndClean(trimmed, /STEP\s*\d+[:.]?\s*/gi)
  }

  if (/\d+[.)]\s+/.test(trimmed)) {
    return splitAndClean(trimmed, /\d+[.)]\s+/g)
  }

  const lines = splitAndClean(trimmed, /\r?\n+/g)
  return lines.length > 1 ? lines : [trimmed]
}

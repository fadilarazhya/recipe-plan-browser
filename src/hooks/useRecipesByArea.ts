import { useEffect, useState } from "react"
import type { Meal } from "@/hooks/useRecipes"

type Status = "loading" | "error" | "ready"

const BASE_URL = "https://www.themealdb.com/api/json/v1/1"

export function useRecipesByArea(area: string) {
  const [data, setData] = useState<Meal[]>([])
  const [status, setStatus] = useState<Status>("loading")

  useEffect(() => {
    let cancelled = false

    async function load() {
      setStatus("loading")

      try {
        const res = await fetch(`${BASE_URL}/filter.php?a=${encodeURIComponent(area)}`)
        const json = await res.json()

        if (cancelled) return
        setData(json.meals ?? [])
        setStatus("ready")
      } catch (err) {
        console.warn("recipes by area fetch failed", err)
        if (cancelled) return
        setStatus("error")
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [area])

  return { data, status }
}

import { useEffect, useState } from "react"

export type Meal = {
  idMeal: string
  strMeal: string
  strMealThumb: string
}

type Status = "loading" | "error" | "ready"

const ENDPOINT = "https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef"

export function useRecipes() {
  const [data, setData] = useState<Meal[]>([])
  const [status, setStatus] = useState<Status>("loading")
  const [isRefetching, setIsRefetching] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setStatus("loading")

      try {
        const res = await fetch(ENDPOINT)
        const json = await res.json()

        if (cancelled) return
        setData(json.meals ?? [])
        setStatus("ready")
      } catch (err) {
        console.warn("recipe fetch failed", err)
        if (cancelled) return
        setStatus("error")
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [])

  async function refetch() {
    setIsRefetching(true)

    try {
      const res = await fetch(ENDPOINT)
      const json = await res.json()
      setData(json.meals ?? [])
    } catch (err) {
      console.warn("recipe refetch failed", err)
    } finally {
      setIsRefetching(false)
    }
  }

  return { data, status, isRefetching, refetch }
}

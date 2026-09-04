import { useEffect, useState } from "react";

export type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

type Status = "loading" | "error" | "ready";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

function buildEndpoint(query: string) {
  return query
    ? `${BASE_URL}/search.php?s=${encodeURIComponent(query)}`
    : `${BASE_URL}/filter.php?c=Beef`;
}

export function useRecipes(query: string) {
  const [data, setData] = useState<Meal[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [isRefetching, setIsRefetching] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setStatus("loading");

      try {
        const res = await fetch(buildEndpoint(query));
        const json = await res.json();

        if (cancelled) return;
        setData(json.meals ?? []);
        setStatus("ready");
      } catch (err) {
        console.warn("recipe fetch failed", err);
        if (cancelled) return;
        setStatus("error");
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [query]);

  async function refetch() {
    setIsRefetching(true);

    try {
      const res = await fetch(buildEndpoint(query));
      const json = await res.json();
      setData(json.meals ?? []);
    } catch (err) {
      console.warn("recipe refetch failed", err);
    } finally {
      setIsRefetching(false);
    }
  }

  return { data, status, isRefetching, refetch };
}

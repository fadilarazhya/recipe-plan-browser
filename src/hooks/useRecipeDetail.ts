import { useEffect, useState } from "react";
import { normalizeIngredients, type Ingredient } from "@/utils/normalizeIngredients";

export type MealDetail = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strInstructions: string;
  ingredients: Ingredient[];
};

type Status = "loading" | "error" | "ready";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export function useRecipeDetail(id: string) {
  const [data, setData] = useState<MealDetail | null>(null);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setStatus("loading");

      try {
        const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
        const json = await res.json();
        const meal = json.meals?.[0] ?? null;

        if (cancelled) return;

        if (!meal) {
          setData(null);
          setStatus("ready");
          return;
        }

        setData({
          idMeal: meal.idMeal,
          strMeal: meal.strMeal,
          strMealThumb: meal.strMealThumb,
          strCategory: meal.strCategory,
          strInstructions: meal.strInstructions,
          ingredients: normalizeIngredients(meal),
        });
        setStatus("ready");
      } catch (err) {
        console.warn("recipe detail fetch failed", err);
        if (cancelled) return;
        setStatus("error");
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { data, status };
}

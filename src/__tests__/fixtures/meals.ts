import type { Meal } from "@/hooks/useRecipes"

export const mockMeal: Meal = {
  idMeal: "52772",
  strMeal: "Teriyaki Chicken",
  strMealThumb: "https://example.com/thumb.jpg",
}

export const mockMeals: Meal[] = [
  { idMeal: "1", strMeal: "Beef Stew", strMealThumb: "https://example.com/1.jpg" },
  { idMeal: "2", strMeal: "Chicken Curry", strMealThumb: "https://example.com/2.jpg" },
]

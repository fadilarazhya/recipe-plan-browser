export type Ingredient = {
  ingredient: string;
  measure: string;
};

type RawMeal = Record<string, string | null | undefined>;

export function normalizeIngredients(meal: RawMeal): Ingredient[] {
  const ingredients: Ingredient[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`]?.trim();
    const measure = meal[`strMeasure${i}`]?.trim();

    if (ingredient) {
      ingredients.push({ ingredient, measure: measure ?? "" });
    }
  }

  return ingredients;
}

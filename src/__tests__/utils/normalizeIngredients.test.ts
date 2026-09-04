import { normalizeIngredients } from "@/utils/normalizeIngredients";

describe("normalizeIngredients", () => {
  it("pairs each ingredient with its measure and drops empty slots", () => {
    const rawMeal = {
      strIngredient1: "Flour",
      strMeasure1: "200g",
      strIngredient2: "Sugar",
      strMeasure2: "100g",
      strIngredient3: "",
      strMeasure3: "",
      strIngredient4: null,
      strMeasure4: undefined,
    };

    expect(normalizeIngredients(rawMeal)).toEqual([
      { ingredient: "Flour", measure: "200g" },
      { ingredient: "Sugar", measure: "100g" },
    ]);
  });

  it("returns an empty array when there are no ingredients", () => {
    expect(normalizeIngredients({})).toEqual([]);
  });
});

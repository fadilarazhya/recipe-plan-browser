import { render, screen } from "@testing-library/react-native";
import { FlatList } from "react-native";
import { RecipeCard } from "@/components/RecipeCard";
import type { Meal } from "@/hooks/useRecipes";

const meals: Meal[] = [
  { idMeal: "1", strMeal: "Beef Stew", strMealThumb: "https://example.com/1.jpg" },
  { idMeal: "2", strMeal: "Chicken Curry", strMealThumb: "https://example.com/2.jpg" },
];

describe("RecipeCard list", () => {
  it("renders a title for every meal in the list", async () => {
    await render(
      <FlatList
        data={meals}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => <RecipeCard meal={item} />}
      />,
    );

    expect(screen.getByText("Beef Stew")).toBeTruthy();
    expect(screen.getByText("Chicken Curry")).toBeTruthy();
  });
});

import { render, screen } from "@testing-library/react-native"
import { FlatList } from "react-native"
import { RecipeCard } from "@/components/RecipeCard"
import { mockMeals } from "../fixtures/meals"

describe("RecipeCard list", () => {
  it("renders a title for every meal in the list", async () => {
    await render(
      <FlatList
        data={mockMeals}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => <RecipeCard meal={item} />}
      />,
    )

    expect(screen.getByText("Beef Stew")).toBeTruthy()
    expect(screen.getByText("Chicken Curry")).toBeTruthy()
  })
})

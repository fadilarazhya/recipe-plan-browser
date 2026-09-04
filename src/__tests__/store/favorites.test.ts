import { useFavorites } from "@/store/favorites";

const mockMeal = {
  idMeal: "52772",
  strMeal: "Teriyaki Chicken",
  strMealThumb: "https://example.com/thumb.jpg",
};

describe("useFavorites store", () => {
  beforeEach(() => {
    useFavorites.setState({ items: [] });
  });

  it("adds a meal to favorites when toggled on", () => {
    useFavorites.getState().toggleFavorite(mockMeal);

    expect(useFavorites.getState().isFavorite(mockMeal.idMeal)).toBe(true);
    expect(useFavorites.getState().items).toEqual([mockMeal]);
  });

  it("removes a meal from favorites when toggled again", () => {
    useFavorites.getState().toggleFavorite(mockMeal);
    useFavorites.getState().toggleFavorite(mockMeal);

    expect(useFavorites.getState().isFavorite(mockMeal.idMeal)).toBe(false);
    expect(useFavorites.getState().items).toEqual([]);
  });
});

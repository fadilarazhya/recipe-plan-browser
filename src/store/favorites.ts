import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Meal } from "@/hooks/useRecipes";

type FavoritesState = {
  items: Meal[];
  toggleFavorite: (meal: Meal) => void;
  isFavorite: (id: string) => boolean;
};

export const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleFavorite: (meal) => {
        const alreadyFavorite = get().items.some(
          (item) => item.idMeal === meal.idMeal,
        );

        set({
          items: alreadyFavorite
            ? get().items.filter((item) => item.idMeal !== meal.idMeal)
            : [...get().items, meal],
        });
      },
      isFavorite: (id) => get().items.some((item) => item.idMeal === id),
    }),
    {
      name: "favorites-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

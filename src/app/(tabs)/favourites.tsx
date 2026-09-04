import { FlatList } from "react-native";
import { useFavorites } from "@/store/favorites";
import { RecipeCard } from "@/components/RecipeCard";
import { StateView } from "@/components/StateView";

export default function FavouritesScreen() {
  const items = useFavorites((state) => state.items);

  return (
    <StateView status="ready" isEmpty={items.length === 0} emptyMessage="No favorites yet.">
      <FlatList
        data={items}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => <RecipeCard meal={item} />}
      />
    </StateView>
  );
}

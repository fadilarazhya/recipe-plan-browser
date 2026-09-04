import { Image, Pressable, Text, View, StyleSheet } from "react-native";
import { router } from "expo-router";
import type { Meal } from "@/hooks/useRecipes";
import { useFavorites } from "@/store/favorites";
import { colors, spacing } from "@/theme";

export function RecipeCard({ meal }: { meal: Meal }) {
  const isFavorite = useFavorites((state) => state.isFavorite(meal.idMeal));
  const toggleFavorite = useFavorites((state) => state.toggleFavorite);

  return (
    <Pressable
      onPress={() => router.push(`/recipe/${meal.idMeal}`)}
      accessibilityRole="button"
      accessibilityLabel={`Open recipe for ${meal.strMeal}`}
    >
      {({ pressed }) => (
        <View style={[styles.card, pressed && styles.cardPressed]}>
          <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
          <Text style={styles.title}>{meal.strMeal}</Text>
          <Pressable
            onPress={() => toggleFavorite(meal)}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={
              isFavorite
                ? `Remove ${meal.strMeal} from favorites`
                : `Add ${meal.strMeal} to favorites`
            }
          >
            <Text style={styles.heart}>{isFavorite ? "♥" : "♡"}</Text>
          </Pressable>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.md,
  },
  cardPressed: {
    opacity: 0.6,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: spacing.sm,
  },
  title: {
    fontSize: 16,
    flex: 1,
  },
  heart: {
    fontSize: 22,
    color: colors.favorite,
  },
});

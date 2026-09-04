import { Image, Platform, Pressable, Text, View, StyleSheet } from "react-native"
import { router } from "expo-router"
import type { Meal } from "@/hooks/useRecipes"
import { useFavorites } from "@/store/favorites"
import { colors, fontSize, spacing } from "@/theme"
import { getFavoriteAccessibilityLabel } from "@/utils/favoriteLabel"

export function RecipeCard({ meal }: { meal: Meal }) {
  const isFavorite = useFavorites((state) => state.isFavorite(meal.idMeal))
  const toggleFavorite = useFavorites((state) => state.toggleFavorite)

  return (
    <Pressable
      onPress={() => router.push(`/recipe/${meal.idMeal}`)}
      accessibilityRole="button"
      accessibilityLabel={`Open recipe for ${meal.strMeal}`}
      style={styles.cardWrapper}
    >
      {({ pressed }) => (
        <View style={[styles.card, pressed && styles.cardPressed]}>
          <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.title} numberOfLines={1}>
              {meal.strMeal}
            </Text>
            <Pressable
              onPress={() => toggleFavorite(meal)}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel={getFavoriteAccessibilityLabel(meal.strMeal, isFavorite)}
            >
              <Text style={[styles.favoriteIcon, !isFavorite && styles.favoriteIconInactive]}>
                {isFavorite ? "★" : "☆"}
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  cardWrapper: {
    flex: 1,
  },
  card: {
    borderRadius: spacing.md,
    backgroundColor: colors.card,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  cardPressed: {
    opacity: 0.6,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: colors.border,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    padding: spacing.sm,
  },
  title: {
    fontSize: fontSize.sm,
    color: colors.text,
    flex: 1,
  },
  favoriteIcon: {
    fontSize: 20,
    color: colors.favorite,
  },
  favoriteIconInactive: {
    color: colors.text,
  },
})

import { Image, Platform, Pressable, ScrollView, Text, View, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { router, Stack, useLocalSearchParams } from "expo-router"
import { useRecipeDetail, type MealDetail } from "@/hooks/useRecipeDetail"
import { StateView } from "@/components/StateView"
import { useFavorites } from "@/store/favorites"
import { colors, fontSize, spacing } from "@/theme"
import { getFavoriteAccessibilityLabel } from "@/utils/favoriteLabel"
import { parseInstructions } from "@/utils/parseInstructions"

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { data, status } = useRecipeDetail(id)

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StateView status={status} isEmpty={!data} emptyMessage="Recipe not found.">
        {data && <RecipeContent data={data} />}
      </StateView>
    </>
  )
}

function RecipeContent({ data }: { data: MealDetail }) {
  const isFavorite = useFavorites((state) => state.isFavorite(data.idMeal))
  const toggleFavorite = useFavorites((state) => state.toggleFavorite)
  const steps = parseInstructions(data.strInstructions)

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView>
        <View style={styles.heroWrapper}>
          <Image source={{ uri: data.strMealThumb }} style={styles.heroImage} />
          <Pressable
            onPress={() => router.back()}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            style={[styles.iconButton, styles.backButton]}
          >
            <Ionicons name="chevron-back" size={22} color={colors.text} />
          </Pressable>
          <Pressable
            onPress={() =>
              toggleFavorite({
                idMeal: data.idMeal,
                strMeal: data.strMeal,
                strMealThumb: data.strMealThumb,
              })
            }
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={getFavoriteAccessibilityLabel(data.strMeal, isFavorite)}
            style={[styles.iconButton, styles.favoriteButton]}
          >
            <Text style={[styles.favoriteIcon, !isFavorite && styles.favoriteIconInactive]}>
              {isFavorite ? "★" : "☆"}
            </Text>
          </Pressable>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{data.strMeal}</Text>
          <Text style={styles.category}>{data.strCategory}</Text>

          <Text style={styles.sectionTitle}>Ingredients</Text>
          {data.ingredients.map((item, index) => (
            <Text key={index} style={styles.ingredient}>
              {item.measure} {item.ingredient}
            </Text>
          ))}

          <Text style={styles.sectionTitle}>Instructions</Text>
          {steps.map((step, index) => (
            <Text key={index} style={styles.instructions}>
              {steps.length > 1 ? `${index + 1}. ${step}` : step}
            </Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  heroWrapper: {
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: 320,
    backgroundColor: colors.border,
  },
  iconButton: {
    position: "absolute",
    top: spacing.md,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  backButton: {
    left: spacing.md,
  },
  favoriteButton: {
    right: spacing.md,
  },
  content: {
    marginTop: -spacing.lg,
    padding: spacing.lg,
    backgroundColor: colors.card,
    borderTopLeftRadius: spacing.lg,
    borderTopRightRadius: spacing.lg,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: "bold",
    color: colors.text,
  },
  favoriteIcon: {
    fontSize: 22,
    color: colors.favorite,
  },
  favoriteIconInactive: {
    color: colors.text,
  },
  category: {
    fontSize: fontSize.sm,
    color: colors.muted,
    marginTop: 4,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: "600",
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  ingredient: {
    fontSize: fontSize.sm,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 4,
  },
  instructions: {
    fontSize: fontSize.sm,
    color: colors.text,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
})

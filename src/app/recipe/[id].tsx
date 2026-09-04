import { Image, Pressable, ScrollView, Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams } from "expo-router";
import { useRecipeDetail, type MealDetail } from "@/hooks/useRecipeDetail";
import { StateView } from "@/components/StateView";
import { useFavorites } from "@/store/favorites";
import { colors, spacing } from "@/theme";
import { parseInstructions } from "@/utils/parseInstructions";

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, status } = useRecipeDetail(id);

  return (
    <>
      <Stack.Screen options={{ title: data?.strMeal ?? "Recipe" }} />
      <StateView status={status} isEmpty={!data} emptyMessage="Recipe not found.">
        {data && <RecipeContent data={data} />}
      </StateView>
    </>
  );
}

function RecipeContent({ data }: { data: MealDetail }) {
  const isFavorite = useFavorites((state) => state.isFavorite(data.idMeal));
  const toggleFavorite = useFavorites((state) => state.toggleFavorite);
  const steps = parseInstructions(data.strInstructions);

  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: data.strMealThumb }} style={styles.image} />
        <View style={styles.titleRow}>
          <Text style={styles.title}>{data.strMeal}</Text>
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
            accessibilityLabel={
              isFavorite
                ? `Remove ${data.strMeal} from favorites`
                : `Add ${data.strMeal} to favorites`
            }
          >
            <Text style={styles.heart}>{isFavorite ? "♥" : "♡"}</Text>
          </Pressable>
        </View>
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: spacing.lg,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: spacing.sm,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.md,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    flex: 1,
  },
  heart: {
    fontSize: 26,
    color: colors.favorite,
  },
  category: {
    fontSize: 14,
    color: colors.muted,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  ingredient: {
    fontSize: 14,
    marginBottom: 4,
  },
  instructions: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
});

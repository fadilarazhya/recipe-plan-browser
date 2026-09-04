import { FlatList, StyleSheet, View } from "react-native"
import { Stack, useLocalSearchParams } from "expo-router"
import { useRecipesByArea } from "@/hooks/useRecipesByArea"
import { RecipeCard } from "@/components/RecipeCard"
import { StateView } from "@/components/StateView"
import { colors, spacing } from "@/theme"

export default function AreaRecipesScreen() {
  const { name } = useLocalSearchParams<{ name: string }>()
  const { data, status } = useRecipesByArea(name)

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: name }} />
      <StateView status={status} isEmpty={data.length === 0} emptyMessage="No recipes found.">
        <FlatList
          data={data}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => <RecipeCard meal={item} />}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
        />
      </StateView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  row: {
    gap: spacing.sm,
  },
})

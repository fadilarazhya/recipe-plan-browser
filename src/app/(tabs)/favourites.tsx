import { FlatList, StyleSheet, View } from "react-native"
import { useFavorites } from "@/store/favorites"
import { RecipeCard } from "@/components/RecipeCard"
import { StateView } from "@/components/StateView"
import { colors, spacing } from "@/theme"

export default function FavouritesScreen() {
  const items = useFavorites((state) => state.items)

  return (
    <View style={styles.container}>
      <StateView status="ready" isEmpty={items.length === 0} emptyMessage="No favorites yet.">
        <FlatList
          data={items}
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

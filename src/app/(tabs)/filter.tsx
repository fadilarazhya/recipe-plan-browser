import { useEffect, useState } from "react"
import { FlatList, Pressable, Text, TextInput, View, StyleSheet } from "react-native"
import { router } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { AREAS } from "@/constants/areas"
import { useDebouncedValue } from "@/hooks/useDebouncedValue"
import { RecipeCard } from "@/components/RecipeCard"
import { StateView } from "@/components/StateView"
import { colors, fontSize, spacing } from "@/theme"
import type { Meal } from "@/hooks/useRecipes"

const BASE_URL = "https://www.themealdb.com/api/json/v1/1"

export default function FilterScreen() {
  const [query, setQuery] = useState("")
  const debouncedQuery = useDebouncedValue(query, 400)
  const isSearching = debouncedQuery.length > 0

  const [data, setData] = useState<Meal[]>([])
  const [status, setStatus] = useState<"loading" | "error" | "ready">("ready")

  useEffect(() => {
    if (!debouncedQuery) return

    let cancelled = false

    async function load() {
      setStatus("loading")

      try {
        const res = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(debouncedQuery)}`)
        const json = await res.json()

        if (cancelled) return
        setData(json.meals ?? [])
        setStatus("ready")
      } catch (err) {
        console.warn("recipe search failed", err)
        if (cancelled) return
        setStatus("error")
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [debouncedQuery])

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search recipes..."
        value={query}
        onChangeText={setQuery}
        autoCapitalize="none"
      />

      {isSearching ? (
        <StateView status={status} isEmpty={data.length === 0} emptyMessage="No recipes found.">
          <FlatList
            data={data}
            keyExtractor={(item) => item.idMeal}
            renderItem={({ item }) => <RecipeCard meal={item} />}
            numColumns={2}
            columnWrapperStyle={styles.row}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            contentContainerStyle={styles.listContent}
          />
        </StateView>
      ) : (
        <FlatList
          data={AREAS}
          keyExtractor={(item) => item}
          numColumns={2}
          columnWrapperStyle={styles.row}
          keyboardShouldPersistTaps="handled"
          ListHeaderComponent={<Text style={styles.sectionTitle}>Explore by cuisine</Text>}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => router.push(`/area/${encodeURIComponent(item)}`)}
              style={({ pressed }) => [styles.areaCard, pressed && styles.areaCardPressed]}
            >
              <Text style={styles.areaCardText} numberOfLines={1}>
                {item}
              </Text>
              <Ionicons name="chevron-forward" size={18} color={colors.muted} />
            </Pressable>
          )}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  input: {
    margin: spacing.md,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: fontSize.md,
    backgroundColor: "#f2f2f2",
    borderRadius: 999,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.sm,
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
  areaCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  areaCardPressed: {
    opacity: 0.6,
  },
  areaCardText: {
    fontSize: fontSize.sm,
    color: colors.text,
    flex: 1,
  },
})

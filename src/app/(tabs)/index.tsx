import { useState } from "react";
import { FlatList, RefreshControl, TextInput, View, StyleSheet } from "react-native";
import { useRecipes } from "@/hooks/useRecipes";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { RecipeCard } from "@/components/RecipeCard";
import { StateView } from "@/components/StateView";
import { colors, spacing } from "@/theme";

export default function RecipesScreen() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 400);
  const { data, status, isRefetching, refetch } = useRecipes(debouncedQuery);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search recipes..."
        value={query}
        onChangeText={setQuery}
        autoCapitalize="none"
      />
      <StateView status={status} isEmpty={data.length === 0}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => <RecipeCard meal={item} />}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }
        />
      </StateView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    margin: spacing.md,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.sm,
  },
});

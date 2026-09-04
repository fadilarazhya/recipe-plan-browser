import { ActivityIndicator, Text, View, StyleSheet } from "react-native"
import type { ReactNode } from "react"
import { colors, fontSize, spacing } from "@/theme"

type StateViewProps = {
  status: "loading" | "error" | "ready"
  isEmpty?: boolean
  errorMessage?: string
  emptyMessage?: string
  children: ReactNode
}

export function StateView({
  status,
  isEmpty,
  errorMessage = "Something went wrong. Pull down to retry.",
  emptyMessage = "No recipes found.",
  children,
}: StateViewProps) {
  if (status === "loading") {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    )
  }

  if (status === "error") {
    return (
      <View style={styles.center}>
        <Text style={styles.message}>{errorMessage}</Text>
      </View>
    )
  }

  if (isEmpty) {
    return (
      <View style={styles.center}>
        <Text style={styles.message}>{emptyMessage}</Text>
      </View>
    )
  }

  return <>{children}</>
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
  },
  message: {
    fontSize: fontSize.md,
    color: colors.muted,
    textAlign: "center",
  },
})

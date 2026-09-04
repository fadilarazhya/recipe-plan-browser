export function getFavoriteAccessibilityLabel(mealName: string, isFavorite: boolean): string {
  if (isFavorite) {
    return `Remove ${mealName} from favorites`
  }
  return `Add ${mealName} to favorites`
}

import { getFavoriteAccessibilityLabel } from "@/utils/favoriteLabel"

describe("getFavoriteAccessibilityLabel", () => {
  it("returns a remove label when already favorited", () => {
    expect(getFavoriteAccessibilityLabel("Spaghetti", true)).toBe(
      "Remove Spaghetti from favorites"
    )
  })

  it("returns an add label when not favorited", () => {
    expect(getFavoriteAccessibilityLabel("Spaghetti", false)).toBe(
      "Add Spaghetti to favorites"
    )
  })
})

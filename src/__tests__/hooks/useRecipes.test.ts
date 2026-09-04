import { renderHook, waitFor } from "@testing-library/react-native"
import { useRecipes } from "@/hooks/useRecipes"
import { mockMeals } from "../fixtures/meals"

describe("useRecipes", () => {
  const originalFetch = globalThis.fetch

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  it("loads meals from the API into data", async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ meals: [mockMeals[0]] }),
    }) as unknown as typeof fetch

    const { result } = await renderHook(() => useRecipes())

    await waitFor(() => expect(result.current.status).toBe("ready"))

    expect(result.current.data).toEqual([mockMeals[0]])
  })

  it("treats a null meals response (API found nothing) as an empty list", async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ meals: null }),
    }) as unknown as typeof fetch

    const { result } = await renderHook(() => useRecipes())

    await waitFor(() => expect(result.current.status).toBe("ready"))

    expect(result.current.data).toEqual([])
  })
})

import { renderHook, waitFor } from "@testing-library/react-native";
import { useRecipes } from "@/hooks/useRecipes";

describe("useRecipes", () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("loads meals from the API into data", async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      json: () =>
        Promise.resolve({
          meals: [
            { idMeal: "1", strMeal: "Beef Stew", strMealThumb: "https://example.com/1.jpg" },
          ],
        }),
    }) as unknown as typeof fetch;

    const { result } = await renderHook(() => useRecipes(""));

    await waitFor(() => expect(result.current.status).toBe("ready"));

    expect(result.current.data).toEqual([
      { idMeal: "1", strMeal: "Beef Stew", strMealThumb: "https://example.com/1.jpg" },
    ]);
  });

  it("treats a null meals response (API found nothing) as an empty list", async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ meals: null }),
    }) as unknown as typeof fetch;

    const { result } = await renderHook(() => useRecipes(""));

    await waitFor(() => expect(result.current.status).toBe("ready"));

    expect(result.current.data).toEqual([]);
  });
});

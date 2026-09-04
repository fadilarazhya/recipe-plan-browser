import { parseInstructions } from "@/utils/parseInstructions"

describe("parseInstructions", () => {
  it("splits on STEP markers", () => {
    expect(parseInstructions("STEP 1 Mix flour STEP 2 Bake it")).toEqual([
      "Mix flour",
      "Bake it",
    ])
  })

  it("splits on numbered markers even inline", () => {
    expect(parseInstructions("1. Prepare, 2. Mix 3. Bake")).toEqual([
      "Prepare,",
      "Mix",
      "Bake",
    ])
  })

  it("falls back to splitting on newlines when there is no marker", () => {
    expect(parseInstructions("Prepare\nMix\nBake")).toEqual([
      "Prepare",
      "Mix",
      "Bake",
    ])
  })

  it("returns the whole text as a single step when nothing can be split", () => {
    expect(parseInstructions("Just do it all at once")).toEqual([
      "Just do it all at once",
    ])
  })
})

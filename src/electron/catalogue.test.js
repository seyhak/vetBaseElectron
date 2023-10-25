const { createItem, openCatalogue } = require("./catalogue.js")

describe("catalogue.js", () => {
  describe("openCatalogue", () => {
    test("open properly", async () => {
      const result1 = await openCatalogue()
      expect(result1).toEqual([])
      const result2 = await createItem({}, "test input 1", {})
      expect(result2).toEqual(1)
    })
  })
  describe.skip("createItem", () => {
    test.skip("create properly", async () => {
      const result1 = await openCatalogue()
      expect(result1).toEqual([])
      const result2 = createItem({}, "test input 1", {})
      expect(result2).toEqual(1)
    })
  })
})

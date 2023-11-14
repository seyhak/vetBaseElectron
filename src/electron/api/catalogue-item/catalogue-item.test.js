const {
  createItem,
  getListCatalogue,
  updateItem,
} = require("./catalogue-item.js")

// TODO test database required and separate nodejs tests (not react-scripts)
describe("catalogue-item", () => {
  describe.skip("getListCatalogue", () => {
    test("open properly", async () => {
      const result1 = await getListCatalogue()
      expect(result1).toEqual([])
      const result2 = await createItem({}, "test input 1", {})
      expect(result2).toEqual(1)
    })
  })
  describe.skip("createItem", () => {
    test.skip("create properly", async () => {
      const result1 = await getListCatalogue()
      expect(result1).toEqual([])
      const result2 = createItem({}, "test input 1", {})
      expect(result2).toEqual(1)
    })
  })
  describe.skip("updateItem", () => {
    test("create with categories", async () => {
      const result1 = await getListCatalogue()
      expect(result1).toEqual([])
      const result2 = createItem({}, "test input 1", {})
      expect(result2).toEqual(1)
    })
  })
})

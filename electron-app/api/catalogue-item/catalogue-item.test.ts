const {
  createItem,
  getListCatalogue,
  updateItem,
  getDetailedItem,
} = require("./catalogue-item.js")
const { CatalogueItem } = require("#root/models/catalogue-item.js")
const { Category, CategoryCatalogueItemThroughTable } = require("#root/models/category.js")
const { createCategory } = require("#root/api/category/category.js")
const { synchronizeDb } = require("#root/electron-starter.func.ts")

const getListOfCatalogueItemsAndVerifyType = async () => {
  const list = await getListCatalogue()
  expect(Array.isArray(list)).toBeTruthy()
  return list
}

describe("catalogue-item", () => {
  describe("createItem", () => {
    beforeEach(async () => {
      await CatalogueItem.sync({force: true})
    })
    test("create properly", async () => {
      const preTestList = await getListOfCatalogueItemsAndVerifyType()
      expect(preTestList).toHaveLength(0)

      const creationResult = await createItem({}, "test input 1", {})
      expect(typeof creationResult).toBe("string")
      const jsonResult = JSON.parse(creationResult)
      expect(jsonResult).toMatchObject({
        id: expect.any(String),
        title: expect.any(String),
        description: expect.any(Object),
        updatedAt: expect.any(String),
        createdAt: expect.any(String),
      })

      const postTestList = await getListOfCatalogueItemsAndVerifyType()
      expect(postTestList).toHaveLength(preTestList.length + 1)
      expect(postTestList).toEqual([
        expect.objectContaining({
          "description": expect.any(Object),
          "id": expect.any(String),
          "title": "test input 1",
        },)
      ])
    })
    test.each([null, undefined])("create failed, no title - %s", async (title) => {
      const preTestList = await getListOfCatalogueItemsAndVerifyType()
      expect(preTestList).toHaveLength(0)

      const creationResult = await createItem({}, title, {})
      expect(typeof creationResult).toBe("string")
      const jsonResult = JSON.parse(creationResult)
      expect(jsonResult).toMatchObject({
        name: "SequelizeValidationError",
        errors: expect.any(Array),
      })

      const postTestList = await getListOfCatalogueItemsAndVerifyType()
      expect(postTestList).toHaveLength(preTestList.length)
    })
  })
  describe("updateItem", () => {
    beforeEach(async () => {
      await synchronizeDb(true)
    })
    test("update with categories", async () => {
      const preTestList = await getListOfCatalogueItemsAndVerifyType()

      const creationResult = await createItem({}, "test input 1", {})
      expect(typeof creationResult).toBe("string")
      const jsonResult = JSON.parse(creationResult)
      expect(jsonResult).toMatchObject({
        id: expect.any(String),
        title: "test input 1",
        description: expect.any(Object),
        updatedAt: expect.any(String),
        createdAt: expect.any(String),
      })

      const c1 = await createCategory({}, "cat1")
      expect(typeof c1).toBe("string")
      const category1 = JSON.parse(c1)
      expect(category1).toMatchObject({
        id: expect.any(String),
        name: "cat1",
        description: expect.any(String),
        updatedAt: expect.any(String),
        createdAt: expect.any(String),
      })

      const c2 = await createCategory({}, "cat2")
      expect(typeof c2).toBe("string")
      const category2 = JSON.parse(c2)
      expect(category2).toMatchObject({
        id: expect.any(String),
        name: "cat2",
        description: expect.any(String),
        updatedAt: expect.any(String),
        createdAt: expect.any(String),
      })

      const updateContent = {
        title: "changed test input 1",
        categories: [
          category1.id,
          category2.id
        ]
      }
      const updateResult = await updateItem({}, jsonResult.id, updateContent)
      expect(updateResult).toBeUndefined()

      const postTestList = await getListOfCatalogueItemsAndVerifyType()
      expect(postTestList).toHaveLength(preTestList.length + 1)

      const updatedJson = await getDetailedItem({}, jsonResult.id)
      const updated = JSON.parse(updatedJson)
      expect(updated).toMatchObject({
        "Categories": expect.arrayContaining([
          {
            "description": "",
            "id": category1.id,
            "name": "cat1",
            "updatedAt": expect.any(String),
          },
          {
            "description": "",
            "id": category2.id,
            "name": "cat2",
            "updatedAt": expect.any(String),
          }
        ]),
        "createdAt": expect.any(String),
        "description": {},
        "id": expect.any(String),
        "title": expect.any(String),
      })
    })
    test.skip("update without categories", async () => {})
    test.skip("update failure with bad payload", async () => {})
  })
  describe("getListCatalogue", () => {
    beforeEach(async () => {
      await synchronizeDb(true)
    })
    test("success", async () => {
      const result1 = await getListOfCatalogueItemsAndVerifyType()
      expect(result1).toEqual([])
      await createItem({}, "test input 1", {})
      await createItem({}, "test input 2", {})
      const result2 = await getListOfCatalogueItemsAndVerifyType()
      expect(result2).toHaveLength(2)
      expect(result2).toEqual([
        expect.objectContaining({
          "description": expect.any(Object),
          "id": expect.any(String),
          "title": "test input 1",
        }),
        expect.objectContaining({
          "description": expect.any(Object),
          "id": expect.any(String),
          "title": "test input 2",
        },)
      ])
    })
    test.skip("sort success", async () => {})
    test.skip("failure", async () => {})
  })
})

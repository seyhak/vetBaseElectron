const {
  createItem,
  getListCatalogue,
  updateItem,
  getDetailedItem,
} = require("./catalogue-item.js")
const { CatalogueItem } = require("#root/models/catalogue-item.js")
const {
  Category,
  CategoryCatalogueItemThroughTable,
} = require("#root/models/category.js")
const { createCategory } = require("#root/api/category/category.js")
const { synchronizeDb } = require("#root/electron-starter.func.ts")

const getListOfCatalogueItemsAndVerifyType = async (grouped = false) => {
  const list = await getListCatalogue({}, "", grouped)
  expect(Array.isArray(list)).toBeTruthy()
  return list
}

describe("catalogue-item", () => {
  // describe("createItem", () => {
  //   beforeEach(async () => {
  //     await synchronizeDb(true)
  //   })
  //   test("create properly", async () => {
  //     const preTestList = await getListOfCatalogueItemsAndVerifyType()
  //     expect(preTestList).toHaveLength(0)

  //     const creationResult = await createItem({}, { name: "test input 1", description: {}})
  //     expect(typeof creationResult).toBe("string")
  //     const jsonResult = JSON.parse(creationResult)
  //     expect(jsonResult).toMatchObject({
  //       id: expect.any(String),
  //       name: expect.any(String),
  //       description: expect.any(Object),
  //       updatedAt: expect.any(String),
  //       createdAt: expect.any(String),
  //     })

  //     const postTestList = await getListOfCatalogueItemsAndVerifyType()
  //     expect(postTestList).toHaveLength(preTestList.length + 1)
  //     expect(postTestList).toEqual([
  //       expect.objectContaining({
  //         "description": expect.any(Object),
  //         "id": expect.any(String),
  //         "name": "test input 1",
  //       },)
  //     ])
  //   })
  //   test("create with category", async () => {
  //     const preTestList = await getListOfCatalogueItemsAndVerifyType()
  //     expect(preTestList).toHaveLength(0)

  //     const category1 = await Category.create({ name: "cat1", description: "i am dino" })
  //     const category2 = await Category.create({ name: "cat2" })
  //     await Category.create({ name: "cat3" })
  //     expect(await Category.count()).toEqual(3)

  //     const creationResult = await createItem({}, { name: "test input 1", description: {}, categoryIds: [
  //       category1.id,
  //       category2.id
  //     ]})
  //     console.log('creationResult', creationResult)
  //     expect(typeof creationResult).toBe("string")
  //     const jsonResult = JSON.parse(creationResult)
  //     expect(jsonResult).toMatchObject({
  //       id: expect.any(String),
  //       name: expect.any(String),
  //       description: expect.any(Object),
  //       updatedAt: expect.any(String),
  //       createdAt: expect.any(String),
  //     })

  //     const createdItemStr = await getDetailedItem({}, jsonResult.id)
  //     const createdItem = JSON.parse(createdItemStr)
  //     expect(createdItem.Categories).toHaveLength(2)
  //     expect(createdItem).toMatchObject({
  //       id: expect.any(String),
  //       name: expect.any(String),
  //       description: expect.any(Object),
  //       updatedAt: expect.any(String),
  //       createdAt: expect.any(String),
  //       Categories: expect.arrayContaining([
  //         {
  //           id: expect.any(String),
  //           name: "cat1",
  //           description: "i am dino",
  //           updatedAt: expect.any(String),
  //         },
  //         {
  //           id: expect.any(String),
  //           name: "cat2",
  //           description: null,
  //           updatedAt: expect.any(String),
  //         },
  //       ])
  //     })

  //     const postTestList = await getListOfCatalogueItemsAndVerifyType()
  //     expect(postTestList).toHaveLength(preTestList.length + 1)
  //     expect(postTestList).toEqual([
  //       expect.objectContaining({
  //         "description": expect.any(Object),
  //         "id": expect.any(String),
  //         "name": "test input 1",
  //       },)
  //     ])
  //   })
  //   test.each([null, undefined])("create failed, no name - %s", async (name) => {
  //     const preTestList = await getListOfCatalogueItemsAndVerifyType()
  //     expect(preTestList).toHaveLength(0)

  //     const creationResult = await createItem({}, { name, description: {}})
  //     expect(typeof creationResult).toBe("string")
  //     const jsonResult = JSON.parse(creationResult)
  //     expect(jsonResult).toMatchObject({
  //       name: "SequelizeValidationError",
  //       errors: expect.any(Array),
  //     })

  //     const postTestList = await getListOfCatalogueItemsAndVerifyType()
  //     expect(postTestList).toHaveLength(preTestList.length)
  //   })
  // })
  // describe("updateItem", () => {
  //   beforeEach(async () => {
  //     await synchronizeDb(true)
  //   })
  //   test("update with categories", async () => {
  //     const preTestList = await getListOfCatalogueItemsAndVerifyType()

  //     const creationResult = await createItem({}, { name: "test input 1", description: {}})
  //     expect(typeof creationResult).toBe("string")
  //     const jsonResult = JSON.parse(creationResult)
  //     expect(jsonResult).toMatchObject({
  //       id: expect.any(String),
  //       name: "test input 1",
  //       description: expect.any(Object),
  //       updatedAt: expect.any(String),
  //       createdAt: expect.any(String),
  //     })

  //     const c1 = await createCategory({}, "cat1")
  //     expect(typeof c1).toBe("string")
  //     const category1 = JSON.parse(c1)
  //     expect(category1).toMatchObject({
  //       id: expect.any(String),
  //       name: "cat1",
  //       description: expect.any(String),
  //       updatedAt: expect.any(String),
  //       createdAt: expect.any(String),
  //     })

  //     const c2 = await createCategory({}, "cat2")
  //     expect(typeof c2).toBe("string")
  //     const category2 = JSON.parse(c2)
  //     expect(category2).toMatchObject({
  //       id: expect.any(String),
  //       name: "cat2",
  //       description: expect.any(String),
  //       updatedAt: expect.any(String),
  //       createdAt: expect.any(String),
  //     })

  //     const updateContent = {
  //       name: "changed test input 1",
  //       categories: [
  //         category1.id,
  //         category2.id
  //       ]
  //     }
  //     const updateResult = await updateItem({}, jsonResult.id, updateContent)
  //     expect(updateResult).toBeUndefined()

  //     const postTestList = await getListOfCatalogueItemsAndVerifyType()
  //     expect(postTestList).toHaveLength(preTestList.length + 1)

  //     const updatedJson = await getDetailedItem({}, jsonResult.id)
  //     const updated = JSON.parse(updatedJson)
  //     expect(updated).toMatchObject({
  //       "Categories": expect.arrayContaining([
  //         {
  //           "description": "",
  //           "id": category1.id,
  //           "name": "cat1",
  //           "updatedAt": expect.any(String),
  //         },
  //         {
  //           "description": "",
  //           "id": category2.id,
  //           "name": "cat2",
  //           "updatedAt": expect.any(String),
  //         }
  //       ]),
  //       "createdAt": expect.any(String),
  //       "description": {},
  //       "id": expect.any(String),
  //       "name": expect.any(String),
  //     })
  //   })
  //   test.skip("update without categories", async () => {})
  //   test.skip("update failure with bad payload", async () => {})
  // })
  describe("getListCatalogue", () => {
    beforeEach(async () => {
      await synchronizeDb(true)
    })
    test("success", async () => {
      const result1 = await getListOfCatalogueItemsAndVerifyType()
      expect(result1).toEqual([])
      await CatalogueItem.create({ name: "test input 1" })
      await CatalogueItem.create({ name: "test input 2" })
      const result2 = await getListOfCatalogueItemsAndVerifyType()
      expect(result2).toHaveLength(2)
      expect(result2).toEqual([
        expect.objectContaining({
          description: expect.any(Object),
          id: expect.any(String),
          name: "test input 1",
        }),
        expect.objectContaining({
          description: expect.any(Object),
          id: expect.any(String),
          name: "test input 2",
        }),
      ])
    })
    test("success grouped", async () => {
      const result1 = await getListOfCatalogueItemsAndVerifyType(true)
      expect(result1).toEqual([])
      const cat1 = await Category.create({ name: "cat 1" })
      const cat2 = await Category.create({ name: "cat 2" })
      const ci1 = await CatalogueItem.create({ name: "test input 1" })
      const ci2 = await CatalogueItem.create({ name: "test input 2" })
      const ci3 = await CatalogueItem.create({ name: "test input 3" })
      const ci4 = await CatalogueItem.create({ name: "test input 4" })
      const ci5 = await CatalogueItem.create({ name: "test input 5" })
      await ci1.addCategory(cat1)
      await ci2.addCategory(cat2)
      await ci3.addCategory(cat1)
      // one item multiple categories
      await ci4.addCategory(cat1)
      await ci4.addCategory(cat2)
      const result2 = await getListOfCatalogueItemsAndVerifyType(true)
      expect(result2).toHaveLength(3)
      expect(result2).toEqual([
        {
          description: null,
          id: cat1.id,
          groupId: null,
          name: "cat 1",
          items: [
            {
              description: null,
              groupId: cat1.id,
              id: ci1.id,
              name: "test input 1",
            },
            {
              description: null,
              groupId: cat1.id,
              id: ci3.id,
              name: "test input 3",
            },
            {
              description: null,
              groupId: cat1.id,
              id: ci4.id,
              name: "test input 4",
            },
          ],
        },
        {
          description: null,
          groupId: null,
          id: cat2.id,
          name: "cat 2",
          items: [
            {
              description: null,
              groupId: cat2.id,
              id: ci2.id,
              name: "test input 2",
            },
            {
              description: null,
              groupId: cat2.id,
              id: ci4.id,
              name: "test input 4",
            },
          ],
        },
        {
          description: null,
          groupId: null,
          id: ci5.id,
          name: "test input 5",
        },
      ])
    })
    test.skip("sort success", async () => {})
    test.skip("failure", async () => {})
  })
})

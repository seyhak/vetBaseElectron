const { Category, CategoryCatalogueItemThroughTable } = require("#root/models/category.js")
const { CatalogueItem } = require("#root/models/catalogue-item.js")
const { Sequelize, Op } = require("sequelize")
const { CATEGORY_KEYS } = require("#root/constants.ts")
const { difference, pick } = require("lodash")

const getListCatalogue = async (event, searchPhase) => {
  const where = searchPhase
    ? {
        [Op.or]: [
          Sequelize.where(Sequelize.fn("UPPER", Sequelize.col("title")), {
            [Op.substring]: searchPhase,
          }),
          Sequelize.where(Sequelize.fn("UPPER", Sequelize.col("description")), {
            [Op.substring]: searchPhase,
          }),
        ],
      }
    : {}

  const items = await CatalogueItem.findAll({
    attributes: ["id", "title", "description"],
    where,
  })
  // TODO write tests for this file and add TS
  return items.map((item) => item.dataValues)
}

const createItem = async (event, title, serializedJSON) => {
  try {
    const createdItem = await CatalogueItem.create({
      title,
      description: serializedJSON,
    })
    return JSON.stringify(createdItem.dataValues)
  } catch (error) {
    console.error(error)
    return JSON.stringify(error)
  }
}

const getDetailedItem = async (event, id) => {
  const detailedItem = await CatalogueItem.findByPk(id, {
    include: { model: Category },
  })

  const requiredData = {
    ...pick(detailedItem.dataValues, [
      "id",
      "title",
      "description",
      "createdAt",
      "updatedAt",
    ]),
    Categories: detailedItem.dataValues.Categories.map((cat) =>
      pick(cat, CATEGORY_KEYS),
    ),
  }
  console.log("getDetailedItem", requiredData)
  return JSON.stringify(requiredData)
}

const destroyItemById = async (event, id) => {
  console.log("destroyItemById", id)
  await CatalogueItem.destroy({
    where: {
      id: id,
    },
  })
}

const updateItem = async (event, id, content) => {
  console.log("updateItem", id, content)
  const categoryIds = content.categories

  try {
    await CatalogueItem.update(content, {
      where: {
        id: id,
      },
    })

    await CategoryCatalogueItemThroughTable.sync({alter: true})
    const catalogueItem = await CatalogueItem.findByPk(id, { include: Category })
    const prevCategoriesIds = catalogueItem.dataValues.Categories.map(
      (cat) => cat.dataValues.id,
    )
    const categoryIdsToRemove = difference(prevCategoriesIds, categoryIds)
    const categoryIdsToAdd = difference(categoryIds, prevCategoriesIds)
    console.log(
      "categoryIdsToAdd",
      categoryIdsToAdd,
      "categoryIdsToRemove",
      categoryIdsToRemove,
    )
  
    const categoriesToAdd = await Category.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: categoryIdsToAdd,
        },
      },
    })
    const categoriesToRemove = await Category.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: categoryIdsToRemove,
        },
      },
    })
    await catalogueItem.removeCategory(categoriesToRemove)
    await catalogueItem.addCategory(categoriesToAdd)

  } catch (error) {
    console.error(error)
    return error
  }
}

exports.getDetailedItem = getDetailedItem
exports.getListCatalogue = getListCatalogue
exports.createItem = createItem
exports.destroyItemById = destroyItemById
exports.updateItem = updateItem

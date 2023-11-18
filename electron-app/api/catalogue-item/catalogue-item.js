const { Category } = require("#root/models/category.js")
const { CatalogueItem } = require("#root/models/catalogue-item.js")
const { Sequelize, Op } = require("sequelize")
const { CATEGORY_KEYS } = require("#root/constants.ts")
const { difference, pick } = require("lodash")


const handleCategoriesAddRemove = async (categoryIds, catalogueItem, remove = false) => {
  const categories = await Category.findAll({
    where: {
      id: {
        [Sequelize.Op.in]: categoryIds,
      },
    },
  })
  if(remove) {
    await catalogueItem.removeCategory(categories)
  } else {
    await catalogueItem.addCategory(categories)
  }
}

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

const createItem = async (event, { title, description, categoryIds }) => {
  try {
    const createdItem = await CatalogueItem.create({
      title,
      description,
    })
    if(categoryIds) {
      await handleCategoriesAddRemove(categoryIds, createdItem)
    }
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

    const catalogueItem = await CatalogueItem.findByPk(id, { include: Category })
    const prevCategoriesIds = catalogueItem.dataValues.Categories.map(
      (cat) => cat.dataValues.id,
    )
    const categoryIdsToRemove = difference(prevCategoriesIds, categoryIds)
    const categoryIdsToAdd = difference(categoryIds, prevCategoriesIds)
  
    await handleCategoriesAddRemove(categoryIdsToAdd, catalogueItem)
    await handleCategoriesAddRemove(categoryIdsToRemove, catalogueItem, true)
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

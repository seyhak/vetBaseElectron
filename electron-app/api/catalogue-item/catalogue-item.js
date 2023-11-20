const { Category } = require("#root/models/category.js")
const { CatalogueItem } = require("#root/models/catalogue-item.js")
const { Sequelize, Op } = require("sequelize")
const { CATEGORY_KEYS } = require("#root/constants.ts")
const { difference, pick } = require("lodash")

const handleCategoriesAddRemove = async (
  categoryIds,
  catalogueItem,
  remove = false,
) => {
  const categories = await Category.findAll({
    where: {
      id: {
        [Sequelize.Op.in]: categoryIds,
      },
    },
  })
  if (remove) {
    await catalogueItem.removeCategory(categories)
  } else {
    await catalogueItem.addCategory(categories)
  }
}

const REQUIRED_KEYS = ["id", "name", "description"]

const getFormattedItem = (item, categoryId) => {
  return {
    ...item,
    groupId: categoryId,
  }
}

const getFormattedCategory = (category, items) => {
  return {
    ...pick(category, REQUIRED_KEYS),
    groupId: null,
    items: items.map((item) => getFormattedItem(item, category.id)),
  }
}

const getCatalogueItemsGroupedByCategories = (items) => {
  const result = {
    grouped: {},
    groupless: [],
  }
  const categories = {}

  items.forEach((item) => {
    const pickedItem = pick(item, REQUIRED_KEYS)
    const itemCategories = item.Categories
    const hasGroups = !!itemCategories.length

    if (hasGroups) {
      itemCategories.forEach((category) => {
        const alreadyInGrouped = !!result.grouped[category.name]
        const shouldAddToCategoriesDict = !categories[category.name]
        if (shouldAddToCategoriesDict) {
          categories[category.name] = pick(category, REQUIRED_KEYS)
        }
        if (!alreadyInGrouped) {
          result.grouped[category.name] = []
        }
        const group = result.grouped[category.name]
        group.push(getFormattedItem(pickedItem, category.id))
      })
    } else {
      result.groupless.push(getFormattedItem(pickedItem, null))
    }
  })
  const resultList = []
  Object.keys(result.grouped).forEach((groupName) => {
    const groupItems = result.grouped[groupName]
    const resultCategory = getFormattedCategory(
      categories[groupName],
      groupItems,
    )
    resultList.push(resultCategory)
  })
  resultList.push(...result.groupless)
  return resultList
}

const getListCatalogue = async (event, searchPhase, grouped = false) => {
  const where = searchPhase
    ? {
        [Op.or]: [
          Sequelize.where(Sequelize.fn("UPPER", Sequelize.col("name")), {
            [Op.substring]: searchPhase,
          }),
          Sequelize.where(Sequelize.fn("UPPER", Sequelize.col("description")), {
            [Op.substring]: searchPhase,
          }),
        ],
      }
    : {}

  const include = grouped ? { model: Category } : null
  const items = await CatalogueItem.findAll({
    attributes: ["id", "name", "description"],
    include,
    where,
  })
  if (grouped) {
    return getCatalogueItemsGroupedByCategories(items)
  }
  return items.map((item) => item.dataValues)
}

const createItem = async (event, { name, description, categoryIds }) => {
  try {
    const createdItem = await CatalogueItem.create({
      name,
      description,
    })
    if (categoryIds) {
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
      "name",
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

    const catalogueItem = await CatalogueItem.findByPk(id, {
      include: Category,
    })
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

const { CatalogueItem } = require("./models/catalogue-item")
const { Sequelize, Op, sequelize } = require("sequelize")
const { DB_PATH } = require("./constants.ts")

const getListCatalogue = async (event, searchPhase) => {
  const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: DB_PATH,
  })

  const where = searchPhase
    ? {
        [Op.or]: [
          sequelize.where(sequelize.fn("UPPER", sequelize.col("title")), {
            [Op.substring]: searchPhase,
          }),
          sequelize.where(sequelize.fn("UPPER", sequelize.col("description")), {
            [Op.substring]: searchPhase,
          }),
        ],
      }
    : {}

  const items = await CatalogueItem.findAll({
    attributes: ["id", "title", "description"],
    where,
  })
  sequelize.close()
  // TODO write tests for this file and add TS
  return items.map((item) => item.dataValues)
}

const createItem = async (event, title, serializedJSON) => {
  const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: DB_PATH,
  })
  const createdItem = await CatalogueItem.create({
    title,
    description: serializedJSON,
  })

  sequelize.close()
  return JSON.stringify(createdItem.dataValues)
}

const getDetailedItem = async (event, id) => {
  const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: DB_PATH,
  })
  const detailedItem = await CatalogueItem.findByPk(id)
  console.log("detailedItem", detailedItem)
  sequelize.close()
  return detailedItem.dataValues
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
  console.log(id)
  await CatalogueItem.update(content, {
    where: {
      id: id,
    },
  })
}

exports.getDetailedItem = getDetailedItem
exports.getListCatalogue = getListCatalogue
exports.createItem = createItem
exports.destroyItemById = destroyItemById
exports.updateItem = updateItem

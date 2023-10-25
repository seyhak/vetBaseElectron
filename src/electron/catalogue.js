const { CatalogueItem } = require("./models/catalogue-item")
const { Sequelize } = require("sequelize")
const { DB_PATH } = require("./constants.ts")

const openCatalogue = async () => {
  const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: DB_PATH,
  })

  // await CatalogueItem.sync({ alter: true })

  const items = await CatalogueItem.findAll({
    attributes: ["id", "title", "description"],
  })
  sequelize.close()
  console.log("items", items)
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

exports.openCatalogue = openCatalogue
exports.createItem = createItem

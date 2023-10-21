const { DB_PATH } = require("../constants.ts")
const { Sequelize, DataTypes, Model } = require("sequelize")

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: DB_PATH,
})

class CatalogueItem extends Model {}

CatalogueItem.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
    },
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.JSON,
    },
  },
  {
    sequelize,
    modelName: "CatalogueItem",
  },
)

exports.CatalogueItem = CatalogueItem

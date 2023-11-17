const { DB_PATH } = require("#root/constants.ts")
const { Sequelize, DataTypes, Model } = require("sequelize")
const { CatalogueItem } = require("./catalogue-item")

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: DB_PATH,
})

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Category",
    timestamps: true,
  },
)

class CategoryCatalogueItemThroughTable extends Model {}

CategoryCatalogueItemThroughTable.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  },
  {
    sequelize,
  },
)
// https://sequelize.org/docs/v6/advanced-association-concepts/advanced-many-to-many/#the-best-of-both-worlds-the-super-many-to-many-relationship
// The Super Many-to-Many relationship
Category.belongsToMany(CatalogueItem, {
  through: CategoryCatalogueItemThroughTable,
})
CatalogueItem.belongsToMany(Category, {
  through: CategoryCatalogueItemThroughTable,
})
Category.hasMany(CategoryCatalogueItemThroughTable)
CategoryCatalogueItemThroughTable.belongsTo(Category)
CatalogueItem.hasMany(CategoryCatalogueItemThroughTable)
CategoryCatalogueItemThroughTable.belongsTo(CatalogueItem)

exports.Category = Category
exports.CategoryCatalogueItemThroughTable = CategoryCatalogueItemThroughTable
const { DB_PATH } = require("#root/constants.ts")
const { Sequelize } = require("sequelize")

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: DB_PATH,
  logging: false,
})

exports.sequelize = sequelize

const { sequelize } = require("./models/index")

async function synchronizeDb(force = false) {
  const syncKwargs = {
    force,
    alter: !force,
  }
  try {
    await sequelize.sync(syncKwargs)
  } catch (e) {
    console.error(e)
    throw e
  }
}

exports.synchronizeDb = synchronizeDb

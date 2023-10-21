const sqlite3 = require("sqlite3").verbose()

const openCatalogue = () => {
  console.log("satat.")
  let db = new sqlite3.Database(":memory:", (err) => {
    if (err) {
      return console.error(err.message)
    }
    console.log("Connected to the in-memory SQlite database.")
  })

  // close the database connection
  db.close((err) => {
    if (err) {
      return console.error(err.message)
    }
    console.log("Close the database connection.")
  })
}

const createItem = () => {
  console.log("createItem")
  let db = new sqlite3.Database(":memory:", (err) => {
    if (err) {
      return console.error(err.message)
    }
    console.log("Connected to the in-memory SQlite database.")
  })

  // close the database connection
  db.close((err) => {
    if (err) {
      return console.error(err.message)
    }
    console.log("Close the database connection.")
  })
}

exports.openCatalogue = openCatalogue
exports.createItem = createItem

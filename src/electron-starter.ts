const { CatalogueItem } = require("./electron/models/catalogue-item")

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require("electron")
const {
  getListCatalogue,
  createItem,
  getDetailedItem,
  destroyItemById,
  updateItem,
} = require("./electron/catalogue.js")
const path = require("node:path")

async function synchronizeDb() {
  await CatalogueItem.sync()
}

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1600,
    height: 1000,
    // fullscreen: true,
    webPreferences: {
      preload: path.join(__dirname, "./electron/preload.js"),
    },
  })

  synchronizeDb()
  // and load the index.html of the app.
  const isDev = !!process.env.REACT_APP_DEV

  if (isDev) {
    mainWindow.loadURL("http://localhost:3000")
    // Open the DevTools.
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile("build/index.html")
  }
  // mainWindow.loadFile(path.join(__dirname, "build/index.html"))
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  ipcMain.handle("catalogue:getListCatalogue", getListCatalogue)
  ipcMain.handle("catalogue:createItem", createItem)
  ipcMain.handle("catalogue:getDetailedItem", getDetailedItem)
  ipcMain.handle("catalogue:destroyItemById", destroyItemById)
  ipcMain.handle("catalogue:updateItem", updateItem)
  createWindow()

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

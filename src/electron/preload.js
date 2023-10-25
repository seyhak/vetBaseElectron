const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("electronAPI", {
  openCatalogue: () => ipcRenderer.invoke("catalogue:openCatalogue"),
  createItem: (title, itemDescriptionJSON) =>
    ipcRenderer.invoke("catalogue:createItem", title, itemDescriptionJSON),
  getDetailedItem: (id) => ipcRenderer.invoke("catalogue:getDetailedItem", id),
  destroyItemById: (id) => ipcRenderer.invoke("catalogue:destroyItemById", id),
  updateItem: (id, content) =>
    ipcRenderer.invoke("catalogue:updateItem", id, content),
})

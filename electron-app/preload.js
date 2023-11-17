const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("electronAPI", {
  getListCatalogue: (searchPhase) =>
    ipcRenderer.invoke("catalogue:getListCatalogue", searchPhase),
  createItem: (title, itemDescriptionJSON) =>
    ipcRenderer.invoke("catalogue:createItem", title, itemDescriptionJSON),
  getDetailedItem: (id) => ipcRenderer.invoke("catalogue:getDetailedItem", id),
  destroyItemById: (id) => ipcRenderer.invoke("catalogue:destroyItemById", id),
  updateItem: (id, content) =>
    ipcRenderer.invoke("catalogue:updateItem", id, content),
  getListCategories: (searchPhase) =>
    ipcRenderer.invoke("catalogue:getListCategories", searchPhase),
  createCategory: (title, description) =>
    ipcRenderer.invoke("catalogue:createCategory", title, description),
  getDetailedCategory: (id) =>
    ipcRenderer.invoke("catalogue:getDetailedCategory", id),
  destroyCategoryById: (id) =>
    ipcRenderer.invoke("catalogue:destroyCategoryById", id),
  updateCategory: (id, content) =>
    ipcRenderer.invoke("catalogue:updateCategory", id, content),
})

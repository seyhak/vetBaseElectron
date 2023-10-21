const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("electronAPI", {
  openCatalogue: () => ipcRenderer.invoke("dialog:openCatalogue"),
})

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getProdutos: () => ipcRenderer.invoke('getProdutos'),
  addProduto: (produto) => ipcRenderer.invoke('addProduto', produto),
  deleteProduto: (id) => ipcRenderer.invoke('deleteProduto', id)
});

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const crud = require('./backend/crud');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  win.loadFile('renderer/index.html');
}

ipcMain.handle('getProdutos', async () => await crud.getAllProducts());
ipcMain.handle('addProduto', async (_, p) => await crud.addProduct(p));
ipcMain.handle('deleteProduto', async (_, id) => await crud.deleteProduct(id));

app.whenReady().then(createWindow);

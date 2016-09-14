const {app, BrowserWindow, ipcMain} = require('electron');
const {load, save} = require('./db.js');

let win;

function createWindow() {
  win = new BrowserWindow({width:800, height:600});
  win.loadURL(`file://${__dirname}/index.html`);
  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

ipcMain.on('loadUrls', (ev, arg) => {
  load().then((resp) => {
    ev.returnValue = resp;
  });
});
ipcMain.on('saveUrls', (ev, arg) => {
  save(arg).then((resp) => {
    console.log(resp);
    ev.sender.send('saveUrls-reply', resp);
  });
});
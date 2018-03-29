const electron = require('electron');
const { app, BrowserWindow, Menu } = electron;
const { menuTemplate } = require('./common/menu_template');
const { APP_TITLE } = require('./common/constants');
const path = require('path');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        title: APP_TITLE,
        width: 1400,
        height: 900
    });

    mainWindow.webContents.toggleDevTools();
    mainWindow.loadURL('file://' +path.join(__dirname, 'view', 'workspace.html'));
    app.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
});






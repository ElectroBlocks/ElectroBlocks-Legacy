const electron = require('electron');
const { app, BrowserWindow, Menu, ipcMain } = electron;
const { menuTemplate } = require('./common/menu_template');
const { APP_TITLE } = require('./common/constants');
const path = require('path');

let mainWindow;

let serialMonitor;

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


ipcMain.on('open:serial-monitor', () => {
    if (!serialMonitor) {
        serialMonitor = new BrowserWindow({
            title: 'Serial Monitor',
            width: 500,
            height: 520
        });
        serialMonitor.loadURL('file://' +path.join(__dirname, 'view', 'serial-monitor.html'));
        serialMonitor.webContents.toggleDevTools();
        serialMonitor.show();
    }

    serialMonitor.on('close', () => {
        serialMonitor = null;
        mainWindow.webContents.send('close:serial-monitor');
    });

});







const electron = require('electron');
const {app, BrowserWindow, Menu, ipcMain, dialog, shell} = electron;
const {APP_TITLE, NODE_ERROR} = require('./common/constants');
const {sendContinueFunction, sendSerialMonitorMessage} = require('./common/serial_port');
const path = require('path');
const fs = require('fs');
const autoUpdater = require("electron-updater").autoUpdater;


/**
 * Windows
 */
let mainWindow;

let serialMonitor;

let aboutSoftware;

let codeWindow;

/**
 * This is where the directory where the current file is being saved.
 */
let currentFilePath = undefined;

let menuTemplate = [
    {
        label: APP_TITLE,
        submenu: [
            {
                label: 'About Software',
                click() {
                    if (!aboutSoftware) {
                        aboutSoftware = new BrowserWindow({
                            title: 'About Arduino Blockly IDE',
                            width: 500,
                            height: 520,
                            autoHideMenuBar: true
                        });
                        aboutSoftware.loadURL('file://' + path.join(__dirname, 'view', 'about.html'));
                        aboutSoftware.show();
                    }

                    aboutSoftware.on('close', () => aboutSoftware = null);
                }
            },
            {
                role: 'toggledevtools'
            },
            {
                label: 'Code View',
                click() {
                    if (!codeWindow) {
                        codeWindow = new BrowserWindow({
                            title: 'Code View',
                            width: 500,
                            height: 520,
                            autoHideMenuBar: true
                        });
                        codeWindow.loadURL('file://' + path.join(__dirname, 'view', 'code-view.html'));
                    }
                    codeWindow.show();
                    codeWindow.on('close', () => codeWindow = null);
                }
            }

        ]
    },
    {
        label: 'File',
        submenu: [
            {
                label: 'Open',
                click() {
                    dialog.showOpenDialog(mainWindow, {
                        properties: ['openFile', 'openDirectory'],
                        filters: [
                            {name: 'Arduino Blockly', extensions: ['xml']}
                        ]
                    }, (filePaths, err) => {
                        if (err) {
                            console.log(err);
                            mainWindow.webContents.send(NODE_ERROR, 'There was an error trying to open the file.');
                            return;
                        }
                        if (filePaths && filePaths.length > 0) {
                            const filePath = filePaths[0];
                            currentFilePath = filePath;
                            mainWindow.webContents.send('open:file', fs.readFileSync(filePath).toString());
                        }
                    });
                }
            },
            {
                label: 'Save',
                click() {
                    mainWindow.webContents.send('menu:save', typeof currentFilePath === 'undefined');
                }
            },
            {
                label: 'Save As',
                click() {
                    mainWindow.webContents.send('menu:save', true);
                }
            },
            {
                label: 'Close',
                click() {
                    app.quit();
                }
            }
        ]
    },
    {
        label: 'Help',
        submenu: [
            {
                label: 'Online Help',
                click () {
                    shell.openExternal('http://oaklandcodeschool.org/arduino-ide-help')
                }
            },
            {
                label: 'Report a bug',
                click() {
                    shell.openExternal('https://github.com/phptuts/ArduinoBlocklyIDE/issues')
                }
            },
        ]
    }
];

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        title: APP_TITLE,
        width: 1400,
        height: 900,
        icon: path.join('icons', 'icon.png')
    });


    mainWindow.loadURL('file://' + path.join(__dirname, 'view', 'workspace.html'));
    app.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
});

app.on('ready', () => {
    autoUpdater.checkForUpdatesAndNotify();
});


ipcMain.on('open:serial-monitor', () => {
    if (!serialMonitor) {
        serialMonitor = new BrowserWindow({
            title: 'Serial Monitor',
            width: 520,
            height: 520,
            autoHideMenuBar: true
        });
        serialMonitor.loadURL('file://' + path.join(__dirname, 'view', 'serial-monitor.html'));
        serialMonitor.show();
    }

    serialMonitor.on('close', () => {
        serialMonitor = null;
        mainWindow.webContents.send('close:serial-monitor');
    });
});

ipcMain.on('get:code', () => mainWindow.webContents.send('get:code'));

ipcMain.on('display:code', (event, code) => {
    codeWindow.webContents.send('show:code', code);
});

ipcMain.on('debug:continue', () => sendContinueFunction());

ipcMain.on('send:message', (e, word) => {
    sendSerialMonitorMessage(word);
});

ipcMain.on('save:file', (e, code, filePath) => {
    currentFilePath = filePath ? filePath : currentFilePath;
    fs.writeFile(currentFilePath, code, err => {
        if (err) {
            console.log(err);
            mainWindow.webContents.send(NODE_ERROR, 'There was an trying to save the file.');
            return;
        }
    });
});







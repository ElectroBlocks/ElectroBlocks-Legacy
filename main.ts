import { app, BrowserWindow, screen, ipcMain, Menu, dialog } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs';
import { SerialPortArduino } from './arduinoNode/serial_port';

let win, serve;
const args = process.argv.slice(1);
let currentFilePath;

serve = args.some(val => val === '--serve');

function createWindow() {
  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true
    }
  });

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, 'dist/index.html'),
        protocol: 'file:',
        slashes: true
      })
    );
  }

  if (serve) {
    win.webContents.openDevTools();
  }

  win.webContents.on('did-finish-load', () => {
    const serialPort = new SerialPortArduino();
    serialPort.serialPortStatus$.subscribe(arduinoConnected => {
      win.webContents.send('arduino_connected', arduinoConnected);
    });
    serialPort.serialOutput$.subscribe(message => {
      console.log(message, 'messages from arduino');
      win.webContents.send('arduino_message', message);
    });

    ipcMain.on('UPLOAD_CODE', async (event, code) => {
      await serialPort.flashArduino(code);
    });

    ipcMain.on('SEND_MESSAGE', async (event, message) => {
      await serialPort.sendMessage(message);
    });

    ipcMain.on('DEBUG_MESSAGE', async (event, message) => {
      if (message === 'CONTINUE') {
        await serialPort.sendMessage('continue_debug');
        return;
      }

      if (message === 'STOP_ALL_DEBUGGING') {
        await serialPort.sendMessage('stop_debug');
        return;
      }
    });

    ipcMain.on('save:code', async (event, code: string, saveAs: boolean) => {
      const createNewFile = saveAs === true || currentFilePath === undefined;
      if (createNewFile) {
        const fileResult = await dialog.showSaveDialog({
          title: saveAs ? 'Save As' : 'Save',
          filters: [{ name: 'ElectroBlocks', extensions: ['xml'] }]
        });

        if (fileResult.canceled) {
          return;
        }

        currentFilePath = fileResult.filePath;
      }

      fs.writeFileSync(currentFilePath, code);
    });
  });

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

const menuTemplate = [
  {
    label: 'ElectroBlocks',
    submenu: [
      {
        label: 'Toolbox',
        click() {
          win.webContents.send('navigate_setting', 'toolbox');
        }
      },
      {
        label: 'Advanced Settings',
        click() {
          win.webContents.send('navigate_setting', 'advanced');
        }
      },
      {
        label: 'Report Bug',
        click() {
          win.webContents.send('navigate_setting', 'bug');
        }
      },
      {
        label: 'About',
        click() {
          win.webContents.send('navigate_setting', 'about');
        }
      },
      {
        label: 'Help',
        click() {
          win.webContents.send('navigate_setting', 'help');
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
    label: 'File',
    submenu: [
      {
        label: 'New',
        click() {
          win.webContents.send('menu:new');
        }
      },
      {
        label: 'Open',
        click() {
          dialog.showOpenDialog(
            win,
            {
              properties: ['openFile'],
              filters: [{ name: 'ElectroBlocks', extensions: ['xml'] }]
            },
            (filePaths, err) => {
              if (err) {
                console.log(err);
                return;
              }
              if (filePaths && filePaths.length > 0) {
                const filePath = filePaths[0];
                currentFilePath = filePath;
                win.webContents.send(
                  'open:file',
                  fs.readFileSync(filePath).toString()
                );
              }
            }
          );
        }
      },
      {
        label: 'Save',
        click() {
          win.webContents.send('menu:save', false);
        }
      },
      {
        label: 'Save As',
        click() {
          win.webContents.send('menu:save', true);
        }
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
      { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
      { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' }
    ]
  }
];

Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });
} catch (e) {
  // Catch Error
  // throw e;
}

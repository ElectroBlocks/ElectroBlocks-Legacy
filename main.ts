import { app, BrowserWindow, screen, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';
import { SerialPortArduino } from './arduinoNode/serial_port';
import { map } from 'rxjs/operators';
import { async } from '@angular/core/testing';

let win, serve;
const args = process.argv.slice(1);

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

  });

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

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

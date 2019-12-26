import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, remote } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import { DeviceCommunicator, DeviceMessageType } from './device.communicator';

@Injectable({
  providedIn: 'root'
})
export class ElectronCommunicator extends DeviceCommunicator {
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;

  public readonly chromebookApp = false;

  static get isElectron() {
    return window && window.process && window.process.type;
  }

  constructor() {
    super();
    // Conditional imports
    if (ElectronCommunicator.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;

      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
      this.ipcRenderer.on('arduino_connected', (event, hasArduino) => {
        console.log('arduino_connected', hasArduino);
        this.arduinoOnlineState.next(hasArduino);
      });

      this.ipcRenderer.on('arduino_message', (event, message) => {
        console.log('arduino_message', message);
        this.messageSubject.next(message);
      });
    }
  }

  sendMessage(type: DeviceMessageType, message: string) {
    // TODO Fill in observable logic
    this.ipcRenderer.send(type, message);
  }
}

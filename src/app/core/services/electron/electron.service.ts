import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, remote } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import {
  DeviceCommunicator,
  DeviceMessageType,
  ArduinoMessage
} from '../device.communicator';
import { Observable, Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ElectronService extends DeviceCommunicator {

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
    if (ElectronService.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;

      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
    }
  }

  sendMessage(type: DeviceMessageType, message: string) {
    // TODO Fill in observable logic
    this.ipcRenderer.send(type, message);
  }
}

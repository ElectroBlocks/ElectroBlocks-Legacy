import { Injectable, NgZone } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, remote } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import { DeviceCommunicator, DeviceMessageType } from './device.communicator';
import { Router } from '@angular/router';
import { BlocklyService } from '../../blockly/blockly.service';

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

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private blocklyService: BlocklyService
  ) {
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

      this.ipcRenderer.on('navigate_setting', (event, setting) => {
        this.ngZone.run(() => {
          this.router.navigate([
            'settings',
            { outlets: { settingContainer: setting } }
          ]);
        });
      });

      this.ipcRenderer.on('menu:new', event => {
        this.blocklyService.resetWorkspace();
      });

      this.ipcRenderer.on('open:file', (event, xmlString) => {
        this.blocklyService.loadFile(xmlString);
      });

      this.ipcRenderer.on('menu:save', (event, saveAs: boolean) => {
        const code = this.blocklyService.getXMLCode();

        this.ipcRenderer.send('save:code', code, saveAs);
      });
    }
  }

  sendMessage(type: DeviceMessageType, message: string) {
    // TODO Fill in observable logic
    this.ipcRenderer.send(type, message);
  }
}

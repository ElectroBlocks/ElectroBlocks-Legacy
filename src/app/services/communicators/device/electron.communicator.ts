import { Injectable, NgZone } from '@angular/core';

import { DeviceMessageType } from './device.communicator';
import { Router } from '@angular/router';
import { BlocklyService } from '../../blockly/blockly.service';
import { ArduinoOnlineState } from './device.communicator';
import { Subject, BehaviorSubject } from 'rxjs';
import { startWith, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ElectronCommunicator {
  protected messageSubject = new Subject<string>();

  protected arduinoOnlineState = new BehaviorSubject<ArduinoOnlineState>(
    ArduinoOnlineState.DISCONNECTED
  );

  public readonly message$ = this.messageSubject.asObservable().pipe(share());

  public readonly arduinoState$ = this.arduinoOnlineState
    .asObservable()
    .pipe(startWith(ArduinoOnlineState.DISCONNECTED));

  ipcRenderer: {
    send(type: string, ...messages): void;
    on(type: string, callback: (...data) => void);
  };

  public readonly chromebookApp = false;

  static get isElectron() {
    return window && window.process && window.process.type;
  }

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private blocklyService: BlocklyService
  ) {
    // Conditional imports
    if (ElectronCommunicator.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;

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

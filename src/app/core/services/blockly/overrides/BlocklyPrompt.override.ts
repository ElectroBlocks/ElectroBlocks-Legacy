import { Injectable } from '@angular/core';
import { ElectronService } from '../../electron/electron.service';
import * as Blockly from 'blockly/core';

@Injectable({
  providedIn: 'root'
})
export class BlocklyPromptOverRide {
  constructor(private electronService: ElectronService) {}

  /**
   * Over Rides the default prompt argument if
   */
  overRideBlocklyPrompt() {
    if (!this.electronService.isElectron) {
      return;
    }
    const prompt = this.electronService.remote.require('electron-prompt');

    Blockly.prompt = function(message, defaultValue, callback) {
      prompt({
        title: message,
        value: defaultValue,
        type: 'input'
      }).then((value) => {
        callback(value);
      });
    };
  }
}

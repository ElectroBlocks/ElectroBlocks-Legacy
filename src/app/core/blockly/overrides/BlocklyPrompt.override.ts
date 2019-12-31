import { Injectable } from '@angular/core';
import { ElectronCommunicator } from '../../../services/communicators/device/electron.communicator';
import * as Blockly from 'blockly/core';

@Injectable({
  providedIn: 'root'
})
export class BlocklyPromptOverRide {
  constructor(private electronService: ElectronCommunicator) {}

  /**
   * Over Rides the default prompt argument if
   */
  overRideBlocklyPrompt() {
    if (!ElectronCommunicator.isElectron) {
      return;
    }
    const prompt = this.electronService.remote.require('electron-prompt');

    Blockly.prompt = function(message, defaultValue, callback) {
      prompt({
        title: message,
        value: defaultValue,
        type: 'input'
      }).then(value => {
        callback(value);
      });
    };
  }
}

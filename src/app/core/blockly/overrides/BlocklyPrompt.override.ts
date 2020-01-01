import { Injectable } from '@angular/core';
import { ElectronCommunicator } from '../../../services/communicators/device/electron.communicator';
import * as Blockly from 'blockly/core';

@Injectable({
  providedIn: 'root'
})
export class BlocklyPromptOverRide {
  /**
   * Over Rides the default prompt argument if
   */
  overRideBlocklyPrompt() {
    if (!ElectronCommunicator.isElectron) {
      return;
    }
    // Doing this to avoid circular dependency injection with the BlocklyService being injected into the 
    // ElectronService.  There is probably a better way to do this.
    const prompt = window.require('electron').remote.require('electron-prompt');

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

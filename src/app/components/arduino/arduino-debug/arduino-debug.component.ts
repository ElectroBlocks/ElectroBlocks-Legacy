import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { of } from 'rxjs';
import { Variable } from '../../../core/player/frame/variable';
import { rgbToHex, Color } from '../../../core/player/frame_genorator/color';
import { IdentityService } from '../../../services/identity/identity.service';
import {
  DeviceCommunicator,
  ArduinoOnlineState,
  DeviceMessageType
} from '../../../services/communicators/device/device.communicator';
import { AbstractSubscriptionComponent } from '../../abstract-subscription.component';
import { BlocklyService } from '../../../services/blockly/blockly.service';

@Component({
  selector: 'app-arduino-debug',
  templateUrl: './arduino-debug.component.html',
  styleUrls: ['./arduino-debug.component.scss']
})
export class ArduinoDebugComponent extends AbstractSubscriptionComponent
  implements OnInit {
  tempVariables: Variable[] = [];

  updateVariables = false;

  debugModeStopped = false;

  arduinoState = ArduinoOnlineState.DISCONNECTED;

  arduinoDebugPause = false;

  selectedDebugBlockId = '';

  variables = this.identityService.isBrowser()
    ? [
        {
          name: 'favorite color',
          type: 'Colour',
          value: { red: 150, green: 0, blue: 140 }
        },
        {
          name: 'counter',
          type: 'Number',
          value: 333
        },
        {
          name: 'name',
          type: 'String',
          value: 'Fred'
        },
        {
          name: 'rainbow',
          type: 'List Colour',
          value: [
            { red: 150, green: 0, blue: 140 },
            { red: 20, green: 150, blue: 234 }
          ]
        },
        {
          name: 'iLikeIcecream',
          type: 'Boolean',
          value: true
        }
      ]
    : [];

  constructor(
    private identityService: IdentityService,
    private deviceCommunicator: DeviceCommunicator,
    private blocklyService: BlocklyService,
    private changeDetection: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.subscriptions.push(
      this.deviceCommunicator.message$.subscribe(message =>
        this.incomingMessage(message)
      )
    );
    this.subscriptions.push(
      this.deviceCommunicator.arduinoState$.subscribe(arduinoState => {
        console.log(arduinoState, 'arduino-debug');
        if (
          arduinoState === ArduinoOnlineState.UPLOADING_CODE ||
          arduinoState === ArduinoOnlineState.UPLOAD_CODE_COMPLETE ||
          arduinoState === ArduinoOnlineState.UPLOAD_CODE_ERROR
        ) {
          this.tempVariables = [];
          this.variables = [];
        }
        this.arduinoState = arduinoState;
        this.changeDetection.detectChanges();
      })
    );
  }

  rgbToHex(color: Color) {
    return rgbToHex(color);
  }

  printValue(variable: Variable) {
    if (variable.type === 'Colour') {
      return `Red = ${variable.value.red} Green = ${variable.value.green} Blue = ${variable.value.blue}`;
    }

    if (variable.type === 'String') {
      return JSON.stringify(variable.value);
    }

    return variable.value;
  }

  incomingMessage(arduinoMessage: string) {
    if (arduinoMessage.includes('**(|)')) {
      this.tempVariables.push(this.processVariable(arduinoMessage));
      return;
    }

    if (arduinoMessage.includes('DEBUG_BLOCK_')) {
      if (this.variables.length === 0) {
        this.variables = this.tempVariables.slice(0);
      }

      this.variables = this.variables.map(variable => {
        const newVariableValue = this.tempVariables.find(
          tempVariable => tempVariable.name === variable.name
        ).value;
        return {
          name: variable.name,
          type: variable.type,
          value: newVariableValue
        };
      });
      this.selectedDebugBlockId = arduinoMessage
        .replace('DEBUG_BLOCK_', '')
        .trim();
      this.blocklyService.selectBlock(this.selectedDebugBlockId);
      this.tempVariables = [];
      this.arduinoDebugPause = true;
      this.changeDetection.detectChanges();
      return;
    }
  }

  protected processVariable(arduinoMessage: string): Variable {
    const message = arduinoMessage.replace('**(|)', '');
    const [variableName, variableType, variableValue] = message.split('_|_');

    if (variableType === 'Colour') {
      return {
        name: variableName,
        value: this.processColorValue(variableValue),
        type: variableType
      };
    }

    if (['List String', 'List Boolean'].includes(variableType)) {
      return {
        name: variableName,
        value: variableValue
          .replace('[', '')
          .replace(']', '')
          .split(','),
        type: variableType
      };
    }

    if (variableType === 'List Colour') {
      return {
        name: variableName,
        value: variableValue
          .replace('[', '')
          .replace(']', '')
          .split(',')
          .map(colorValue => this.processColorValue(colorValue)),
        type: variableType
      };
    }

    if (variableType === 'List Number') {
      return {
        name: variableName,
        value: variableValue
          .replace('[', '')
          .replace(']', '')
          .split(',')
          .map(numValue => parseFloat(numValue)),
        type: variableType
      };
    }

    return {
      name: variableName,
      value: variableValue,
      type: variableType
    };
  }

  protected processVariableValue(type: string, value: string) {
    switch (type) {
      case 'Number':
        return parseFloat(value);
      case 'Boolean':
      case 'String':
        return value;
      case 'Colour':
        return this.processColorValue(value);
      default:
        return value;
    }
  }

  protected processColorValue(value: string): Color {
    const [red, green, blue] = value
      .replace('{', '')
      .replace('}', '')
      .split('-')
      .map(colorNum => parseInt(colorNum, 0));

    return { red, green, blue };
  }

  continue() {
    this.blocklyService.unSelectBlock(this.selectedDebugBlockId);
    this.arduinoDebugPause = false;
    this.deviceCommunicator.sendMessage(
      DeviceMessageType.DEBUG_MESSAGE,
      'CONTINUE'
    );
  }

  stopDebugMode() {
    this.debugModeStopped = true;
    this.blocklyService.unSelectBlock(this.selectedDebugBlockId);
    this.deviceCommunicator.sendMessage(
      DeviceMessageType.DEBUG_MESSAGE,
      'STOP_ALL_DEBUGGING'
    );
  }
}

import { Frame, FrameLocation } from '../frame/frame';
import { ArduinoState } from './state/arduino.state';
import { Step } from './step';
import * as _ from 'lodash';

export class ArduinoFrame implements Frame {
  constructor(
    public readonly blockId: string,
    public readonly state: ArduinoState,
    public readonly frameLocation: FrameLocation,
    public readonly steps: Step[] = []
  ) {}

  public static makeEmptyFrame(blockId: string, frameLocation: FrameLocation) {
    return new ArduinoFrame(
      blockId,
      new ArduinoState([], {}, false),
      frameLocation
    );
  }

  copyState(): ArduinoState {
    return ArduinoState.copyState(this.state);
  }

  makeCopy(blockId: string, frameLocation: FrameLocation): Frame {
    return new ArduinoFrame(
      blockId,
      this.copyState(),
      _.cloneDeep(frameLocation)
    );
  }
}

export const stringToPin = (pin: string): ARDUINO_UNO_PINS => {
  const pinKey = 'PIN_' + pin.toString();

  return (<any>ARDUINO_UNO_PINS)[pinKey];
};

export enum ARDUINO_UNO_PINS {
  PIN_1 = '1',
  PIN_2 = '2',
  PIN_3 = '3',
  PIN_4 = '4',
  PIN_5 = '5',
  PIN_6 = '6',
  PIN_7 = '7',
  PIN_8 = '8',
  PIN_9 = '9',
  PIN_10 = '10',
  PIN_11 = '11',
  PIN_12 = '12',
  PIN_13 = '13',
  PIN_A0 = 'A0',
  PIN_A1 = 'A1',
  PIN_A2 = 'A2',
  PIN_A3 = 'A3',
  PIN_A4 = 'A4',
  PIN_A5 = 'A5'
}

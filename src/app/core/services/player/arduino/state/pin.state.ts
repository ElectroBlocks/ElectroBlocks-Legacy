import {
  ElectricAttachmentComponentState,
  SensorComponent,
  ExplainState
} from './electric.state';
import { ElectricComponentType } from './electric.component.type';
import { ARDUINO_UNO_PINS } from '../arduino_frame';
import { Color } from '../../frame_genorator/color';

export class PinState extends SensorComponent implements ExplainState {
  public readonly electricComponentType = ElectricComponentType.PIN;

  public readonly pins = [this.pin];

  constructor(
    public readonly pin: ARDUINO_UNO_PINS,
    public readonly type: PIN_TYPE,
    public readonly state: number,
    public readonly pinPicture: PinPicture,
    public readonly color?: Color
  ) {
    super();
  }

  public isEqual(state: ElectricAttachmentComponentState): boolean {
    return (
      state instanceof PinState &&
      state.pinPicture === this.pinPicture &&
      this.type === state.type &&
      this.color.red === state.color.red &&
      this.color.green === state.color.green &&
      this.color.blue === state.color.blue &&
      this.pin === state.pin
    );
  }

  public getFieldValue(dataKeySaveInSetupBlock: string) {
    if (this.type === PIN_TYPE.DIGITAL_INPUT) {
      return this.state > 0;
    }

    return this.state;
  }

  public explanation() {
    if (this.pinPicture === PinPicture.LED) {
      return this.type === PIN_TYPE.ANALOG_INPUT
        ? `Turning led ${this.pin} to fade to ${this.state}`
        : `Turning led ${this.pin} ${this.state <= 0 ? 'off' : 'on'}.`;
    }

    if (this.pinPicture === PinPicture.PHOTO_SENSOR) {
      return `Photo Sensor reading ${this.state}`;
    }

    if (this.pinPicture === PinPicture.SOIL_SENSOR) {
      return `Soil Sensor reading ${this.state} humidity.`;
    }

    if (this.pinPicture === PinPicture.TOUCH_SENSOR) {
      return `Touch sensor is ${this.state > 0 ? '' : 'not'} a touch.`;
    }

    if (this.pinPicture === PinPicture.SENSOR) {
      return this.type === PIN_TYPE.ANALOG_INPUT
        ? `Sensor ${this.pin} is sensing this power level ${this.state}`
        : `Sensor ${this.pin} is ${
            this.state <= 0 ? 'not' : ''
          } sensing something.`;
    }

    if (
      this.pinPicture === PinPicture.LED_ANALOG_WRITE ||
      this.pinPicture === PinPicture.LED_DIGITAL_WRITE
    ) {
      return this.type === PIN_TYPE.ANALOG_INPUT
        ? `Turning pin ${this.pin} to fade to ${this.state}`
        : `Turning pin ${this.pin} ${this.state <= 0 ? 'off' : 'on'}.`;
    }
  }
}

export enum PIN_TYPE {
  DIGITAL_OUTPUT = 'DIGITAL_OUTPUT',
  ANALOG_OUTPUT = 'ANALOG_OUTPUT',
  ANALOG_INPUT = 'ANALOG_INPUT',
  DIGITAL_INPUT = 'DIGITAL_INPUT'
}

export enum PinPicture {
  LED = 'LED',
  LED_DIGITAL_WRITE = 'LED_DIGITAL_WRITE',
  LED_ANALOG_WRITE = 'LED_ANALOG_WRITE',
  SENSOR = 'SENSOR',
  PHOTO_SENSOR = 'PHOTO_SENSOR',
  TOUCH_SENSOR = 'TOUCH_SENSOR',
  SOIL_SENSOR = 'SOIL_SENSOR'
}

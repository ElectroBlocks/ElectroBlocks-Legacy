import { ARDUINO_UNO_PINS } from '../arduino_frame';
import { ElectricComponentType } from './electric.component.type';
import {
  ElectricAttachmentComponentState,
  SensorComponent
} from './electric.state';

export class TemperatureState extends SensorComponent {
  public readonly type = 'temp_component';

  public readonly electricComponentType =
    ElectricComponentType.TEMPERATURE_SENSOR;

  public readonly pins = [this.pin];

  constructor(
    public readonly pin: ARDUINO_UNO_PINS,
    public readonly temperature: number,
    public readonly humidity: number
  ) {
    super();
  }

  public getFieldValue(dataKeySaveInSetupBlock: string) {
    if (dataKeySaveInSetupBlock === 'temp') {
      return this.temperature;
    }

    return this.humidity;
  }

  public isEqual(state: ElectricAttachmentComponentState): boolean {
    return state instanceof TemperatureState && state.pin === state.pin;
  }

  public explanation() {
    return `Temperature Sensor is reading ${this.temperature}° and humidity level ${this.humidity}.`;
  }
}

import {
  SensorComponent,
  ElectricAttachmentComponentState
} from './electric.state';
import { ElectricComponentType } from './electric.component.type';
import { ARDUINO_UNO_PINS } from '../arduino_frame';

export class UltraSonicSensorState extends SensorComponent {
  public readonly pins = [this.trigPin, this.echoPin];

  public readonly electricComponentType =
    ElectricComponentType.ULTRASONICE_SENSOR;

  public readonly type = 'ultrasonic_sensor_component';

  constructor(
    public readonly cm: number,
    public readonly trigPin: ARDUINO_UNO_PINS,
    public readonly echoPin: ARDUINO_UNO_PINS
  ) {
    super();
  }

  public getFieldValue(dataKeySaveInSetupBlock: string) {
    return this.cm;
  }
  public isEqual(state: ElectricAttachmentComponentState): boolean {
    return (
      state instanceof UltraSonicSensorState &&
      this.echoPin === state.echoPin &&
      this.trigPin === state.trigPin
    );
  }
}

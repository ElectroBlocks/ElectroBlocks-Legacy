import {
  ElectricAttachmentComponentState,
  ExplainState
} from './electric.state';
import { ARDUINO_UNO_PINS } from '../arduino_frame';
import { ElectricComponentType } from './electric.component.type';

export class ServoState extends ElectricAttachmentComponentState
  implements ExplainState {
  public readonly electricComponentType = ElectricComponentType.SERVO;

  public readonly pins = [this.pin];

  constructor(
    public readonly degree: number,
    public readonly pin: ARDUINO_UNO_PINS
  ) {
    super();
  }

  public isEqual(state: ElectricAttachmentComponentState): boolean {
    return state instanceof ServoState && state.pin === this.pin;
  }

  public explanation() {
    return `Rotating servo ${this.pin} to this angle ${this.degree}°.`;
  }
}

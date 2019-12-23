import {
  ElectricAttachmentComponentState,
  ElectricComponentState,
  ExplainState
} from './electric.state';
import { ElectricComponentType } from './electric.component.type';
import { ARDUINO_UNO_PINS } from '../arduino_frame';

export class MotorState extends ElectricAttachmentComponentState
  implements ExplainState {
  /**
   * Uses a shield mostly
   */
  public readonly pins: ARDUINO_UNO_PINS[] = [];

  public readonly electricComponentType = ElectricComponentType.MOTOR;

  constructor(
    public readonly motorNumber: number,
    public readonly speed: number,
    public readonly direction: MOTOR_DIRECTION
  ) {
    super();
  }

  public isEqual(state: ElectricAttachmentComponentState): boolean {
    return (
      state instanceof MotorState && state.motorNumber === this.motorNumber
    );
  }

  explanation(): string {
    return `Motor ${this.motorNumber} is running ${this.direction} at speed ${this.speed}.`;
  }
}

export enum MOTOR_DIRECTION {
  FORWARD = 'FORWARD',
  BACKWARD = 'BACKWARD'
}

import {
  ElectricAttachmentComponentState,
  SensorComponent
} from './electric.state';
import { ElectricComponentType } from './electric.component.type';
import { ARDUINO_UNO_PINS } from '../arduino_frame';
import { Color } from '../../frame_genorator/color';

export class IRRemoteState extends SensorComponent {
  public readonly type = 'ir_remote_component';

  public readonly electricComponentType = ElectricComponentType.IR_REMOTE;

  constructor(
    public readonly hasCode: boolean,
    public readonly code: string,
    public readonly analogPin: ARDUINO_UNO_PINS
  ) {
    super();
    this.pins.push(analogPin);
  }

  public getFieldValue(dataKeySaveInSetupBlock: string) {
    if (dataKeySaveInSetupBlock === 'has_code') {
      return this.hasCode;
    }

    return this.code;
  }

  public isEqual(state: ElectricAttachmentComponentState): boolean {
    return state instanceof IRRemoteState && state.analogPin === this.analogPin;
  }
}

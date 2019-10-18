import { ARDUINO_UNO_PINS } from '../arduino_frame';
import { Color } from '../../frame_genorator/color';
import { ElectricComponentType } from './electric.component.type';
import { ElectricAttachmentComponentState } from './electric.state';

export class LedColorState extends ElectricAttachmentComponentState {
  public readonly electricComponentType = ElectricComponentType.LED_COLOR;

  constructor(
    public readonly redPin: ARDUINO_UNO_PINS,
    public readonly greenPin: ARDUINO_UNO_PINS,
    public readonly bluePin: ARDUINO_UNO_PINS,
    public readonly type: 'BUILT_IN' | 'BREADBOARD',
    public readonly color: Color
  ) {
    super();
    this.pins.push(this.greenPin, this.bluePin, this.redPin);
  }

  public isEqual(state: ElectricAttachmentComponentState): boolean {
    return state instanceof LedColorState;
  }
}

import {
  SensorComponent,
  ElectricAttachmentComponentState
} from './electric.state';
import { ElectricComponentType } from './electric.component.type';

export class ArduinoMessageState extends SensorComponent {
  public type = 'message_component';
  public readonly electricComponentType = ElectricComponentType.MESSAGE;

  constructor(
    public readonly recievingMessage = false,
    public readonly message = ''
  ) {
    super();
  }

  public getFieldValue(dataKeySaveInSetupBlock: string) {}

  public isEqual(state: ElectricAttachmentComponentState): boolean {
    return state instanceof ArduinoMessageState;
  }
}

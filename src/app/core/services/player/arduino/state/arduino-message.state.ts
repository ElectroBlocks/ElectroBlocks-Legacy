import {
  SensorComponent,
  ElectricAttachmentComponentState
} from './electric.state';
import { ElectricComponentType } from './electric.component.type';

export class ArduinoMessageState extends SensorComponent {
  public type = 'arduino_message_component';
  public readonly electricComponentType = ElectricComponentType.MESSAGE;

  constructor(
    public readonly recievingMessage = false,
    public readonly message = ''
  ) {
    super();
  }

  public getFieldValue(dataKeySaveInSetupBlock: string) {
    if (dataKeySaveInSetupBlock === 'receiving_message') {
      return this.recievingMessage;
    }

    if (dataKeySaveInSetupBlock === 'message') {
      return this.message;
    }
  }

  public isEqual(state: ElectricAttachmentComponentState): boolean {
    return state instanceof ArduinoMessageState;
  }
}

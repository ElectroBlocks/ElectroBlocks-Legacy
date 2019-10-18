import {
  ElectricAttachmentComponentState,
  SensorComponent
} from './electric.state';
import { ARDUINO_UNO_PINS } from '../arduino_frame';
import { ElectricComponentType } from './electric.component.type';

export class BluetoothState extends SensorComponent {
  public readonly electricComponentType = ElectricComponentType.BLUE_TOOTH;

  public readonly pins = [this.rxPin, this.txPin];

  public readonly type = 'bluetooth_component';

  constructor(
    public readonly rxPin: ARDUINO_UNO_PINS,
    public readonly txPin: ARDUINO_UNO_PINS,
    public readonly hasMessage = false,
    public readonly receivedMessage = '',
    public readonly sendMessage = ''
  ) {
    super();
  }

  public copyState() {
    return new BluetoothState(this.rxPin, this.txPin);
  }

  public isEqual(state: ElectricAttachmentComponentState): boolean {
    return (
      state instanceof BluetoothState &&
      state.txPin === this.txPin &&
      this.rxPin === state.rxPin
    );
  }

  public getFieldValue(dataKeySaveInSetupBlock: string) {
    if (dataKeySaveInSetupBlock === 'message') {
      return this.receivedMessage;
    }

    if (dataKeySaveInSetupBlock === 'receiving_message') {
      return this.hasMessage;
    }
  }
}

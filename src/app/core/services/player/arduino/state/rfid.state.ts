import { ARDUINO_UNO_PINS } from './../arduino_frame';
import { ElectricComponentType } from './electric.component.type';
import {
  ElectricAttachmentComponentState,
  SensorComponent
} from './electric.state';
import { listOfStateHoldersBlocks } from '../../frame/state_holder';

export class RFIDState extends SensorComponent {
  public readonly electricComponentType = ElectricComponentType.RFID;
  public readonly type = 'rfid_component';
  constructor(
    public readonly rxPin: ARDUINO_UNO_PINS,
    public readonly txPin: ARDUINO_UNO_PINS,
    public readonly scannedCard: boolean = false,
    public readonly cardNumber,
    public readonly tag
  ) {
    super();
    if (scannedCard) {
      this.cardNumber = cardNumber || 'not set';
      this.tag = tag || 'not set';
    } else {
      this.cardNumber = '';
      this.tag = '';
    }

    this.pins.push(this.rxPin);
    this.pins.push(this.txPin);
  }

  public isEqual(state: ElectricAttachmentComponentState): boolean {
    return state instanceof RFIDState;
  }

  public getFieldValue(dataKeySaveInSetupBlock: string): boolean | string {
    if (dataKeySaveInSetupBlock === 'scanned_card') {
      return this.scannedCard;
    }

    if (dataKeySaveInSetupBlock === 'card_number') {
      return this.cardNumber;
    }

    if (dataKeySaveInSetupBlock === 'tag') {
      return this.tag;
    }

    return undefined;
  }
}

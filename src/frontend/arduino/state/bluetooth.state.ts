import { ElectricAttachmentComponentState } from "./electric.state";
import { ARDUINO_UNO_PINS } from "../arduino_frame";
import { ElectricComponentType } from "./electric.component.type";

export class BluetoothState implements ElectricAttachmentComponentState {

	public readonly electricComponentType = ElectricComponentType.BLUE_TOOTH;

	public readonly pins = [this.rxPin, this.txPin];

	public readonly hasMessage: boolean;

	constructor(
		public readonly rxPin: ARDUINO_UNO_PINS,
		public readonly txPin: ARDUINO_UNO_PINS,
		public readonly receiveMessage = '',
		public readonly sendMessage = '') {

		this.hasMessage = this.receiveMessage.length > 0;
	}

	public copyState() {
		return new BluetoothState(this.rxPin, this.txPin);
	}

}

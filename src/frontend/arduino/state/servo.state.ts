import { ElectricAttachmentComponentState } from "./electric.state";
import { ARDUINO_UNO_PINS } from "../pin";
import { ElectricComponentType } from "./electric.component.type";

export class ServoState extends ElectricAttachmentComponentState {

	public readonly electricComponentType = ElectricComponentType.SERVO;

	public readonly pins = [this.pin];

	constructor(
		public readonly degree: number,
		public readonly pin: ARDUINO_UNO_PINS) {
		super();
	}
}

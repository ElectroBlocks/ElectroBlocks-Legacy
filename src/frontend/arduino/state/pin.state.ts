import { ElectricAttachmentComponentState } from "./electric.state";
import { ElectricComponentType } from "./electric.component.type";
import { ARDUINO_UNO_PINS } from "../arduino_frame";
import { Color } from "../../frame_genorator/color";


export class PinState extends ElectricAttachmentComponentState {

	public readonly electricComponentType = ElectricComponentType.PIN;

	public readonly pins = [ this.pin ];

	constructor(
		public readonly pin: ARDUINO_UNO_PINS,
		public readonly type: PIN_TYPE,
		public readonly state: number,
		public readonly pinPicture: PinPicture,
		public readonly color?: Color
	) {
		super();
	}

}

export enum PIN_TYPE { DIGITAL = 'D', ANALOG = 'A' }

export enum PinPicture {
	LED,
	GENERIC
}


import { ElectricAttachmentComponentState } from "./electric.state";
import { ElectricComponentType } from "./electric.component.type";
import { ARDUINO_UNO_PINS } from "../arduino_frame";


export class PinState extends ElectricAttachmentComponentState {

	public readonly electricComponentType = ElectricComponentType.PIN;

	public readonly pins = [ this.pin ];

	constructor(
		public readonly pin: ARDUINO_UNO_PINS,
		public readonly type: PIN_TYPE,
		public readonly state: number
	) {
		super();
	}

}

export enum PIN_TYPE { DIGITAL = 'D', ANALOG = 'A' };




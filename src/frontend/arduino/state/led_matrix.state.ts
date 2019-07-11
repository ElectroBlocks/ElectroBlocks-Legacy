import { ElectricAttachmentComponentState } from "./electric.state";
import { ElectricComponentType } from "./electric.component.type";
import { ARDUINO_UNO_PINS } from "../pin";

export class LedMatrixState extends ElectricAttachmentComponentState {

	public readonly electricComponentType = ElectricComponentType.LED_MATRIX;

	public readonly pins = [ ARDUINO_UNO_PINS.PIN_10, ARDUINO_UNO_PINS.PIN_11, ARDUINO_UNO_PINS.PIN_12 ];


	constructor(public readonly leds: Array<{ col: number, row: number, isOn: boolean }>) {
		super();
	}
}

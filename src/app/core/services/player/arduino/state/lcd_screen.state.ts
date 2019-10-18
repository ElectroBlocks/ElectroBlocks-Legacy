import { ElectricAttachmentComponentState } from "./electric.state";
import { ElectricComponentType } from "./electric.component.type";
import { ARDUINO_UNO_PINS } from "../arduino_frame";


export class LCDScreenState extends ElectricAttachmentComponentState {

	public readonly electricComponentType = ElectricComponentType.LCD_SCREEN;

	public readonly pins = [ ARDUINO_UNO_PINS.PIN_A5, ARDUINO_UNO_PINS.PIN_A4 ];

	constructor(
		public readonly rows: number,
		public readonly columns: number,
		public readonly memoryType: LCD_SCREEN_MEMORY_TYPE,
		public readonly rowsOfText: string[],
		public readonly blink: { row: number, column: number, blinking: boolean },
		public readonly backLightOn = true) {
		super();
	}

	public isEqual(state: ElectricAttachmentComponentState): boolean {
		return state instanceof LCDScreenState;
	}
}
export enum LCD_SCREEN_MEMORY_TYPE {
	'OX3F' = '0x3F',
	'0X27' = '0x27'
}

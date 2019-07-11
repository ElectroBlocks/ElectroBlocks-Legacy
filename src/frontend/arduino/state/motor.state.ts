import { ElectricAttachmentComponentState, ElectricComponentState } from "./electric.state";
import { ElectricComponentType } from "./electric.component.type";
import { MOTOR_DIRECTION } from "../motor";
import { ARDUINO_UNO_PINS } from "../pin";

export class MotorState extends ElectricAttachmentComponentState {

	/**
	 * Uses a shield mostly
	 */
	public readonly pins: ARDUINO_UNO_PINS[] = [];

	public readonly electricComponentType = ElectricComponentType.MOTOR;

	constructor(
		public readonly motorNumber: number,
		public readonly speed: number,
		public readonly direction: MOTOR_DIRECTION ) {
		super();
	}
}

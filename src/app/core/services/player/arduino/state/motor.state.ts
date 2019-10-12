import { ElectricAttachmentComponentState, ElectricComponentState } from "./electric.state";
import { ElectricComponentType } from "./electric.component.type";
import { ARDUINO_UNO_PINS } from "../arduino_frame";

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

	public isEqual(state: ElectricAttachmentComponentState): boolean {
		return state instanceof MotorState && state.motorNumber == this.motorNumber;
	}
}

export enum MOTOR_DIRECTION {
	FORWARD = 'FORWARD',
	BACKWARD = 'BACKWARD'
}

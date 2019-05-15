import { USB, USB_COMMAND_TYPES } from "./usb";
import { Copy } from "./copy";
import { Command, COMMAND_TYPE, EmptyCommand } from "../frame/command";


export class Motor implements USB, Copy<Motor> {

	constructor(public readonly motorNumber: 1|2|3|4, public readonly direction: MOTOR_DIRECTION, public readonly speed: number) {}

	setupCommandUSB(): Command {
		return new EmptyCommand();
	}

	usbCommand(): Command {
		return  {
			type: COMMAND_TYPE.USB,
			command: `M-MT-${this.motorNumber}:${this.direction}:${this.speed}${USB_COMMAND_TYPES.END_OF_COMMAND}`
		};
	}

	makeCopy(): Motor {
		return new Motor(this.motorNumber, this.direction, this.speed);
	}



}

export enum MOTOR_DIRECTION {
	FORWARD = 'FORWARD',
	BACKWARD = 'BACKWARD'
}

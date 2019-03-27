import { Copy } from './copy';
import { USB, USB_COMMAND_TYPES } from './usb';
import { Command, COMMAND_TYPE, EmptyCommand } from "../frame/command";

/**
 * This represents an led matrix
 */
export class LedMatrix implements Copy<LedMatrix>, USB {

	private leds = new Array<LedInMatrix>();

	/**
	 * Sets an led light on the matrix
	 * @param led
	 */
	public setLed( led: LedInMatrix ) {
		let [ existingLed ] = this.leds.filter( currentLed => currentLed.hasSamePosition( led ) );

		if (!existingLed) {
			this.leds.push( led );
			return;
		}

		existingLed.isOn = led.isOn;
	}


	setupCommandUSB(): Command {
		return {
			command: USB_COMMAND_TYPES.LED_MATRIX,
			type: COMMAND_TYPE.USB
		};
	}

	makeCopy(): LedMatrix {
		let matrix = new LedMatrix();
		this.leds.forEach( led => matrix.setLed( led ) );

		return matrix;
	}

	usbCommand(): Command {
		let command = '';
		this.leds.forEach( led => {
			command += led.usbCommand().command;
		} );

		return {
			command,
			type: COMMAND_TYPE.USB
		};
	}

}

export class LedInMatrix
	implements USB {

	constructor( public isOn: boolean, public readonly xPosition: number, public readonly yPosition: number ) {
	}

	/**
	 * Return true if the led is the same position.
	 *
	 * @param led
	 */
	hasSamePosition( led: LedInMatrix ): boolean {
		return this.xPosition == led.xPosition && this.yPosition == led.yPosition;
	}

	usbCommand(): Command {
		const command = `${USB_COMMAND_TYPES.MOVE}-${USB_COMMAND_TYPES.LED_MATRIX}-${this.yPosition}:${this.xPosition}:${this.usbOnOff()}${USB_COMMAND_TYPES.END_OF_COMMAND}`;

		return {
			type: COMMAND_TYPE.USB,
			command
		}
	}

	setupCommandUSB() {
		return new EmptyCommand();
	}

	/**
	 * Returns the usb version of on or off
	 */
	usbOnOff() {
		return this.isOn ? 'ON' : 'OFF';
	}

}

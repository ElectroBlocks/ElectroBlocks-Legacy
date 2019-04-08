import { Frame } from '../frame/frame';
import { Variable } from '../frame/variable';
import { USB, USB_COMMAND_TYPES } from './usb';
import { Command, COMMAND_TYPE, EmptyCommand } from "../frame/command";
import { v4 } from 'uuid';

export class ArduinoFrame implements Frame, USB {

	private uuid: string;

	constructor(
		public readonly blockId: string,
		public readonly variables: { [ key: string ]: Variable },
		public readonly components: Array<USB>,
		public readonly command: Command) {

		this.uuid = v4();
	}

	public static makeEmptyFrame( blockId: string ) {
		return new ArduinoFrame( blockId, {}, [], new EmptyCommand() );
	}

	nextCommand(): Command {
		return this.command;
	}

	directFrameCommand(): Command[] {
		return [ this.setupCommandUSB(), this.usbCommand() ];
	}

	usbCommand(): Command {
		const command = this.components.reduce( ( previousValue, component ) => {
			return previousValue + component.usbCommand().command;
		}, '' );

		return {
			command,
			type: COMMAND_TYPE.USB
		};
	}

	setupCommandUSB(): Command {
		if (this.components.length == 0) {
			return new EmptyCommand();
		}

		let endOfSetup = this.components
			.filter( component => component.setupCommandUSB().type == COMMAND_TYPE.USB )
			.reduce( ( previousValue, component ) => {
				return previousValue + '-' + component.setupCommandUSB().command;
			}, '' );

		if (endOfSetup == '') {
			return new EmptyCommand();
		}

		let numberOfThingSetup = this.components
			.filter( component => component.setupCommandUSB().type == COMMAND_TYPE.USB)
			.length;

		const command = `${USB_COMMAND_TYPES.SETUP}-${numberOfThingSetup}${endOfSetup}${USB_COMMAND_TYPES.END_OF_COMMAND}`;

		return {
			type: COMMAND_TYPE.USB,
			command
		};

	}

	makeCopy( blockId: string ): ArduinoFrame {
		return new ArduinoFrame( blockId, this.variables, this.components, this.command );
	}
}


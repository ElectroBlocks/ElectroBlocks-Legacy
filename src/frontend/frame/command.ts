export interface Command {

	readonly type: COMMAND_TYPE;

	readonly command?: string;
}

export class EmptyCommand implements Command{

	public readonly command = '';
	type = COMMAND_TYPE.EMPTY;

}

export class VirtualCircuitCommand implements Command{

	constructor(public readonly type: COMMAND_TYPE) {}
}

export class TimeCommand implements Command {

	constructor(public readonly command: string) {}

	public type = COMMAND_TYPE.TIME;
}

export class MessageCommand implements  Command{
	constructor(public readonly command: string) { }
	readonly type = COMMAND_TYPE.MESSAGE;
}

export class BluetoothCommand implements Command{
	constructor(public readonly command: string) { }
	readonly type = COMMAND_TYPE.BLUETOOTH_MESSAGE;
}

export enum COMMAND_TYPE {
	USB,
	TIME,
	EMPTY,
	MESSAGE,
	BLUETOOTH_MESSAGE,
	ELECTRONIC_COMPONENT
}

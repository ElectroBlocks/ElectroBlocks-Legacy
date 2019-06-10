import { ipcRenderer } from "electron";

export class ExecuteUSBFrame implements ExecuteFrameInterface {


	constructor() {
	}

	public executeCommand( command: string ) {
		ipcRenderer.send( 'send:message', command );
	}


}

export class ExecuteDebugFrame implements ExecuteFrameInterface {
	executeCommand( command: string ): void {
		console.log( command, 'USB COMMAND' );
	}


}

export class ExecuteSilentFrame implements ExecuteFrameInterface {
	executeCommand( command: string ): void {

	}


}


export interface ExecuteFrameInterface {

	executeCommand( command: string ): void;
}

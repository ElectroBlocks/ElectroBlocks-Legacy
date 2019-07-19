import { ArduinoState } from "../arduino/state/arduino.state";
import { VirtualCircuit } from "../virtual-circuit/svg/virtual-circuit";

export class ExecuteUSBFrame implements ExecuteFrameInterface {


	constructor() {
	}

	public executeCommand(state: ArduinoState, finalState: ArduinoState, runSetup: boolean ) {
		// TODO HOOK UP STATE TO COMMAND
		return Promise.resolve(true);
	}


}

export class ExecuteVirtualCircuitFrame implements ExecuteFrameInterface {

	constructor(private virtualCircuit: VirtualCircuit) {}

	async executeCommand( state: ArduinoState, finalState: ArduinoState, runSetup: boolean ): Promise<boolean> {
		this.virtualCircuit.matchFinalState(finalState);
		this.virtualCircuit.matchState(state);
		return true;
	}
}


export class ExecuteDebugFrame implements ExecuteFrameInterface {
	public executeCommand( state: ArduinoState, finalState: ArduinoState, runSetup: boolean ) {
		console.log( state, 'USB COMMAND' );
		return Promise.resolve(true);
	}


}

export class ExecuteSilentFrame implements ExecuteFrameInterface {
	public executeCommand( state: ArduinoState, finalState: ArduinoState, runSetup: boolean ) {
		return Promise.resolve(true);
	}


}


export interface ExecuteFrameInterface {

	executeCommand( state: ArduinoState, finalState: ArduinoState, runSetup: boolean ): Promise<boolean>;
}

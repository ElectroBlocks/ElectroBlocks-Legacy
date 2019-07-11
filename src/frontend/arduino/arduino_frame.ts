import { Frame, FrameLocation } from '../frame/frame';
import { v4 } from 'uuid';
import { ArduinoState } from "./state/arduino.state";
import { ActionType } from "../frame/action.type";
import * as _ from "lodash";

export class ArduinoFrame implements Frame {

	/**
	 * The id of the frame
	 */
	 private uuid: string;

	constructor(
		public readonly blockId: string,
		public readonly state: ArduinoState,
		public readonly frameLocation: FrameLocation,
		public readonly actionType = ActionType.EMPTY) {
		this.uuid = v4();
	}

	public static makeEmptyFrame( blockId: string, frameLocation: FrameLocation ) {
		return new ArduinoFrame(
			blockId, new ArduinoState([], {}, false), frameLocation
		);
	}

	copyState(): ArduinoState {
		return this.state.copyState();
	}

	makeCopy( blockId: string, frameLocation: FrameLocation ): Frame {
		return new ArduinoFrame(
			blockId, this.copyState(), _.cloneDeep(frameLocation), this.actionType
		);
	}
}



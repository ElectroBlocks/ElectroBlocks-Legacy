import { Block } from "../frame/block";
import { FrameLocation } from "../frame/frame";
import { ArduinoFrame } from "../arduino/arduino_frame";
import { ArduinoState } from "../arduino/state/arduino.state";
import { ActionType } from "../frame/action.type";

export const temp_get_temp_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame):ArduinoFrame[] => {

	const state = previousFrame ? previousFrame.state : ArduinoState.makeEmptyState();

	return [
		new ArduinoFrame(
			block.id,state, frameLocation, ActionType.EMPTY
		)];
};

export const ir_remote_scan_again_block = temp_get_temp_block;
export const temp_setup_block = temp_get_temp_block;
export const ir_remote_setup_block = temp_get_temp_block;
export const soil_sensor_setup_block = temp_get_temp_block;
export const bluetooth_setup_block = temp_get_temp_block;

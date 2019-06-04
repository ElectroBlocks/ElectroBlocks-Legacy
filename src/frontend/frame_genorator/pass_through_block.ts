import { Block } from "../frame/block";
import { FrameLocation } from "../frame/frame";
import { ArduinoFrame } from "../arduino/arduino_frame";
import { EmptyCommand } from "../frame/command";

export const temp_get_temp_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame):ArduinoFrame[] => {

	const variables = previousFrame ? previousFrame.variables : {};
	const components = previousFrame ? previousFrame.components : [];

	return [
		new ArduinoFrame(
			block.id,variables, components, new EmptyCommand(), frameLocation
		)];
};

export const ir_remote_scan_again_block = temp_get_temp_block;
export const temp_setup_block = temp_get_temp_block;
export const ir_remote_setup_block = temp_get_temp_block;
export const soil_sensor_setup_block = temp_get_temp_block;
export const bluetooth_setup_block = temp_get_temp_block;

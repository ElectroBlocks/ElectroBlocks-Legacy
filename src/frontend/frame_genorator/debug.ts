import { Block } from "../frame/block";
import { FrameLocation } from "../frame/frame";
import { ArduinoFrame } from "../arduino/arduino_frame";
import { EmptyCommand } from "../frame/command";

export const debug_block = (block: Block,
                            frameLocation: FrameLocation,
                            previousFrame?: ArduinoFrame):ArduinoFrame[] => {

	const components = previousFrame ? previousFrame.components : [];
	const variables = previousFrame? previousFrame.variables : {};
	const command = new EmptyCommand();


	return [ new ArduinoFrame(block.id, variables, components, command, frameLocation) ];
};

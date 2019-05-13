import { Block } from "../frame/block";
import { FrameLocation } from "../frame/frame";
import { ArduinoFrame } from "../arduino/arduino_frame";
import { EmptyCommand } from "../frame/command";

export const send_message_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame):ArduinoFrame[] => {
	if (previousFrame) {
		return [
			new ArduinoFrame(block.id, previousFrame.variables, previousFrame.components, new EmptyCommand(), frameLocation)
		];
	}

	return [
		new ArduinoFrame(
			block.id,{}, [], new EmptyCommand(), frameLocation
		)];
};

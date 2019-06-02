import { Block } from "../frame/block";
import { FrameLocation } from "../frame/frame";
import { ArduinoFrame } from "../arduino/arduino_frame";
import { EmptyCommand, MessageCommand } from "../frame/command";
import { getInputValue } from "../frame/blockly_helper";

export const send_message_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame):ArduinoFrame[] => {

	const message = getInputValue(block, 'MESSAGE', '', previousFrame).toString();

	const command = new MessageCommand(message);

	if (previousFrame) {
		return [
			new ArduinoFrame(block.id, previousFrame.variables, previousFrame.components, command, frameLocation)
		];
	}

	return [
		new ArduinoFrame(
			block.id,{}, [], command, frameLocation
		)];
};

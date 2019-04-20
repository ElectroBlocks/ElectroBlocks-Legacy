import { Block } from "../frame/block";
import { ArduinoFrame } from "../arduino/arduino_frame";
import { getInputValue } from "../frame/blockly_helper";
import { TimeCommand } from "../frame/command";
import { FrameLocation } from "../frame/frame";


export const delay_block_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame) => {
	const copyFrame = previousFrame ? previousFrame.makeCopy(block.id) :
		ArduinoFrame.makeEmptyFrame(block.id, frameLocation);

	const time = getInputValue(block, 'DELAY',1, previousFrame).toString();

	const timeCommand = new TimeCommand((parseFloat(time) * 1000).toFixed(0).toString());

	const frame = new ArduinoFrame(block.id, copyFrame.variables, copyFrame.components, timeCommand, frameLocation);

	return [frame];
}

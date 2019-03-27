import { Block } from "../frame/block";
import { ArduinoFrame } from "../arduino/arduino_frame";
import { getInputValue } from "../frame/blockly_helper";
import { TimeCommand } from "../frame/command";


export const delay_block_block = (block: Block, previousFrame?: ArduinoFrame) => {
	const copyFrame = previousFrame ? previousFrame.makeCopy(block.id) :
		ArduinoFrame.makeEmptyFrame(block.id);

	const time = getInputValue(block, 'DELAY',1, previousFrame).toString();

	const timeCommand = new TimeCommand((parseFloat(time) * 1000).toFixed(0).toString());

	const frame = new ArduinoFrame(block.id, copyFrame.variables, copyFrame.components, timeCommand);

	return [frame];
}

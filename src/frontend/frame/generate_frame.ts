import { ArduinoFrame } from "../arduino/arduino_frame";
import { frameGeneratingBlocks } from "./frame_list";
import { generateFrameForInputStatement } from "./blockly_helper";
import { get_blockly } from "./block";
import { inputState } from "./input_state";



export const generateListOfFrame = async (numberOfTimesThroughLoop: number = 1) => {

	inputState.clearBlockCalls();
	let arduinoBlock = get_blockly().mainWorkspace.getTopBlocks().filter(function (block) {
		return block.type == 'arduino_start';
	})[0];

	let topBlocks = get_blockly()
		.mainWorkspace
		.getTopBlocks()
		.filter(block => block.type != 'arduino_start');

	let frames = new Array<ArduinoFrame>();

	topBlocks
		.filter(block => !block.disabled)
		.filter(block => block.type != 'procedures_defnoreturn')
		.forEach(block => {
			frameGeneratingBlocks[block.type + '_block'](block, { location: 'pre-setup', iteration: 0 }, frames.length == 0 ? null : frames[frames.length - 1])
				.filter(frame => frame instanceof ArduinoFrame)
				.forEach((currentFrame: ArduinoFrame) => frames.push(currentFrame));
		});

	let setupFrames = generateFrameForInputStatement(
		arduinoBlock,
		'setup',
		{ location: 'setup', iteration: 0 },
		frames.length == 0 ? null : frames[frames.length - 1]
	) as ArduinoFrame[];

	setupFrames.forEach(currentFrame => frames.push(currentFrame) );

	for (let i = 0; i < numberOfTimesThroughLoop; i += 1) {

		let loopFrames = generateFrameForInputStatement(
			arduinoBlock,
			'loop',
			{ location: 'loop', iteration: i },
			frames.length == 0 ? null : frames[frames.length - 1],
		) as ArduinoFrame[];

		loopFrames.forEach(currentFrame => frames.push(currentFrame));

	}

	return frames;
};

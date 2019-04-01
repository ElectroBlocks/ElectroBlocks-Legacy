
import { ArduinoFrame } from "../arduino/arduino_frame";
import { generateFrameForInputStatement, getInputValue } from "../frame/blockly_helper";
import { getVariableName } from "./variables";
import { Block } from "../frame/block";

/**
 * Generates a simple loop block where the user does not have control
 * over the index variable.
 */
const controls_repeat_ext_block = (block: Block, previousFrame?: ArduinoFrame) => {
	const loopFrame = previousFrame ? previousFrame.makeCopy(block.id) :
		ArduinoFrame.makeEmptyFrame(block.id);

	const times = getInputValue(block, 'TIMES', 1, previousFrame);

	if (times <= 0) {
		return [loopFrame];
	}

	let frames = generateFrameForInputStatement(block, 'DO', loopFrame) as ArduinoFrame[];
	frames.unshift(loopFrame);

	for (let i = 1; i < times; i += 1) {
		previousFrame = frames[frames.length - 1];
		frames = frames
			.concat(
				generateFrameForInputStatement(
					block,
					'DO',
					previousFrame
				) as ArduinoFrame[]
			);
	}

	return frames;
};

/**
 * A for / count with block
 */
const controls_for_block = (block: Block, previousFrame?: ArduinoFrame) => {


	const start = parseInt(getInputValue(block, 'FROM', 1, previousFrame).toString());

	const to = parseInt(getInputValue(block, 'TO', 1, previousFrame).toString());

	let by = Math.abs(
		parseInt(
			getInputValue(
				block,
				'BY',
				1,
				previousFrame
			).toString()
		)
	);


	let loopFrame = generateLoopFrame(start, block, previousFrame);

	let frames =  generateFrameForInputStatement(
		block,
		'DO',
		loopFrame
	);

	frames.unshift(loopFrame);

	if (to === start) {
		return frames;
	}

	by *= to > start ? 1 : -1;

	let index = start + by;

	while(checkLoop(index, to, to > start))  {
		let nextLoopFrame = generateLoopFrame(index, block, previousFrame)
		frames.push(nextLoopFrame); // so that it copies the value and not the reference
		frames = frames
			.concat(
				generateFrameForInputStatement(
					block, 'DO', nextLoopFrame)
			);
		index += by;
	}

	return frames;
};

/**
 * Checks in the count with block if it should exit it
 */
const checkLoop = (index: number, to:number, isPositive: boolean) => {
	if (isPositive) {
		return index <= to;
	}

	return index >= to;
};

const generateLoopFrame = (indexValue: number, block: Block, previousFrame?: ArduinoFrame): ArduinoFrame  => {

	const startFrame = previousFrame ? previousFrame : ArduinoFrame.makeEmptyFrame(block.id);

	const variables = startFrame.variables;

	const indexVariableName = getVariableName(block);


	variables[indexVariableName] = {
		type: 'Number',
		value: indexValue,
		name: indexVariableName
	};

	return new ArduinoFrame(
		block.id,
		variables,
		startFrame.components,
		startFrame.command
	);

};

export  {
	controls_for_block,
	controls_repeat_ext_block
}

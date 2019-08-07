import { ArduinoFrame } from "../arduino/arduino_frame";
import { Block } from "../frame/block";
import { generateFrameForInputStatement, getInputValue } from "../frame/blockly_helper";
import { Frame, FrameLocation } from "../frame/frame";
import { ArduinoState } from "../arduino/state/arduino.state";


/**
 * Returns true or false based on the drop down of the block.
 */
const logic_boolean_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame) => {
	return block.getFieldValue('BOOL') == 'TRUE';
};

/**
 * Compares the value of the 2 blocks and returns true or false
 */
const logic_compare_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame) => {
	let op = block.getFieldValue('OP');

	let aValue = getInputValue(
		block,
		'A',
		true,
		frameLocation,
		previousFrame
	);

	let bValue = getInputValue(
		block,
		'B',
		false,
		frameLocation,
		previousFrame
	);

	switch (op) {
		case 'EQ':
			return aValue == bValue;
		case 'NEQ':
			return aValue != bValue;
		case 'LT':
			return aValue < bValue;
		case 'LTE':
			return aValue <= bValue;
		case 'GT':
			return aValue > bValue;
		case 'GTE':
			return aValue >= bValue;
	}

	throw Error('No Valid Comparison Operation Found');
};

/**
 * Generates the frames for the if block
 */
const control_if_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame): Frame[] => {
	return generateIfElseFrames(block, false,frameLocation, previousFrame);
};

/**
 * Generates the frames for the if else block
 */
const controls_ifelse_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame) => {
	return generateIfElseFrames(block, true, frameLocation, previousFrame);
};

/**
 * Compares to booleans with a logic operator and returns true or false
 */
const logic_operation_block = (block: Block,frameLocation: FrameLocation, previousFrame?: ArduinoFrame): boolean => {
	const op = block.getFieldValue('OP');

	const aValue = getInputValue(
		block,
		'A',
		true,
		frameLocation,
		previousFrame
	) as boolean;

	const bValue = getInputValue(
		block,
		'B',
		false,
		frameLocation,
		previousFrame
	) as boolean;

	switch (op) {
		case 'AND':
			return aValue && bValue;
		case 'OR':
			return aValue || bValue;
	}

	throw Error('No Valid Logic Operation Found');
};

/**
 * Returns the invert boolean value turns true to false and false to true.
 */
const logic_negate_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame) => {
	let valueToInvert = getInputValue(
		block,
		'BOOL',
		 true,
		frameLocation,
		previousFrame
	);

	return !valueToInvert;
};

/**
 * Generates frames for both the if and else blocks
 */
const generateIfElseFrames = (block: Block, hasElse: boolean, frameLocation: FrameLocation, previousFrame?: ArduinoFrame) =>  {

	const state = previousFrame ? previousFrame.copyState() : ArduinoState.makeEmptyState();

	let ifFrame = new ArduinoFrame(block.id, state, frameLocation);

	let executeBlocksInsideIf = getInputValue(
		block,
		'IF0',
		true,
		frameLocation,
		previousFrame
	) as boolean;

	if (!executeBlocksInsideIfElse(executeBlocksInsideIf, hasElse)) {
		return [ifFrame];
	}

	// DO0 is for the if code that is executed if the block is true
	// ELSE is for if the ELSE block is true
	let inputStatementName = executeBlocksInsideIf ? 'DO0' : 'ELSE';

	let frames = generateFrameForInputStatement(block, inputStatementName, frameLocation, ifFrame);
	frames.unshift(ifFrame);

	return frames;

};

/**
 * Returns true if blocks inside the if else should be executed
 */
const executeBlocksInsideIfElse = (executeBlocksInsideIf: boolean, hasElse: boolean) =>  {
	return executeBlocksInsideIf || hasElse;
};

export {
	logic_boolean_block,
	logic_compare_block,
	logic_negate_block,
	logic_operation_block,
	control_if_block,
	controls_ifelse_block
}

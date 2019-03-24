import { ArduinoFrame } from "../arduino/arduino_frame";
import { Block } from "../frame/block";
import { generateFrameForInputStatement, getInputValue } from "../frame/blockly_helper";
import { Frame } from "../frame/frame";


/**
 * Returns true or false based on the drop down of the block.
 */
const logic_boolean_block = (block: Block, previousFrame?: ArduinoFrame) => {
	return block.getFieldValue('BOOL') == 'TRUE';
};

/**
 * Compares the value of the 2 blocks and returns true or false
 */
const logic_compare_block = (block: Block, previousFrame?: ArduinoFrame) => {
	let op = block.getFieldValue('OP');

	let aValue = getInputValue(
		block,
		'A',
		true,
		previousFrame
	);

	let bValue = getInputValue(
		block,
		'B',
		false,
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
const control_if_block = (block: Block, previousFrame?: ArduinoFrame): Frame[] => {
	return generateIfElseFrames(block, false, previousFrame);
};

/**
 * Generates the frames for the if else block
 */
const controls_ifelse_block = (block: Block, previousFrame?: ArduinoFrame) => {
	return generateIfElseFrames(block, true, previousFrame);
};

/**
 * Compares to booleans with a logic operator and returns true or false
 */
const logic_operation_block = (block: Block, previousFrame?: ArduinoFrame): boolean => {
	const op = block.getFieldValue('OP');

	const aValue = getInputValue(
		block,
		'A',
		true,
		previousFrame
	) as boolean;

	const bValue = getInputValue(
		block,
		'B',
		false,
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
const logic_negate_block = (block: Block, previousFrame?: ArduinoFrame) => {
	let valueToInvert = getInputValue(
		block,
		'BOOL',
		 true,
		previousFrame
	);

	return !valueToInvert;
};

/**
 * Generates frames for both the if and else blocks
 */
const generateIfElseFrames = (block: Block, hasElse: boolean, previousFrame?: ArduinoFrame) =>  {

	let ifFrame = previousFrame ?
		previousFrame.makeCopy(block.id) :
		ArduinoFrame.makeEmptyFrame(block.id);

	let executeBlocksInsideIf = getInputValue(
		block,
		'IF0',
		true,
		previousFrame
	) as boolean;

	if (!executeBlocksInsideIfElse(executeBlocksInsideIf, hasElse)) {
		return [ifFrame];
	}

	// DO0 is for the if code that is executed if the block is true
	// ELSE is for if the ELSE block is true
	let inputStatementName = executeBlocksInsideIf ? 'DO0' : 'ELSE';

	let frames = generateFrameForInputStatement(block, inputStatementName, ifFrame);
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

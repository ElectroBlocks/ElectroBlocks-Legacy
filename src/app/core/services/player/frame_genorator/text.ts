/**
 * Created by noahglaser on 2/16/19.
 */
import { Block } from 'blockly';
import { ArduinoFrame } from "../arduino/arduino_frame";
import { getInputValue } from "../frame/blockly_helper";
import { FrameLocation } from "../frame/frame";

const text_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame) =>  {
	return block.getFieldValue('TEXT');
};


/**
 * Combines all the string attached to the join text block together
 */
const text_join_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame) =>  {
	let inputLength = block.inputList.length;
	let returnString = '';

	for (let i = 0; i < inputLength; i += 1) {
		returnString += getInputValue(
			block,
			'ADD' + i,
			'',
			frameLocation,
			previousFrame
		);
	}

	return returnString;
};

/**
 * This gets the text length from a string or string variable
 */
const text_length_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame) =>  {
	return getInputValue(
		block,
		'VALUE',
		'',
		frameLocation,
		previousFrame
	).toString().length;
};

/**
 * Returns true if the string input is empty
 */
const text_isEmpty_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame) =>  {
	return getInputValue(
		block,
		'VALUE',
		'',
		frameLocation,
		previousFrame
	).toString().length == 0;
};

/**
 * Takes a number and converts to a string.
 */
const number_to_string_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame) =>  {
	let number = getInputValue(
		block,
		'NUMBER',
		0,
		frameLocation,
		previousFrame
	).toString();

	let precision = parseInt(block.getFieldValue('PRECISION'));

	return parseFloat(number).toFixed(precision).toString();
};

/**
 * Turns a string into an array and get section of it if available
 */
const parse_string_block_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame) =>  {

	const text = getInputValue(
		block,
		'VALUE',
		'',
		frameLocation,
		previousFrame
	).toString();


	const delimiter = block.getFieldValue('DELIMITER');

	const positionString = getInputValue(
		block,
		'POSITION',
		0,
		frameLocation,
		previousFrame
	).toString();

	let position = parseInt(positionString);

	position = position >= 1 ? position - 1 : 0;

	let splitTextArray = text.split(delimiter);

	return splitTextArray[position] || '';
};


/**
 * Upper Cases or Lowers Cases Text
 *
 */
const text_changeCase_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame) =>  {
	const op = block.getFieldValue('CASE');

	const string = getInputValue(
		block,
		'TEXT',
		'',
		frameLocation,
		previousFrame
	).toString();

	return op == 'UPPERCASE' ? string.toUpperCase() : string.toLowerCase();
};

export {
	text_block,
	text_changeCase_block,
	text_isEmpty_block,
	text_join_block,
	text_length_block,
	number_to_string_block,
	parse_string_block_block
}

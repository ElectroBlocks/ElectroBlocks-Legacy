import { Block } from "../frame/block";
import { ArduinoFrame } from "../arduino/arduino_frame";
import { getInputValue } from "../frame/blockly_helper";
import { FrameLocation } from "../frame/frame";

/**
 * Gets the number inside the block
 */
const math_number_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame): number => {
	return parseFloat(block.getFieldValue('NUM'));
};

/**
 * Math operates the 2 numbers in attached to the block
 */
const math_arithmetic_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame): number => {
	let op = block.getFieldValue('OP');
	const aValue = getInputValue(block, 'A', 1, frameLocation, previousFrame);
	const bValue = getInputValue(block, 'B', 1, frameLocation, previousFrame);

	const numA = parseFloat(aValue.toString());
	const numB = parseFloat(bValue.toString());

	switch (op) {
		case 'ADD':
			return numA + numB;
		case 'MINUS':
			return numA - numB;
		case 'MULTIPLY':
			return numA * numB;
		case 'DIVIDE':
			const divider = numB <= 0 ? 1 : numB;

			return numA / divider;
		case 'POWER':
			return Math.pow(numA, numB);
	}

	throw Error('No Valid Math Operation Found');
};

/**
 * Rounds Operates on the value attached to the block
 */
const math_round_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame) => {

	const op = block.getFieldValue('OP');
	const numberString = getInputValue(block, 'NUM',1,
		frameLocation,previousFrame).toString();

	const number = parseFloat(numberString);

	switch (op) {
		case 'ROUND':
			return Math.round(number);
		case 'ROUNDUP':
			return Math.ceil(number);
		case 'ROUNDDOWN':
			return Math.floor(number);
	}

	throw Error('No Valid Math Operation Found');
};

/**
 * Gets the remainer from the block
 */
const math_modulo_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame) => {

	let dividendValue = getInputValue(block, 'DIVIDEND',  1, frameLocation, previousFrame).toString();

	let dividerValue = getInputValue(block, 'DIVISOR', 1,
		frameLocation,previousFrame).toString();

	return parseInt(dividendValue) % parseInt(dividerValue);
};

/**
 * Gets a random number within range
 */
const math_random_int_block = (block: Block,frameLocation: FrameLocation, previousFrame?: ArduinoFrame) =>  {

	const fromValue = getInputValue(block, 'FROM',1, frameLocation,previousFrame).toString();

	const toValue = getInputValue(block, 'TO', 10, frameLocation,previousFrame).toString();

	return getRandomInt(parseInt(fromValue), parseInt(toValue));
};

/**
 * Turns a "string" to a number not super relevant in javascript
 */
const string_to_number_block = (block: Block,frameLocation: FrameLocation, previousFrame?: ArduinoFrame): number =>  {

	let numValue = getInputValue(block, 'VALUE',0,frameLocation, previousFrame);

	return parseFloat(numValue.toString());
};

/**
 * Does the random number calculations
 */
const getRandomInt = (min: number, max: number) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export {
	string_to_number_block,
	math_arithmetic_block,
	math_modulo_block,
	math_random_int_block,
	math_number_block,
	math_round_block,
	getRandomInt
};

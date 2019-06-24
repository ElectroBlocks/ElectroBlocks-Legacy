
import { ArduinoFrame } from "../arduino/arduino_frame";
import { Block } from "../frame/block";
import { getInputValue } from "../frame/blockly_helper";
import { getRandomInt } from "./math";
import { FrameLocation } from "../frame/frame";

/**
 * 
 */
const colour_picker_block = (block: Block,frameLocation: FrameLocation, previousFrame?: ArduinoFrame) : Color => {
	let value = block.getFieldValue('COLOUR');

	return hexToRgb(value)
}

/**
 * Returns a random colour object
 *
 * @param block
 * @param previousFrame
 * @return {{r: *, g: *, b: *}}
 */
const colour_random_block = (block: Block,frameLocation: FrameLocation, previousFrame?: ArduinoFrame): Color =>  {

	return { red: getRandomInt(0, 255), green : getRandomInt(0, 255), blue: getRandomInt(0, 255) };
}

/**
 * Returns a colour object
 *
 * @param block
 * @param previousFrame
 * @return {{r: Number, g: Number, b: Number}}
 */
const colour_rgb_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame) : Color =>  {

	const red = getInputValue(
		block,
		'RED',
		0,
		frameLocation,
		previousFrame
	).toString();

	const green = getInputValue(
		block,
		'GREEN',
		0,
		frameLocation,
		previousFrame
	).toString();

	const blue = getInputValue(
		block,
		'BLUE',
		0,
		frameLocation,
		previousFrame
	).toString();

	return { red: parseInt(red), green : parseInt(green), blue: parseInt(blue) };

}

/**
 * Converts a #332323 hex string to rgb colour object
 *
 * @param hex
 * @return {*}
 */
const hexToRgb = (hex: string) =>  {
	let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		red: parseInt(result[1], 16),
		green: parseInt(result[2], 16),
		blue: parseInt(result[3], 16)
	} : null;
}

class Color {
	red: number;
	green: number;
	blue: number;
}

export  {
	colour_rgb_block,
	colour_random_block,
	colour_picker_block,
	Color
};


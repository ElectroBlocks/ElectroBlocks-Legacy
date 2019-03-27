/**
 * Created by noahglaser on 2/19/19.
 */
import { Block } from "../frame/block";
import { ArduinoFrame } from "../arduino/arduino_frame";
import { getVariableName } from "./variables";
import { getInputValue } from "../frame/blockly_helper";
import { Color } from "./colour";
import { EmptyCommand } from "../frame/command";


const create_list_number_block_block = (block: Block, previousFrame?: ArduinoFrame): ArduinoFrame[] => {
	return createArrayType(block, 'Number List', previousFrame);
};

const create_list_string_block_block = (block: Block, previousFrame?: ArduinoFrame):ArduinoFrame[] => {
	return createArrayType(block, 'String List', previousFrame);
};

const create_list_boolean_block_block = (block: Block, previousFrame?: ArduinoFrame):ArduinoFrame[] => {
	return createArrayType(block, 'Boolean List', previousFrame);
};

const create_list_colour_block_block = (block: Block, previousFrame?: ArduinoFrame): ArduinoFrame[] => {
	return createArrayType(block, 'Colour List', previousFrame);
};

const set_number_list_block_block = (block: Block, previousFrame?: ArduinoFrame):ArduinoFrame[] => {
	return setArrayValue(block,  'Number', previousFrame);
};

const set_string_list_block_block = (block: Block, previousFrame?: ArduinoFrame):ArduinoFrame[] => {
	return setArrayValue(block,  'String', previousFrame);
};

const set_boolean_list_block_block = (block: Block, previousFrame?: ArduinoFrame): ArduinoFrame[] => {
	return setArrayValue(block,  'Boolean', previousFrame);
};

const set_colour_list_block_block = (block: Block, previousFrame?: ArduinoFrame): ArduinoFrame[] => {
	return setArrayValue(block,  'Colour', previousFrame);
};

const get_number_from_list_block = (block: Block, previousFrame?: ArduinoFrame): number|undefined => {
	return getArrayValue(block,  0, 'Number', previousFrame);
};

const get_string_from_list_block = (block: Block, previousFrame?: ArduinoFrame): string|undefined => {
	return getArrayValue(block,  '', 'String', previousFrame);
};

const get_boolean_from_list_block = (block: Block, previousFrame?: ArduinoFrame): boolean|undefined => {
	return getArrayValue(block,  true, 'Boolean', previousFrame);
};

const get_colour_from_list_block = (block: Block, previousFrame?: ArduinoFrame): Color|undefined => {
	return getArrayValue(block,  {red: 255, green: 0, blue: 0}, 'Colour', previousFrame);
};

const getArrayValue = (block: Block, defaultValue: any, type: string, previousFrame?: ArduinoFrame) => {
	let variableName = getVariableName(block);

	let position = parseInt(
		getInputValue(
			block,
			'POSITION',
			0,
			previousFrame
		).toString()
	);

	position = position > 0 ? position - 1 : 0;

	let array = previousFrame.variables[variableName].value;

	if (type === 'Boolean' && array[position] === false) {
		return false;
	}

	return array[position] || defaultValue;

};

const setArrayValue = (block: Block, type: string, previousFrame?: ArduinoFrame) => {
	const frame = previousFrame ?
		previousFrame.makeCopy(block.id) :
		ArduinoFrame.makeEmptyFrame(block.id);

	let position = parseInt(
		getInputValue(
			block,
			'POSITION',
			0,
			previousFrame
		).toString()
	);

	position = position > 0 ? position - 1 : 0;

	const value = getInputValue(
		block,
		'VALUE',
		0,
		previousFrame
	);

	const variableName = getVariableName(block);

	frame.variables[variableName].value[position] = parseArrayInsertValue(value, type);

	return [frame];
};

const parseArrayInsertValue = (value: any, type: string) => {
	switch (type) {
		case 'Number':
			return parseFloat(value);
		case 'String':
			return value.toString();
		case 'Boolean':
			return value === true;
		case 'Colour':
			return value;
	}
};

const createArrayType = (block: Block, type: string, previousFrame?: ArduinoFrame) =>  {

	const variableName = getVariableName(block);

	let variables = previousFrame ? previousFrame.variables : {};

	variables[variableName] =
		{
			value: [],
			type: type,
			name: variableName
		};

	const components = previousFrame ? previousFrame.components : [];

	const frame = new ArduinoFrame(block.id, variables, components, new EmptyCommand());

	return [frame];
};

export {
	get_colour_from_list_block,
	get_boolean_from_list_block,
	get_number_from_list_block,
	get_string_from_list_block,

	set_boolean_list_block_block,
	set_colour_list_block_block,
	set_number_list_block_block,
	set_string_list_block_block,

	create_list_boolean_block_block,
	create_list_colour_block_block,
	create_list_number_block_block,
	create_list_string_block_block
};

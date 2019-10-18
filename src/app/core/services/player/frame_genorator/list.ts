/**
 * Created by noahglaser on 2/19/19.
 */
import { Block } from 'blockly';
import { ArduinoFrame } from "../arduino/arduino_frame";
import { getVariableName } from "./variables";
import { getInputValue } from "../frame/blockly_helper";
import { Color } from "./color";
import { FrameLocation } from "../frame/frame";
import { ArduinoState } from "../arduino/state/arduino.state";


const create_list_number_block_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame): ArduinoFrame[] => {
	return createArrayType(block, 'Number List', frameLocation, previousFrame);
};

const create_list_string_block_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame):ArduinoFrame[] => {
	return createArrayType(block, 'String List',frameLocation, previousFrame);
};

const create_list_boolean_block_block = (block: Block,frameLocation: FrameLocation, previousFrame?: ArduinoFrame):ArduinoFrame[] => {
	return createArrayType(block, 'Boolean List',frameLocation, previousFrame);
};

const create_list_colour_block_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame): ArduinoFrame[] => {
	return createArrayType(block, 'Colour List',frameLocation, previousFrame);
};

const set_number_list_block_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame):ArduinoFrame[] => {
	return setArrayValue(block,  'Number',frameLocation, previousFrame);
};

const set_string_list_block_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame):ArduinoFrame[] => {
	return setArrayValue(block,  'String', frameLocation, previousFrame);
};

const set_boolean_list_block_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame): ArduinoFrame[] => {
	return setArrayValue(block,  'Boolean',frameLocation, previousFrame);
};

const set_colour_list_block_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame): ArduinoFrame[] => {
	return setArrayValue(block,  'Colour', frameLocation, previousFrame);
};

const get_number_from_list_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame): number|undefined => {
	return getArrayValue(block,  0, 'Number', frameLocation, previousFrame);
};

const get_string_from_list_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame): string|undefined => {
	return getArrayValue(block,  '', 'String',frameLocation, previousFrame);
};

const get_boolean_from_list_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame): boolean|undefined => {
	return getArrayValue(block,  true, 'Boolean',frameLocation, previousFrame);
};

const get_colour_from_list_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame): Color|undefined => {
	return getArrayValue(block,  {red: 255, green: 0, blue: 0}, 'Colour',frameLocation, previousFrame);
};

const getArrayValue = (block: Block, defaultValue: any, type: string,frameLocation: FrameLocation, previousFrame?: ArduinoFrame) => {
	let variableName = getVariableName(block);

	let position = parseInt(
		getInputValue(
			block,
			'POSITION',
			0,
			frameLocation,
			previousFrame
		).toString()
	);

	position = position > 0 ? position - 1 : 0;

	let array = previousFrame.state.variables[variableName].value;

	if (type === 'Boolean' && array[position] === false) {
		return false;
	}

	return array[position] || defaultValue;

};

const setArrayValue = (block: Block, type: string, frameLocation: FrameLocation,  previousFrame?: ArduinoFrame) => {
	const frame = previousFrame ?
		previousFrame.makeCopy(block.id, frameLocation) as ArduinoFrame :
		ArduinoFrame.makeEmptyFrame(block.id, frameLocation);

	let position = parseInt(
		getInputValue(
			block,
			'POSITION',
			0,
			frameLocation,
			previousFrame
		).toString()
	);

	position = position > 0 ? position - 1 : 0;

	const value = getInputValue(
		block,
		'VALUE',
		0,
		frameLocation,
		previousFrame
	);

	const { variables } = frame.state;

	const variableName = getVariableName(block);

	variables[variableName].value[position] = parseArrayInsertValue(value, type);


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

const createArrayType = (block: Block, type: string, frameLocation: FrameLocation,  previousFrame?: ArduinoFrame) =>  {

	const state = previousFrame ? previousFrame.copyState() : ArduinoState.makeEmptyState();

	const variableName = getVariableName(block);

	const { variables } = state;

	variables[variableName] =
		{
			value: [],
			type: type,
			name: variableName
		};


	const frame = new ArduinoFrame(block.id, state, frameLocation);

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

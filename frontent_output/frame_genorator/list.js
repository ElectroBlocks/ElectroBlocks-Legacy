"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arduino_frame_1 = require("../arduino/arduino_frame");
const variables_1 = require("./variables");
const blockly_helper_1 = require("../frame/blockly_helper");
const command_1 = require("../frame/command");
const create_list_number_block_block = (block, frameLocation, previousFrame) => {
    return createArrayType(block, 'Number List', frameLocation, previousFrame);
};
exports.create_list_number_block_block = create_list_number_block_block;
const create_list_string_block_block = (block, frameLocation, previousFrame) => {
    return createArrayType(block, 'String List', frameLocation, previousFrame);
};
exports.create_list_string_block_block = create_list_string_block_block;
const create_list_boolean_block_block = (block, frameLocation, previousFrame) => {
    return createArrayType(block, 'Boolean List', frameLocation, previousFrame);
};
exports.create_list_boolean_block_block = create_list_boolean_block_block;
const create_list_colour_block_block = (block, frameLocation, previousFrame) => {
    return createArrayType(block, 'Colour List', frameLocation, previousFrame);
};
exports.create_list_colour_block_block = create_list_colour_block_block;
const set_number_list_block_block = (block, frameLocation, previousFrame) => {
    return setArrayValue(block, 'Number', frameLocation, previousFrame);
};
exports.set_number_list_block_block = set_number_list_block_block;
const set_string_list_block_block = (block, frameLocation, previousFrame) => {
    return setArrayValue(block, 'String', frameLocation, previousFrame);
};
exports.set_string_list_block_block = set_string_list_block_block;
const set_boolean_list_block_block = (block, frameLocation, previousFrame) => {
    return setArrayValue(block, 'Boolean', frameLocation, previousFrame);
};
exports.set_boolean_list_block_block = set_boolean_list_block_block;
const set_colour_list_block_block = (block, frameLocation, previousFrame) => {
    return setArrayValue(block, 'Colour', frameLocation, previousFrame);
};
exports.set_colour_list_block_block = set_colour_list_block_block;
const get_number_from_list_block = (block, previousFrame) => {
    return getArrayValue(block, 0, 'Number', previousFrame);
};
exports.get_number_from_list_block = get_number_from_list_block;
const get_string_from_list_block = (block, previousFrame) => {
    return getArrayValue(block, '', 'String', previousFrame);
};
exports.get_string_from_list_block = get_string_from_list_block;
const get_boolean_from_list_block = (block, previousFrame) => {
    return getArrayValue(block, true, 'Boolean', previousFrame);
};
exports.get_boolean_from_list_block = get_boolean_from_list_block;
const get_colour_from_list_block = (block, previousFrame) => {
    return getArrayValue(block, { red: 255, green: 0, blue: 0 }, 'Colour', previousFrame);
};
exports.get_colour_from_list_block = get_colour_from_list_block;
const getArrayValue = (block, defaultValue, type, previousFrame) => {
    let variableName = variables_1.getVariableName(block);
    let position = parseInt(blockly_helper_1.getInputValue(block, 'POSITION', 0, previousFrame).toString());
    position = position > 0 ? position - 1 : 0;
    let array = previousFrame.variables[variableName].value;
    if (type === 'Boolean' && array[position] === false) {
        return false;
    }
    return array[position] || defaultValue;
};
const setArrayValue = (block, type, frameLocation, previousFrame) => {
    const frame = previousFrame ?
        previousFrame.makeCopy(block.id) :
        arduino_frame_1.ArduinoFrame.makeEmptyFrame(block.id, frameLocation);
    let position = parseInt(blockly_helper_1.getInputValue(block, 'POSITION', 0, previousFrame).toString());
    position = position > 0 ? position - 1 : 0;
    const value = blockly_helper_1.getInputValue(block, 'VALUE', 0, previousFrame);
    const variableName = variables_1.getVariableName(block);
    frame.variables[variableName].value[position] = parseArrayInsertValue(value, type);
    return [frame];
};
const parseArrayInsertValue = (value, type) => {
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
const createArrayType = (block, type, frameLocation, previousFrame) => {
    const variableName = variables_1.getVariableName(block);
    let variables = previousFrame ? previousFrame.variables : {};
    variables[variableName] =
        {
            value: [],
            type: type,
            name: variableName
        };
    const components = previousFrame ? previousFrame.components : [];
    const frame = new arduino_frame_1.ArduinoFrame(block.id, variables, components, new command_1.EmptyCommand(), frameLocation);
    return [frame];
};
//# sourceMappingURL=list.js.map
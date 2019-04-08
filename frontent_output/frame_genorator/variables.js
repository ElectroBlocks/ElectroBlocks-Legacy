"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arduino_frame_1 = require("../arduino/arduino_frame");
const block_1 = require("../frame/block");
const blockly_helper_1 = require("../frame/blockly_helper");
const command_1 = require("../frame/command");
const variables_set_number_block = (block, previousFrame) => {
    return setVariable(block, 'Number', 0, previousFrame);
};
exports.variables_set_number_block = variables_set_number_block;
const variables_get_number_block = (block, previousFrame) => {
    return parseInt(getVariable(block, 0, previousFrame));
};
exports.variables_get_number_block = variables_get_number_block;
const variables_set_colour_block = (block, previousFrame) => {
    return setVariable(block, 'Colour', { red: 0, green: 0, blue: 0 }, previousFrame);
};
exports.variables_set_colour_block = variables_set_colour_block;
const variables_get_colour_block = (block, previousFrame) => {
    return getVariable(block, { red: 0, green: 0, blue: 0 }, previousFrame);
};
exports.variables_get_colour_block = variables_get_colour_block;
const variables_set_string_block = (block, previousFrame) => {
    return setVariable(block, 'String', '', previousFrame);
};
exports.variables_set_string_block = variables_set_string_block;
const variables_get_string_block = (block, previousFrame) => {
    return getVariable(block, '', previousFrame);
};
exports.variables_get_string_block = variables_get_string_block;
const variables_set_boolean_block = (block, previousFrame) => {
    return setVariable(block, 'Boolean', true, previousFrame);
};
exports.variables_set_boolean_block = variables_set_boolean_block;
const variables_get_boolean_block = (block, previousFrame) => {
    return getVariable(block, true, previousFrame);
};
exports.variables_get_boolean_block = variables_get_boolean_block;
const getVariable = (block, defaultValue, previousFrame) => {
    let variableName = getVariableName(block);
    if (!previousFrame) {
        return defaultValue;
    }
    if (!previousFrame.variables[variableName]) {
        return defaultValue;
    }
    let value = previousFrame.variables[variableName].value;
    if (isBooleanVariableReturningValue(getVariableType(block), value)) {
        return value;
    }
    return value || defaultValue;
};
const setVariable = (block, type, defaultValue, previousFrame) => {
    previousFrame = previousFrame || arduino_frame_1.ArduinoFrame.makeEmptyFrame(block.id);
    let variableName = getVariableName(block);
    let value = blockly_helper_1.getInputValue(block, 'VALUE', defaultValue, previousFrame);
    if (!isBooleanVariableReturningValue(type, value)) {
        value = value || defaultValue;
    }
    let variableList = previousFrame.variables;
    variableList[variableName] = {
        name: variableName,
        type,
        value
    };
    return [new arduino_frame_1.ArduinoFrame(block.id, variableList, previousFrame.components, new command_1.EmptyCommand())];
};
const isBooleanVariableReturningValue = (type, value) => {
    if (type != 'Boolean') {
        return false;
    }
    return value === false;
};
exports.isBooleanVariableReturningValue = isBooleanVariableReturningValue;
const getVariableName = (block) => {
    return block_1.get_blockly().mainWorkspace.getVariableById(block.getFieldValue('VAR')).name;
};
exports.getVariableName = getVariableName;
const getVariableType = (block) => {
    return block_1.get_blockly().mainWorkspace.getVariableById(block.getFieldValue('VAR')).type;
};
exports.getVariableType = getVariableType;
//# sourceMappingURL=variables.js.map
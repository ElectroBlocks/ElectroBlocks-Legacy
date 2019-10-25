import { ArduinoFrame } from '../arduino/arduino_frame';
import { Block } from 'blockly';
import * as Blockly from 'blockly/core';
import { getInputValue } from '../frame/blockly_helper';
import { FrameLocation } from '../frame/frame';
import { ArduinoState } from '../arduino/state/arduino.state';


/**
 * Returns the frame with the variable set for number type
 * If no block is attached it uses 0
 */
const variables_set_number_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame) => {
    return setVariable(block, 'Number', 0, frameLocation, previousFrame);
};

/**
 * Returns the number in the variable,
 * If not available it uses 0
 */
const variables_get_number_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame) =>  {
   return parseFloat(getVariable(block, 0, previousFrame));
};

/**
 * Returns the frame with the variable set for colour type
 * If no block is attached it uses 0 for the rgb values
 */
const variables_set_colour_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame) => {
    return setVariable(block, 'Colour', {red: 0, green: 0, blue: 0}, frameLocation, previousFrame);
};

/**
 * Returns the colour in the variable, if not available it used 0 for the rgb values as the default
 */
const variables_get_colour_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame) => {
    return getVariable(block, {red: 0, green: 0, blue: 0}, previousFrame);
};

/**
 * Returns the frame with the variable set for string type
 * If no block is attached it uses ''
 */
const variables_set_string_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame) => {
    return setVariable(block, 'String', '', frameLocation, previousFrame);
};

/**
 * Returns the colour in the variable,
 * If not available it uses ''
 */
const variables_get_string_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame) => {
    return getVariable(block, '', previousFrame);
};

/**
 * Returns the frame with the variable set for boolean type
 * If no block is attached it uses true
 */
const variables_set_boolean_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame) => {
    return setVariable(block, 'Boolean', true, frameLocation, previousFrame);
};

/**
 * Returns the colour in the variable,
 * If not available it uses true
 */
const variables_get_boolean_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame) => {
    return getVariable(block, true, previousFrame);
};


/**
 * Returns the value of the variable in the previous frame.
 * If not available it returns default value

 */
const getVariable = (block: Block,  defaultValue: any, previousFrame?: ArduinoFrame) => {

    const variableName = getVariableName(block);

    if (!previousFrame) {
        return defaultValue;
    }

    if (!previousFrame.state.variables[variableName]) {
        return defaultValue;
    }

    const value = previousFrame.state.variables[variableName].value;

    if (isBooleanVariableReturningValue(getVariableType(block), value)) {
        return value;
    }

    return  value || defaultValue;
};

/**
 * Returns the new frame attached with the new value of the variable
 * The default value is used if no value for the variable can be found
 */
const setVariable = (block: Block, type: string, defaultValue: any, frameLocation: FrameLocation, previousFrame?: ArduinoFrame) => {

    const state = previousFrame ? previousFrame.copyState() : ArduinoState.makeEmptyState();

    const variableName = getVariableName(block);


    let value = getInputValue(block, 'VALUE', defaultValue, frameLocation, previousFrame);

    // If the type of variable is boolean we want it to be able to return false
    if (!isBooleanVariableReturningValue(type, value)) {
        value = value || defaultValue;
    }

    state.variables[variableName] = {
        name: variableName,
        type,
        value
    };


    return [new ArduinoFrame(block.id, state, frameLocation)];
};

/**
 * Returns true if we are dealing with a boolean variable that returns false
 */
const isBooleanVariableReturningValue = (type: string, value: any) => {
    if (type !== 'Boolean') {
        return false;
    }

    return value === false;
};

/**
 * Gets the variable's name used in the block
 */
const  getVariableName = (block: Block) => {
    return Blockly.mainWorkspace.getVariableById(block.getFieldValue('VAR')).name;
};

/**
 * Returns the variables type as string
 */
const getVariableType = (block: Block) => {
    return Blockly.mainWorkspace.getVariableById(block.getFieldValue('VAR')).type;
};

export {
    variables_set_boolean_block,
    variables_set_string_block,
    variables_set_colour_block,
    variables_set_number_block,

    variables_get_boolean_block,
    variables_get_string_block,
    variables_get_colour_block,
    variables_get_number_block,

    getVariableName,
    getVariableType,
    isBooleanVariableReturningValue
};

/**
 * Returns the frame with the variable set for number type
 * If no block is attached it uses 0
 *
 * @param block
 * @param previousFrame
 * @return {*|{variables}}
 */
function variables_set_number_block(block, previousFrame) {
    return setVariable(block, 'Number', previousFrame, 0);
}

/**
 * Returns the number in the variable,
 * If not available it uses 0
 *
 * @param block
 * @param previousFrame
 * @return {Number}
 */
function variables_get_number_block(block, previousFrame) {
   return parseInt(getVariable(block, previousFrame, 0));
}

/**
 * Returns the frame with the variable set for colour type
 * If no block is attached it uses 0 for the rgb values
 *
 * @param block
 * @param previousFrame
 * @return {*|{variables}}
 */
function variables_set_colour_block(block, previousFrame) {
    return setVariable(block, 'Colour', previousFrame, {r: 0, g: 0, b: 0});
}

/**
 * Returns the colour in the variable, if not available it used 0 for the rgb values as the default
 *
 * @param block
 * @param previousFrame
 * @return {Number}
 */
function variables_get_colour_block(block, previousFrame) {
    return getVariable(block, previousFrame, {r: 0, g: 0, b: 0})
}

/**
 * Returns the frame with the variable set for string type
 * If no block is attached it uses ''
 *
 * @param block
 * @param previousFrame
 * @return {Number}
 */
function variables_set_string_block(block, previousFrame) {
    return setVariable(block, 'String', previousFrame, '');
}

/**
 * Returns the colour in the variable,
 * If not available it uses ''
 *
 * @param block
 * @param previousFrame
 * @return {*|{variables}}
 */
function variables_get_string_block(block, previousFrame) {
    return getVariable(block, previousFrame, '');
}

/**
 * Returns the frame with the variable set for boolean type
 * If no block is attached it uses true
 *
 * @param block
 * @param previousFrame
 * @return {*|{variables}}
 */
function variables_set_boolean_block(block, previousFrame) {
    return setVariable(block, 'Boolean', previousFrame, true);
}

/**
 * Returns the colour in the variable,
 * If not available it uses true
 *
 * @param block
 * @param previousFrame
 * @return {*}
 */
function variables_get_boolean_block(block, previousFrame) {
    return getVariable(block, previousFrame, true);
}


/**
 * Returns the value of the variable in the previous frame.
 * If not available it returns default value
 *
 * @param block
 * @param previousFrame
 * @param defaultValue
 * @return {*}
 */
function getVariable(block, previousFrame, defaultValue) {

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

    return  value || defaultValue;
}

/**
 * Returns the new frame attached with the new value of the variable
 * The default value is used if no value for the variable can be found
 *
 * @param block
 * @param type
 * @param previousFrame
 * @param defaultValue
 * @return {*|{variables}}
 */
function setVariable(block, type, previousFrame, defaultValue) {
    let frame = createNewFrame(block, previousFrame);

    let variableName = getVariableName(block);

    let value = getInputValue(block, 'VALUE', previousFrame, defaultValue);

    // If the type of variable is boolean we want it to be able to return false
    if (!isBooleanVariableReturningValue(type, value)) {
        value = value || defaultValue;
    }

    frame.variables[variableName] =
        {
            value,
            type,
            name: variableName
        };

    return [frame];
}

/**
 * Returns true if we are dealing with a boolean variable that returns false
 *
 *
 * @param type
 * @param value
 * @return {boolean}
 */
function isBooleanVariableReturningValue(type, value) {
    if (type != 'Boolean') {
        return false;
    }

    return value === false;
}

/**
 * Gets the variable's name used in the block
 *
 * @param block
 * @return {*|string}
 */
function getVariableName(block) {
    return Blockly.mainWorkspace.getVariableById(block.getFieldValue('VAR')).name;
}

/**
 * Returns the variables type as string
 *
 * @param block
 * @return {*|string}
 */
function getVariableType(block) {
    return Blockly.mainWorkspace.getVariableById(block.getFieldValue('VAR')).type;
}





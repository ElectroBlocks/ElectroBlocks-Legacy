/**
 * Created by noahglaser on 2/19/19.
 */


function create_list_number_block_block(block, previousFrame) {
    return createArrayType(block, 'Number List', previousFrame);
}

function create_list_string_block_block(block, previousFrame) {
    return createArrayType(block, 'String List', previousFrame);
}

function create_list_boolean_block_block(block, previousFrame) {
    return createArrayType(block, 'Boolean List', previousFrame);
}

function create_list_colour_block_block(block, previousFrame) {
    return createArrayType(block, 'Colour List', previousFrame);
}


function set_number_list_block_block(block, previousFrame) {
    return setArrayValue(block, previousFrame, 'Number');
}

function set_string_list_block_block(block, previousFrame) {
    return setArrayValue(block, previousFrame, 'String');
}

function set_boolean_list_block_block(block, previousFrame) {
    return setArrayValue(block, previousFrame, 'Boolean');
}

function set_colour_list_block_block(block, previousFrame) {
    return setArrayValue(block, previousFrame, 'Colour');
}

function get_number_from_list_block(block, previousFrame) {
    return getArrayValue(block, previousFrame, 0, 'Number');
}

function get_string_from_list_block(block, previousFrame) {
    return getArrayValue(block, previousFrame, '', 'String');
}

function get_boolean_from_list_block(block, previousFrame) {
    return getArrayValue(block, previousFrame, true, 'Boolean');
}

function get_colour_from_list_block(block, previousFrame) {
    return getArrayValue(block, previousFrame, {r: 255, g: 0, b: 0}, 'Colour');
}

function getArrayValue(block, previousFrame, defaultValue, type) {
    let variableName = getVariableName(block);

    let position = parseInt(getInputValue(block, 'POSITION', previousFrame, 0));

    position = position > 0 ? position - 1 : 0;

    let array = previousFrame.variables[variableName].value;

    if (type == 'Boolean' && array[position] === false) {
        return false;
    }

    return array[position] || defaultValue;

}

function setArrayValue(block, previousFrame, type) {
    let frame = previousFrame || newFrame();
    frame.blockId = block.id;

    let position = parseInt(getInputValue(block, 'POSITION', previousFrame, 0));

    position = position > 0 ? position - 1 : 0;

    let value = getInputValue(block, 'VALUE', previousFrame, 0);

    let variableName = getVariableName(block);

    frame.variables[variableName].value[position] = parseArrayInsertValue(value, type);

    return [frame];
}

function parseArrayInsertValue(value, type) {
    switch (type) {
        case 'Number':
            return parseFloat(value);
        case 'String':
            return value.toString();
        case 'Boolean':
            return value == true;
        case 'Colour':
            return value;
    }
}

function createArrayType(block, type, previousFrame) {
    let frame = previousFrame || newFrame();
    frame.blockId = block.id;

    let variableName = getVariableName(block);

    frame.variables[variableName] =
        {
            value: [],
            type: type,
            name: variableName
        };

    return [frame];
}
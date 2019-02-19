/**
 * Created by noahglaser on 2/16/19.
 */

function text_block(block, previousFrame) {
    return block.getFieldValue('TEXT');
}


/**
 * Combines all the string attached to the join text block together
 *
 *
 * @param block
 * @param previousFrame
 * @return {string}
 */
function text_join_block(block, previousFrame) {
    let inputLength = block.inputList.length;
    let returnString = '';

    for (let i = 0; i < inputLength; i += 1) {
        returnString += getInputValue(block, 'ADD' + i, previousFrame, '');
    }

    return returnString;
}

/**
 * This gets the text length from a string or string variable
 *
 *
 * @param block
 * @param previousFrame
 */
function text_length_block(block, previousFrame) {
    return getInputValue(block, 'VALUE', previousFrame, '').length;
}

/**
 * Returns true if the string input is empty
 *
 * @param block
 * @param previousFrame
 * @return {boolean}
 */
function text_isEmpty_block(block, previousFrame) {
    return getInputValue(block, 'VALUE', previousFrame, '').length == 0;
}

/**
 * Takes a number and converts to a string.
 *
 * @param block
 * @param previousFrame
 * @return {string}
 */
function number_to_string_block(block, previousFrame) {
    let number = getInputValue(block, 'NUMBER', previousFrame, 0);
    let precision = parseInt(block.getFieldValue('PRECISION'));

    return parseFloat(number).toFixed(precision);
}

/**
 * Turns a string into an array and get section of it if available
 *
 *
 * @param block
 * @param previousFrame
 * @return {*|string}
 */
function parse_string_block_block(block, previousFrame) {
    let text = getInputValue(block, 'VALUE',previousFrame, '');
    let delimiter = block.getFieldValue('DELIMITER');
    let position = getInputValue(block, 'POSITION', previousFrame, 1);

    position = parseInt(position);
    position = position >= 1 ? position - 1 : 0;

    let splitTextArray = text.split(delimiter);

    return splitTextArray[position] || '';
}


/**
 * Upper Cases or Lowers Cases Text
 *
 * @param block
 * @param previousFrame
 */
function text_changeCase_block(block, previousFrame) {
    let op = block.getFieldValue('CASE');

    let string = getInputValue(block, 'TEXT', previousFrame, '').toString();

    return op == 'UPPERCASE' ? string.toUpperCase() : string.toLowerCase();
}
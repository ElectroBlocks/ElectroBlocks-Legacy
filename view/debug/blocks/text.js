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
 *
 *
 *
 * @param block
 * @param previousFrame
 */
function text_length_block(block, previousFrame) {
    return getInputValue(block, 'VALUE', previousFrame, '').length;
}
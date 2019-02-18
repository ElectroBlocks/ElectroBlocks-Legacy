/**
 * Created by noahglaser on 2/16/19.
 */

/**
 * Returns true or false based on the drop down of the block.
 *
 * @param block
 * @param previousFrame
 * @return {boolean}
 */
function logic_boolean_block(block, previousFrame) {
    return block.getFieldValue('BOOL') == 'TRUE';
}

/**
 * Compares the value of the 2 blocks and returns true or false
 *
 *
 * @param block
 * @param previousFrame
 * @return {boolean}
 */
function logic_compare_block(block, previousFrame) {
    let op = block.getFieldValue('OP');

    let aValue = getInputValue(block, 'A', previousFrame, true);
    let bValue = getInputValue(block, 'B', previousFrame, false);

    switch (op) {
        case 'EQ':
            return aValue == bValue;
        case 'NEQ':
            return aValue != bValue;
        case 'LT':
            return aValue < bValue;
        case 'LTE':
            return aValue <= bValue;
        case 'GT':
            return aValue > bValue;
        case 'GTE':
            return aValue >= bValue;
    }

    throw Error('No Valid Comparison Operation Found');
}

/**
 * Generates the frames for the if block
 *
 * @param block
 * @param previousFrame
 */
function control_if_block(block, previousFrame) {
   return generateIfElseFrames(block, previousFrame, false);
}

/**
 * Generates the frames for the if else block
 *
 * @param block
 * @param previousFrame
 * @return {*}
 */
function controls_ifelse_block(block, previousFrame) {
    return generateIfElseFrames(block, previousFrame, true);
}

/**
 * Compares to booleans with a logic operator and returns true or false
 *
 *
 * @param block
 * @param previousFrame
 * @return {*}
 */
function logic_operation_block(block, previousFrame) {
    let op = block.getFieldValue('OP');

    let aValue = getInputValue(block, 'A', previousFrame, true);
    let bValue = getInputValue(block, 'B', previousFrame, false);

    switch (op) {
        case 'AND':
            return aValue && bValue;
        case 'OR':
            return aValue || bValue;
    }

    throw Error('No Valid Logic Operation Found');
}

/**
 * Returns the invert boolean value turns true to false and false to true.
 *
 * @param block
 * @param previousFrame
 * @return {boolean}
 */
function logic_negate_block(block, previousFrame) {
    let valueToInvert = getInputValue(block, 'BOOL', previousFrame, true);

    return !valueToInvert;
}

/**
 * Generates frames for both the if and else blocks
 *
 *
 * @param block
 * @param previousFrame
 * @param hasElse
 * @return {*}
 */
function generateIfElseFrames(block, previousFrame, hasElse) {

    let ifFrame = previousFrame || newFrame();
    ifFrame.blockId = block.id;

    let executeBlocksInsideIf = getInputValue(block, 'IF0', previousFrame, true);

    if (!executeBlocksInsideIfElse(executeBlocksInsideIf, hasElse)) {
        return [ifFrame];
    }

    // DO0 is for the if code that is executed if the block is true
    // ELSE is for if the ELSE block is true
    let inputStatementName = executeBlocksInsideIf ? 'DO0' : 'ELSE';

    let frames = generateFrameForInputStatement(block, inputStatementName, ifFrame);
    frames.unshift(ifFrame);

    return frames;

}

/**
 * Returns true if blocks inside the if else should be executed
 *
 *
 * @param executeBlocksInsideIf
 * @param hasElse
 * @return {*}
 */
function executeBlocksInsideIfElse(executeBlocksInsideIf, hasElse) {
    return executeBlocksInsideIf || hasElse;
}
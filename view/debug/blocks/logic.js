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
function logic_boolean(block, previousFrame) {
    return block.getFieldValue('BOOL') == 'TRUE';
}
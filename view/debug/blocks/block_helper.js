/**
 * Created by noahglaser on 2/14/19.
 */


/**
 *
 * Calculates the input blocks value
 *
 * @param parentBlock
 * @param inputName
 * @param previousFrame
 * @param defaultValue
 */
function getInputValue(parentBlock, inputName, previousFrame, defaultValue) {

    if (!parentBlock.getInput(inputName).connection.targetConnection) {
        return defaultValue;
    }

    let block = parentBlock
                    .getInput(inputName)
                    .connection
                    .targetConnection
                    .getSourceBlock();

    if (!block) {
        return defaultValue;
    }

    return functionList[block.type](block, previousFrame) || defaultValue;
}
/**
 * Gets the value of the block attached to it
 *
 * @param parentBlock
 * @param inputName
 * @param previousFrame
 * @param noBlockAttachedDefaultValue Only used if no block is attached to it
 */
function getInputValue(parentBlock, inputName, previousFrame, noBlockAttachedDefaultValue) {

    if (!parentBlock.getInput(inputName).connection.targetConnection) {
        return noBlockAttachedDefaultValue;
    }

    let block = parentBlock
                    .getInput(inputName)
                    .connection
                    .targetConnection
                    .getSourceBlock();

    if (!block) {
        return noBlockAttachedDefaultValue;
    }

    // This means that the default value will be now come from the block definition
    // Not from the block attached to it.
    return functionList[block.type](block, previousFrame);
}
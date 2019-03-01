

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
    return functionList[block.type + '_block'](block, previousFrame);
}

/**
 * This will take a statement input where blocks are being stored and gather all the blocks
 * under it and generate frames based on those blocks
 *
 * @param block the actual block
 * @param statement_name the input name where all the blocks are being stored
 * @param previousFrame The previous frame before things are generated
 * @return {*}
 */
function generateFrameForInputStatement(block, statement_name, previousFrame = null) {

    let blockList = [];
    let frames = [];
    let topBlock = block.getInputTargetBlock(statement_name);

    if (!topBlock) {

        return [];
    }

    do {
        blockList.push(topBlock);

        if (!topBlock.nextConnection) {
            topBlock = null;
            break;
        }

        topBlock = topBlock.nextConnection.targetBlock();
    } while(topBlock);

    for (let i = 0; i < blockList.length; i += 1) {

        let block = blockList[i];
        if (block.disabled) {
            continue;
        }
        let currentFrames = functionList[block.type + '_block'](block, previousFrame);

        currentFrames.forEach(currentFrame => {
            frames.push(currentFrame);
            previousFrame = copyFrame(currentFrame);
        });
    }

    return frames;
}

function newFrame() {
    return {
        variables: {},
        blockId: null,
        pins: {}
    };
}

function copyFrame(frame) {

    let newVariablesList = {};

    let pins = {};

    Object
        .keys(frame.variables)
        .forEach(function(key) {
            newVariablesList[key] = {};
            newVariablesList[key].value = copyValue(frame.variables[key].value);
            newVariablesList[key].name = frame.variables[key].name;
            newVariablesList[key].type = frame.variables[key].type;
        });

    Object
        .keys(frame.pins)
        .forEach(function(key) {
            pins[key] = {};
            pins[key].pin = frame.pins[key].pin;
            pins[key].state = frame.pins[key].state;
            pins[key].type = frame.pins[key].type;
        });

    return {
        variables: newVariablesList,
        blockId: frame.hasOwnProperty('blockId') ? frame.blockId : null,
        pins,
        move: {}
    }
}

function copyValue(value) {
    if (!Array.isArray(value)) {
        return value;
    }

    let array = [];
    value.forEach((value, index) => array[index] = value);

    return array;
}

function createNewFrame(block, previousFrame) {
    let frame = previousFrame ? copyFrame(previousFrame) : newFrame();
    frame.blockId = block.id;

    return frame;
}
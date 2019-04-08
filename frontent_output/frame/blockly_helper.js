"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const frame_list_1 = require("./frame_list");
const generateFrameForInputStatement = (block, statement_name, previousFrame) => {
    const blockList = exports.blocksInsideInput(block, statement_name)
        .filter(block => !block.disabled);
    return generateFrames(blockList, previousFrame);
};
exports.generateFrameForInputStatement = generateFrameForInputStatement;
const getInputValue = (parentBlock, inputName, noBlockAttachedDefaultValue, previousFrame) => {
    const block = parentBlock.getInput(inputName).connection.targetBlock();
    if (!block) {
        return noBlockAttachedDefaultValue;
    }
    return frame_list_1.valueGeneratingBlocks[block.type + '_block'](block, previousFrame);
};
exports.getInputValue = getInputValue;
exports.blocksInsideInput = (containerBlock, inputName) => {
    let blockList = [];
    let topBlock = containerBlock.getInputTargetBlock(inputName);
    if (!topBlock) {
        return [];
    }
    do {
        blockList.push(topBlock);
        if (!topBlock.nextConnection) {
            break;
        }
        topBlock = topBlock.nextConnection.targetBlock();
    } while (topBlock);
    return blockList;
};
const generateFrames = (blockList, previousFrame) => {
    let frames = new Array();
    for (let i = 0; i < blockList.length; i += 1) {
        let block = blockList[i];
        let currentFrames = frame_list_1.frameGeneratingBlocks[block.type + '_block'](block, previousFrame);
        frames = frames.concat(currentFrames);
        previousFrame = frames[frames.length - 1];
    }
    return frames;
};
//# sourceMappingURL=blockly_helper.js.map
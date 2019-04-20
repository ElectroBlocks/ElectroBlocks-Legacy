"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_1 = require("./block");
const blockly_helper_1 = require("./blockly_helper");
class InputState {
    constructor() {
        this.blockCalls = {};
    }
    addBlockCall(blockId) {
        if (!this.blockCalls[blockId]) {
            this.blockCalls[blockId] = [];
        }
        const callNumber = this.blockCalls[blockId] ?
            this.blockCalls[blockId].length : 0;
        const value = getBlockValue(blockId, callNumber);
        const blockCall = {
            blockId,
            callNumber,
            value
        };
        this.blockCalls[blockId].push(blockCall);
        return blockCall;
    }
    clearBlockCalls() {
        this.blockCalls = {};
    }
}
const getBlockValue = (blockId, callNumber) => {
    const block = block_1.get_blockly().mainWorkspace.getBlockById(blockId);
    const defaultValue = block.defaultDebugValue;
    const debugBlocks = blockly_helper_1.blocksInsideInput(block, 'FRAME_VALUES');
    if (debugBlocks.length == 0) {
        return defaultValue;
    }
    if (debugBlocks[callNumber]) {
        return debugBlocks[callNumber].getFrameValue();
    }
    const newCallNumber = callNumber % debugBlocks.length;
    return debugBlocks[newCallNumber].getFrameValue();
};
const inputState = new InputState();
exports.inputState = inputState;
//# sourceMappingURL=input_state.js.map
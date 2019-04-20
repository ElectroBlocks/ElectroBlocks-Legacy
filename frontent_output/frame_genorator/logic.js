"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arduino_frame_1 = require("../arduino/arduino_frame");
const blockly_helper_1 = require("../frame/blockly_helper");
const logic_boolean_block = (block, previousFrame) => {
    return block.getFieldValue('BOOL') == 'TRUE';
};
exports.logic_boolean_block = logic_boolean_block;
const logic_compare_block = (block, previousFrame) => {
    let op = block.getFieldValue('OP');
    let aValue = blockly_helper_1.getInputValue(block, 'A', true, previousFrame);
    let bValue = blockly_helper_1.getInputValue(block, 'B', false, previousFrame);
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
};
exports.logic_compare_block = logic_compare_block;
const control_if_block = (block, frameLocation, previousFrame) => {
    return generateIfElseFrames(block, false, frameLocation, previousFrame);
};
exports.control_if_block = control_if_block;
const controls_ifelse_block = (block, frameLocation, previousFrame) => {
    return generateIfElseFrames(block, true, frameLocation, previousFrame);
};
exports.controls_ifelse_block = controls_ifelse_block;
const logic_operation_block = (block, previousFrame) => {
    const op = block.getFieldValue('OP');
    const aValue = blockly_helper_1.getInputValue(block, 'A', true, previousFrame);
    const bValue = blockly_helper_1.getInputValue(block, 'B', false, previousFrame);
    switch (op) {
        case 'AND':
            return aValue && bValue;
        case 'OR':
            return aValue || bValue;
    }
    throw Error('No Valid Logic Operation Found');
};
exports.logic_operation_block = logic_operation_block;
const logic_negate_block = (block, previousFrame) => {
    let valueToInvert = blockly_helper_1.getInputValue(block, 'BOOL', true, previousFrame);
    return !valueToInvert;
};
exports.logic_negate_block = logic_negate_block;
const generateIfElseFrames = (block, hasElse, frameLocation, previousFrame) => {
    let ifFrame = previousFrame ?
        previousFrame.makeCopy(block.id) :
        arduino_frame_1.ArduinoFrame.makeEmptyFrame(block.id, frameLocation);
    let executeBlocksInsideIf = blockly_helper_1.getInputValue(block, 'IF0', true, previousFrame);
    if (!executeBlocksInsideIfElse(executeBlocksInsideIf, hasElse)) {
        return [ifFrame];
    }
    let inputStatementName = executeBlocksInsideIf ? 'DO0' : 'ELSE';
    let frames = blockly_helper_1.generateFrameForInputStatement(block, inputStatementName, frameLocation, ifFrame);
    frames.unshift(ifFrame);
    return frames;
};
const executeBlocksInsideIfElse = (executeBlocksInsideIf, hasElse) => {
    return executeBlocksInsideIf || hasElse;
};
//# sourceMappingURL=logic.js.map
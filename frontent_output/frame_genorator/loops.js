"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arduino_frame_1 = require("../arduino/arduino_frame");
const blockly_helper_1 = require("../frame/blockly_helper");
const variables_1 = require("./variables");
const controls_repeat_ext_block = (block, previousFrame) => {
    const loopFrame = previousFrame ? previousFrame.makeCopy(block.id) :
        arduino_frame_1.ArduinoFrame.makeEmptyFrame(block.id);
    const times = blockly_helper_1.getInputValue(block, 'TIMES', 1, previousFrame);
    if (times <= 0) {
        return [loopFrame];
    }
    let frames = blockly_helper_1.generateFrameForInputStatement(block, 'DO', loopFrame);
    frames.unshift(loopFrame);
    for (let i = 1; i < times; i += 1) {
        previousFrame = frames[frames.length - 1];
        frames = frames
            .concat(blockly_helper_1.generateFrameForInputStatement(block, 'DO', previousFrame));
    }
    return frames;
};
exports.controls_repeat_ext_block = controls_repeat_ext_block;
const controls_for_block = (block, previousFrame) => {
    const start = parseInt(blockly_helper_1.getInputValue(block, 'FROM', 1, previousFrame).toString());
    const to = parseInt(blockly_helper_1.getInputValue(block, 'TO', 1, previousFrame).toString());
    let by = Math.abs(parseInt(blockly_helper_1.getInputValue(block, 'BY', 1, previousFrame).toString()));
    let loopFrame = generateLoopFrame(start, block, previousFrame);
    let frames = blockly_helper_1.generateFrameForInputStatement(block, 'DO', loopFrame);
    frames.unshift(loopFrame);
    if (to === start) {
        return frames;
    }
    by *= to > start ? 1 : -1;
    let index = start + by;
    while (checkLoop(index, to, to > start)) {
        let nextLoopFrame = generateLoopFrame(index, block, previousFrame);
        frames.push(nextLoopFrame);
        frames = frames
            .concat(blockly_helper_1.generateFrameForInputStatement(block, 'DO', nextLoopFrame));
        index += by;
    }
    return frames;
};
exports.controls_for_block = controls_for_block;
const checkLoop = (index, to, isPositive) => {
    if (isPositive) {
        return index <= to;
    }
    return index >= to;
};
const generateLoopFrame = (indexValue, block, previousFrame) => {
    const startFrame = previousFrame ? previousFrame : arduino_frame_1.ArduinoFrame.makeEmptyFrame(block.id);
    const variables = startFrame.variables;
    const indexVariableName = variables_1.getVariableName(block);
    variables[indexVariableName] = {
        type: 'Number',
        value: indexValue,
        name: indexVariableName
    };
    return new arduino_frame_1.ArduinoFrame(block.id, variables, startFrame.components, startFrame.command);
};
//# sourceMappingURL=loops.js.map
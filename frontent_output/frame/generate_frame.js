"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arduino_frame_1 = require("../arduino/arduino_frame");
const frame_list_1 = require("./frame_list");
const blockly_helper_1 = require("./blockly_helper");
const block_1 = require("./block");
exports.generateListOfFrame = (numberOfTimesThroughLoop = 1) => {
    let arduinoBlock = block_1.get_blockly().mainWorkspace.getAllBlocks().filter(function (block) {
        return block.type == 'arduino_start';
    })[0];
    let topBlocks = block_1.get_blockly()
        .mainWorkspace
        .getTopBlocks()
        .filter(block => block.type != 'arduino_start');
    let frames = new Array();
    topBlocks
        .filter(block => !block.disabled)
        .filter(block => block.type != 'procedures_defnoreturn')
        .forEach(block => {
        frame_list_1.frameGeneratingBlocks[block.type + '_block'](block, frames.length == 0 ? null : frames[frames.length - 1])
            .filter(frame => frame instanceof arduino_frame_1.ArduinoFrame)
            .forEach((currentFrame) => frames.push(currentFrame));
    });
    let setupFrames = blockly_helper_1.generateFrameForInputStatement(arduinoBlock, 'setup', frames.length == 0 ? null : frames[frames.length - 1]);
    setupFrames.forEach(currentFrame => frames.push(currentFrame));
    for (let i = 0; i < numberOfTimesThroughLoop; i += 1) {
        let loopFrames = blockly_helper_1.generateFrameForInputStatement(arduinoBlock, 'loop', frames.length == 0 ? null : frames[frames.length - 1]);
        loopFrames.forEach(currentFrame => frames.push(currentFrame));
    }
    console.log(frames, 'Arduino Frames Generated');
    return frames;
};
//# sourceMappingURL=generate_frame.js.map
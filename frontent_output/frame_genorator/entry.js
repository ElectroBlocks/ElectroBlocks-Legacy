"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const frame_list_1 = require("../frame/frame_list");
const blockly_helper_1 = require("../frame/blockly_helper");
const continueBtn = document.getElementById('continue-btn');
const generateListOfFrame = () => {
    let arduinoBlock = Blockly.mainWorkspace.getAllBlocks().filter(function (block) {
        return block.type == 'arduino_start';
    })[0];
    let topBlocks = Blockly
        .mainWorkspace
        .getTopBlocks()
        .filter(block => block.type != 'arduino_start');
    let frames = new Array();
    topBlocks
        .filter(block => block.type != 'procedures_defnoreturn')
        .forEach(block => {
        frame_list_1.frameGeneratingBlocks[block.type + '_block'](block, frames.length == 0 ? null : frames[frames.length - 1])
            .forEach(currentFrame => frames.push(currentFrame));
    });
    let setupFrames = blockly_helper_1.generateFrameForInputStatement(arduinoBlock, 'setup', frames.length == 0 ? null : frames[frames.length - 1]);
    setupFrames.forEach(currentFrame => frames.push(currentFrame));
    console.log(setupFrames);
};
continueBtn.addEventListener('click', () => {
    generateListOfFrame();
});
//# sourceMappingURL=entry.js.map
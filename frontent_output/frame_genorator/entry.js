"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const frame_list_1 = require("../frame/frame_list");
const blockly_helper_1 = require("../frame/blockly_helper");
const frame_player_1 = require("../frame/frame_player");
const arduino_frame_1 = require("../arduino/arduino_frame");
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
            .filter(frame => frame instanceof arduino_frame_1.ArduinoFrame)
            .forEach((currentFrame) => frames.push(currentFrame));
    });
    let setupFrames = blockly_helper_1.generateFrameForInputStatement(arduinoBlock, 'setup', frames.length == 0 ? null : frames[frames.length - 1]);
    setupFrames.forEach(currentFrame => frames.push(currentFrame));
    console.log(frames);
    return frames;
};
const framePlayer = new frame_player_1.FramePlayer(new frame_player_1.ExecuteUSBFrame());
framePlayer.frame$.subscribe(frame => {
    console.log(frame, 'Arduino Frame Executed');
    console.log(new Date());
});
continueBtn.addEventListener('click', () => {
    framePlayer.stop();
    const frames = generateListOfFrame();
    framePlayer.setFrames(frames);
    framePlayer.play();
});
//# sourceMappingURL=entry.js.map
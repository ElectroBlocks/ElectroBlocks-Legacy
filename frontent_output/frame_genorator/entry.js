"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const frame_list_1 = require("../frame/frame_list");
const blockly_helper_1 = require("../frame/blockly_helper");
const frame_player_1 = require("../frame/frame_player");
const arduino_frame_1 = require("../arduino/arduino_frame");
const continueBtn = document.getElementById('continue-btn');
const scrubBar = document.getElementById('scrub-bar');
const generateListOfFrame = (numberOfTimesThroughLoop = 1) => {
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
    for (let i = 0; i < numberOfTimesThroughLoop; i += 1) {
        let loopFrames = blockly_helper_1.generateFrameForInputStatement(arduinoBlock, 'loop', frames.length == 0 ? null : frames[frames.length - 1]);
        loopFrames.forEach(currentFrame => frames.push(currentFrame));
    }
    console.log(frames, 'Arduino Frames Generated');
    return frames;
};
const framePlayer = new frame_player_1.FramePlayer(new frame_player_1.ExecuteDebugFrame(), scrubBar);
scrubBar.oninput = function () {
    framePlayer.stop();
    framePlayer.skipToFrame(parseInt(scrubBar.value));
};
framePlayer.frame$.subscribe((info) => {
    console.log(`Executing Frame number ${info.frameNumber}.`);
    console.log(new Date());
});
continueBtn.addEventListener('click', () => {
    framePlayer.stop();
    const frames = generateListOfFrame(3);
    scrubBar.setAttribute('min', '0');
    scrubBar.setAttribute('max', (frames.length - 1).toString());
    scrubBar.value = '0';
    framePlayer.setFrames(frames);
    framePlayer.play();
});
//# sourceMappingURL=entry.js.map
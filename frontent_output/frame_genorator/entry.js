"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const frame_player_1 = require("../frame/frame_player");
const generate_frame_1 = require("../frame/generate_frame");
const block_1 = require("../frame/block");
const videoDebug = document.getElementById('debug-video');
const scrubBar = document.getElementById('scrub-bar');
const sliderContainer = document.getElementById('slide-container');
const videoContainer = document.getElementById('video-controls-container');
const inputNumberOfFrames = document.getElementById('loop-times');
const framePlayer = new frame_player_1.FramePlayer(new frame_player_1.ExecuteDebugFrame(), scrubBar);
const playBtn = document.getElementById('video-debug-play');
const backwardBtn = document.getElementById('video-debug-backward');
const forwardBtn = document.getElementById('video-debug-forward');
const blocklyDiv = document.getElementById('content-blocks');
const debugMenu = document.getElementById('debug-menu');
scrubBar.oninput = function () {
    framePlayer.stop();
    framePlayer.skipToFrame(parseInt(scrubBar.value));
};
framePlayer.frame$.subscribe((info) => {
    console.log(`Executing Frame number ${info.frameNumber}.`);
    console.log(new Date());
});
videoDebug.addEventListener('click', () => {
    if (sliderContainer.style.display === 'block') {
        sliderContainer.style.display = 'none';
        videoContainer.style.display = 'none';
        videoDebug.classList.remove('active');
        toggleDebugBlocks(false);
        resizeListener();
        return;
    }
    setupVideoPlayer();
    videoDebug.classList.add('active');
    sliderContainer.style.display = 'block';
    videoContainer.style.display = 'block';
    toggleDebugBlocks(true);
    document.getElementById('content-blocks').style.height = '600px';
    resizeListener();
});
function resizeListener() {
    blocklyDiv.style.height =
        (document.getElementsByTagName('body')[0].clientHeight - document.getElementById('top-menu').clientHeight - (videoContainer.clientHeight + sliderContainer.clientHeight)).toString() + "px";
    block_1.get_blockly().svgResize(block_1.get_blockly().mainWorkspace);
}
const toggleDebugBlocks = (on) => {
    const blocks = block_1.get_blockly().mainWorkspace.getAllBlocks();
    blocks.filter(block => block.hasOwnProperty('defaultDebugValue')).forEach((block) => {
        if (on) {
            block.debugModeOn();
            return;
        }
        block.debugModeOff();
    });
};
const setupVideoPlayer = () => {
    framePlayer.stop();
    const frames = generate_frame_1.generateListOfFrame(parseInt(inputNumberOfFrames.value));
    console.log(frames, 'frames generated');
    if (frames.length == 0) {
        return;
    }
    scrubBar.setAttribute('min', '0');
    scrubBar.setAttribute('max', (frames.length - 1).toString());
    scrubBar.value = '0';
    framePlayer.setFrames(frames);
    playBtn.classList.remove('disable');
    forwardBtn.classList.remove('disable');
    backwardBtn.classList.remove('disable');
};
playBtn.addEventListener('click', () => {
    framePlayer.play();
});
forwardBtn.addEventListener('click', () => {
    framePlayer.next();
});
backwardBtn.addEventListener('click', () => {
    framePlayer.previous();
});
setTimeout(() => {
    block_1.get_blockly().mainWorkspace.addChangeListener((event) => {
        console.log(event);
        if (event.type !== block_1.get_blockly().Events.MOVE &&
            event.type !== block_1.get_blockly().Events.CREATE &&
            event.type !== block_1.get_blockly().Events.CHANGE &&
            event.type !== block_1.get_blockly().Events.DELETE) {
            return null;
        }
        if (sliderContainer.style.display === 'block') {
            setupVideoPlayer();
        }
    });
}, 200);
//# sourceMappingURL=entry.js.map
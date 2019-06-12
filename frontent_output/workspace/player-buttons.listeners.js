"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const block_1 = require("../frame/block");
const generate_frame_1 = require("../frame/generate_frame");
const frame_player_1 = require("../frame/frame_player");
const debugBtn = document.getElementById('debug-btn');
const scrubBar = document.getElementById('scrub-bar');
const videoDebugBtn = document.getElementById('debug-video-btn');
const loopTimesInput = document.getElementById('loop-times');
const speedSlider = document.getElementById('speed');
const videoContainer = document.getElementById('video-controls-container');
const sliderContainer = document.getElementById('slide-container');
const continueBtn = document.getElementById('continue-btn');
const variableMenu = document.getElementById('variable-menu');
const playBtn = document.getElementById('video-debug-play');
const backwardBtn = document.getElementById('video-debug-backward');
const forwardBtn = document.getElementById('video-debug-forward');
speedSlider.onchange = () => {
    frame_player_1.framePlayer.speed = parseInt(speedSlider.value) || 0;
};
scrubBar.oninput = (e) => __awaiter(this, void 0, void 0, function* () {
    playBtn.firstElementChild.classList.add('fa-play');
    playBtn.firstElementChild.classList.remove('fa-stop');
    yield frame_player_1.framePlayer.skipToFrame(parseInt(scrubBar.value));
});
videoDebugBtn.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
    if (sliderContainer.style.display === 'block') {
        sliderContainer.style.display = 'none';
        videoContainer.style.display = 'none';
        videoDebugBtn.classList.remove('active');
        toggleDebugBlocks(false);
        resizeListener();
        toggleDebugViewer();
        return;
    }
    yield exports.setupVideoPlayer();
    yield frame_player_1.framePlayer.skipToFrame(0);
    videoDebugBtn.classList.add('active');
    sliderContainer.style.display = 'block';
    videoContainer.style.display = 'block';
    toggleDebugBlocks(true);
    document.getElementById('content-blocks').style.height = '600px';
    toggleDebugViewer();
    resizeListener();
}));
function resizeListener() {
    const blocklyDiv = document.getElementById('content-blocks');
    blocklyDiv.style.height =
        (document.getElementsByTagName('body')[0].clientHeight - document.getElementById('top-menu').clientHeight - (videoContainer.clientHeight + sliderContainer.clientHeight)).toString() + "px";
    block_1.get_blockly().svgResize(block_1.get_blockly().mainWorkspace);
}
const toggleDebugBlocks = (showInputDebugBlocks) => {
    const blocks = block_1.get_blockly().mainWorkspace.getAllBlocks();
    blocks.filter(block => block
        .hasOwnProperty('defaultDebugValue'))
        .forEach((block) => {
        if (showInputDebugBlocks) {
            block.debugModeOn();
            return;
        }
        block.debugModeOff();
    });
};
exports.setupVideoPlayer = () => __awaiter(this, void 0, void 0, function* () {
    yield frame_player_1.framePlayer.stop();
    const frames = generate_frame_1.generateListOfFrame(parseInt(loopTimesInput.value));
    if (frames.length == 0) {
        disablePlayerUI();
        return;
    }
    scrubBar.setAttribute('min', '0');
    scrubBar.setAttribute('max', (frames.length - 1).toString());
    frame_player_1.framePlayer.setFrames(frames);
    enablePlayerUI();
});
const disablePlayerUI = () => {
    playBtn.classList.add('disable');
    forwardBtn.classList.add('disable');
    backwardBtn.classList.add('disable');
    videoContainer.classList.add('disable');
    scrubBar.disabled = true;
};
const enablePlayerUI = () => {
    playBtn.classList.remove('disable');
    forwardBtn.classList.remove('disable');
    backwardBtn.classList.remove('disable');
    videoContainer.classList.remove('disable');
    scrubBar.disabled = false;
};
playBtn.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
    if (frame_player_1.framePlayer.isPlaying() && !frame_player_1.framePlayer.isLastFrame()) {
        playBtn.firstElementChild.classList.add('fa-play');
        playBtn.firstElementChild.classList.remove('fa-stop');
        yield frame_player_1.framePlayer.stop();
        return;
    }
    playBtn.firstElementChild.classList.remove('fa-play');
    playBtn.firstElementChild.classList.add('fa-stop');
    yield frame_player_1.framePlayer.play();
}));
forwardBtn.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
    playBtn.firstElementChild.classList.add('fa-play');
    playBtn.firstElementChild.classList.remove('fa-stop');
    yield frame_player_1.framePlayer.next();
}));
backwardBtn.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
    playBtn.firstElementChild.classList.add('fa-play');
    playBtn.firstElementChild.classList.remove('fa-stop');
    yield frame_player_1.framePlayer.previous();
}));
const toggleDebugViewer = () => {
    if (debugBtn.classList.contains('active')) {
        debugBtn.classList.remove('active');
        variableMenu.style.display = 'none';
    }
    else {
        debugBtn.classList.add('active');
        variableMenu.style.display = 'inline';
    }
    if (document.getElementById('video-controls-container').style.display === 'none') {
        continueBtn.style.display = 'inline-block';
    }
    else {
        continueBtn.style.display = 'none';
    }
};
loopTimesInput.onchange = () => __awaiter(this, void 0, void 0, function* () {
    yield exports.setupVideoPlayer();
});
debugBtn.addEventListener('click', () => {
    toggleDebugViewer();
});
//# sourceMappingURL=player-buttons.listeners.js.map
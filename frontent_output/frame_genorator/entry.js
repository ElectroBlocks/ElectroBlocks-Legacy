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
const frame_execute_1 = require("../frame/frame_execute");
const frame_player_1 = require("../frame/frame_player");
const generate_frame_1 = require("../frame/generate_frame");
const block_1 = require("../frame/block");
const operators_1 = require("rxjs/operators");
const debugTbody = document.getElementById('debug-tbody');
const videoDebug = document.getElementById('debug-video');
const scrubBar = document.getElementById('scrub-bar');
const sliderContainer = document.getElementById('slide-container');
const videoContainer = document.getElementById('video-controls-container');
const inputNumberOfFrames = document.getElementById('loop-times');
const debugBtn = document.getElementById('debug-btn');
const continueBtn = document.getElementById('continue-btn');
const debugMenu = document.getElementById('debug-menu');
const framePlayer = new frame_player_1.FramePlayer(new frame_execute_1.ExecuteDebugFrame());
const playBtn = document.getElementById('video-debug-play');
const backwardBtn = document.getElementById('video-debug-backward');
const forwardBtn = document.getElementById('video-debug-forward');
const blocklyDiv = document.getElementById('content-blocks');
const speedSlider = document.getElementById('speed');
speedSlider.onchange = () => {
    framePlayer.speed = parseInt(speedSlider.value);
};
scrubBar.oninput = (e) => __awaiter(this, void 0, void 0, function* () {
    playBtn.firstElementChild.classList.add('fa-play');
    playBtn.firstElementChild.classList.remove('fa-stop');
    yield framePlayer.skipToFrame(parseInt(scrubBar.value));
    console.log(e);
    console.log('scrub bar');
});
framePlayer.changeFrame$.pipe(operators_1.map(frameOutput => frameOutput.blockId), operators_1.tap(blockId => {
    const block = block_1.get_blockly().mainWorkspace.getBlockById(blockId);
    if (block) {
        block.select();
    }
})).subscribe();
framePlayer.changeFrame$.pipe(operators_1.filter(frameOutput => frameOutput.lastFrame), operators_1.tap(() => {
    playBtn.firstElementChild.classList.add('fa-play');
    playBtn.firstElementChild.classList.remove('fa-stop');
})).subscribe();
framePlayer.changeFrame$
    .pipe(operators_1.map(frameOutput => frameOutput.frameNumber), operators_1.tap(frameNumber => {
    scrubBar.value = frameNumber.toString();
}))
    .subscribe();
framePlayer.changeFrame$
    .pipe(operators_1.map(frameOutput => frameOutput.usbMessage), operators_1.tap(message => {
    if (message.length) {
        document.getElementById('last-usb-message').style.display = 'none';
        return;
    }
    document.getElementById('last-usb-message').style.display = 'block';
    document.getElementById('last-usb-message').innerHTML = message;
}))
    .subscribe();
framePlayer.changeFrame$.pipe(operators_1.map(frameOutput => frameOutput.variables), operators_1.map(variables => {
    let tbody = '';
    Object.keys(variables).forEach(key => {
        const value = variables[key].type.toString().indexOf('List') === -1 ?
            variables[key].value : `[${variables[key].value}]`;
        tbody += '<tr>';
        tbody += '<td>' + variables[key].name + '</td>';
        tbody += '<td>' + variables[key].type + '</td>';
        tbody += '<td>' + value + '</td>';
        tbody += '</tr>';
    });
    return tbody;
}), operators_1.tap(tbody => {
    debugTbody.innerHTML = tbody;
})).subscribe();
videoDebug.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
    if (sliderContainer.style.display === 'block') {
        sliderContainer.style.display = 'none';
        videoContainer.style.display = 'none';
        videoDebug.classList.remove('active');
        toggleDebugBlocks(false);
        resizeListener();
        toggleDebugViewer();
        return;
    }
    yield exports.setupVideoPlayer();
    yield framePlayer.skipToFrame(0);
    videoDebug.classList.add('active');
    sliderContainer.style.display = 'block';
    videoContainer.style.display = 'block';
    toggleDebugBlocks(true);
    document.getElementById('content-blocks').style.height = '600px';
    toggleDebugViewer();
    resizeListener();
}));
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
exports.setupVideoPlayer = () => __awaiter(this, void 0, void 0, function* () {
    yield framePlayer.stop();
    const frames = generate_frame_1.generateListOfFrame(parseInt(inputNumberOfFrames.value));
    if (frames.length == 0) {
        disablePlayerUI();
        return;
    }
    scrubBar.setAttribute('min', '0');
    scrubBar.setAttribute('max', (frames.length - 1).toString());
    framePlayer.setFrames(frames);
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
    if (framePlayer.isPlaying() && !framePlayer.isLastFrame()) {
        playBtn.firstElementChild.classList.add('fa-play');
        playBtn.firstElementChild.classList.remove('fa-stop');
        yield framePlayer.stop();
        return;
    }
    playBtn.firstElementChild.classList.remove('fa-play');
    playBtn.firstElementChild.classList.add('fa-stop');
    yield framePlayer.play();
}));
forwardBtn.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
    playBtn.firstElementChild.classList.add('fa-play');
    playBtn.firstElementChild.classList.remove('fa-stop');
    yield framePlayer.next();
}));
backwardBtn.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
    playBtn.firstElementChild.classList.add('fa-play');
    playBtn.firstElementChild.classList.remove('fa-stop');
    yield framePlayer.previous();
}));
const toggleDebugViewer = () => {
    if (debugBtn.classList.contains('active')) {
        debugBtn.classList.remove('active');
        debugMenu.style.display = 'none';
    }
    else {
        debugBtn.classList.add('active');
        debugMenu.style.display = 'inline';
    }
    if (document.getElementById('video-controls-container').style.display === 'none') {
        continueBtn.style.display = 'inline-block';
    }
    else {
        continueBtn.style.display = 'none';
    }
};
inputNumberOfFrames.onchange = () => __awaiter(this, void 0, void 0, function* () {
    yield exports.setupVideoPlayer();
});
debugBtn.addEventListener('click', () => {
    toggleDebugViewer();
});
//# sourceMappingURL=entry.js.map
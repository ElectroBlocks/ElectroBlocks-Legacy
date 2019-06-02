"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const frame_player_1 = require("../frame/frame_player");
const generate_frame_1 = require("../frame/generate_frame");
const block_1 = require("../frame/block");
const debugTbody = document.getElementById('debug-tbody');
const videoDebug = document.getElementById('debug-video');
const scrubBar = document.getElementById('scrub-bar');
const sliderContainer = document.getElementById('slide-container');
const videoContainer = document.getElementById('video-controls-container');
const inputNumberOfFrames = document.getElementById('loop-times');
const debugBtn = document.getElementById('debug-btn');
const continueBtn = document.getElementById('continue-btn');
const debugMenu = document.getElementById('debug-menu');
const framePlayer = new frame_player_1.FramePlayer(new frame_player_1.ExecuteDebugFrame());
const playBtn = document.getElementById('video-debug-play');
const backwardBtn = document.getElementById('video-debug-backward');
const forwardBtn = document.getElementById('video-debug-forward');
const blocklyDiv = document.getElementById('content-blocks');
const speedSlider = document.getElementById('speed');
speedSlider.onchange = () => {
    framePlayer.setDelayDivider(parseInt(speedSlider.value));
};
scrubBar.oninput = function () {
    framePlayer.stop();
    framePlayer.skipToFrame(parseInt(scrubBar.value));
};
framePlayer.message$.subscribe(message => {
    document.getElementById('last-usb-message').innerHTML = message;
});
framePlayer.frame$.subscribe((info) => {
    if (!framePlayer.isPlaying()) {
        playBtn.firstElementChild.classList.add('fa-play');
        playBtn.firstElementChild.classList.remove('fa-stop');
    }
    console.log(`Executing Frame number ${info.frameNumber}.`);
    console.log(new Date());
});
framePlayer.variables$.subscribe(variables => {
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
    debugTbody.innerHTML = tbody;
});
framePlayer.frameNumber$.subscribe(frameNumber => {
    scrubBar.value = frameNumber.toString();
    if (framePlayer.onLastFrame()) {
        playBtn.firstElementChild.classList.add('fa-play');
        playBtn.firstElementChild.classList.remove('fa-stop');
    }
});
videoDebug.addEventListener('click', () => {
    if (sliderContainer.style.display === 'block') {
        sliderContainer.style.display = 'none';
        videoContainer.style.display = 'none';
        videoDebug.classList.remove('active');
        toggleDebugBlocks(false);
        resizeListener();
        toggleDebugViewer();
        return;
    }
    exports.setupVideoPlayer();
    videoDebug.classList.add('active');
    sliderContainer.style.display = 'block';
    videoContainer.style.display = 'block';
    toggleDebugBlocks(true);
    document.getElementById('content-blocks').style.height = '600px';
    toggleDebugViewer();
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
exports.setupVideoPlayer = () => {
    framePlayer.stop();
    const frames = generate_frame_1.generateListOfFrame(parseInt(inputNumberOfFrames.value));
    if (frames.length == 0) {
        disablePlayerUI();
        return;
    }
    scrubBar.setAttribute('min', '0');
    scrubBar.setAttribute('max', (frames.length - 1).toString());
    framePlayer.setFrames(frames);
    enablePlayerUI();
};
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
playBtn.addEventListener('click', () => {
    if (framePlayer.isPlaying() && !framePlayer.onLastFrame()) {
        playBtn.firstElementChild.classList.remove('fa-play');
        playBtn.firstElementChild.classList.add('fa-stop');
        framePlayer.stop();
        return;
    }
    playBtn.firstElementChild.classList.remove('fa-play');
    playBtn.firstElementChild.classList.add('fa-stop');
    framePlayer.play(true);
});
forwardBtn.addEventListener('click', () => {
    playBtn.firstElementChild.classList.add('fa-play');
    playBtn.firstElementChild.classList.remove('fa-stop');
    framePlayer.next();
});
backwardBtn.addEventListener('click', () => {
    playBtn.firstElementChild.classList.add('fa-play');
    playBtn.firstElementChild.classList.remove('fa-stop');
    framePlayer.previous();
});
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
inputNumberOfFrames.onchange = () => {
    exports.setupVideoPlayer();
};
debugBtn.addEventListener('click', () => {
    toggleDebugViewer();
});
//# sourceMappingURL=entry.js.map
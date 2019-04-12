"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const frame_player_1 = require("../frame/frame_player");
const generate_frame_1 = require("../frame/generate_frame");
const videoDebug = document.getElementById('debug-video');
const scrubBar = document.getElementById('scrub-bar');
const sliderContainer = document.getElementById('slide-container');
const videoContainer = document.getElementById('video-controls-container');
const inputNumberOfFrames = document.getElementById('loop_times');
const generateLoopBtn = document.getElementById('generate-loop');
const framePlayer = new frame_player_1.FramePlayer(new frame_player_1.ExecuteDebugFrame(), scrubBar);
const playBtn = document.getElementById('video-debug-play');
const stopBtn = document.getElementById('video-debug-stop');
const backwardBtn = document.getElementById('video-debug-backward');
const forwardBtn = document.getElementById('video-debug-forward');
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
        return;
    }
    sliderContainer.style.display = 'block';
    videoContainer.style.display = 'block';
});
generateLoopBtn.addEventListener('click', () => {
    framePlayer.stop();
    const frames = generate_frame_1.generateListOfFrame(parseInt(inputNumberOfFrames.value));
    if (frames.length == 0) {
        return;
    }
    scrubBar.setAttribute('min', '0');
    scrubBar.setAttribute('max', (frames.length - 1).toString());
    scrubBar.value = '0';
    framePlayer.setFrames(frames);
    playBtn.classList.remove('disable');
    stopBtn.classList.remove('disable');
    forwardBtn.classList.remove('disable');
    backwardBtn.classList.remove('disable');
});
playBtn.addEventListener('click', () => {
    framePlayer.play();
    stopBtn.classList.remove('disable');
});
stopBtn.addEventListener('click', () => {
    framePlayer.stop();
    stopBtn.classList.add('disable');
});
forwardBtn.addEventListener('click', () => {
    framePlayer.next();
});
backwardBtn.addEventListener('click', () => {
    framePlayer.previous();
});
//# sourceMappingURL=entry.js.map
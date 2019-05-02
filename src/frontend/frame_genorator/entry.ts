import { ExecuteDebugFrame, FramePlayer } from "../frame/frame_player";
import { ArduinoFrame } from "../arduino/arduino_frame";
import { generateListOfFrame } from "../frame/generate_frame";
import { Block, get_blockly } from "../frame/block";


const videoDebug = document.getElementById('debug-video');
const scrubBar = document.getElementById('scrub-bar') as HTMLInputElement;
const sliderContainer = document.getElementById('slide-container');
const videoContainer = document.getElementById('video-controls-container');
const inputNumberOfFrames = document.getElementById('loop-times') as HTMLInputElement;

// const generateLoopBtn = document.getElementById('generate-loop');
const framePlayer = new FramePlayer(new ExecuteDebugFrame(), scrubBar);
const playBtn = document.getElementById('video-debug-play');
// const stopBtn = document.getElementById('video-debug-stop');
const backwardBtn = document.getElementById('video-debug-backward');
const forwardBtn = document.getElementById('video-debug-forward');
const blocklyDiv = document.getElementById('content-blocks');

scrubBar.oninput = function() {
	framePlayer.stop();
	framePlayer.skipToFrame(parseInt(scrubBar.value));

};

framePlayer.frame$.subscribe((info: {frameNumber: number, frame: ArduinoFrame}) => {

	if (!framePlayer.isPlaying()) {
		playBtn.firstElementChild.classList.add('fa-play');
		playBtn.firstElementChild.classList.remove('fa-stop');
	}

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

/**
 * Controls the resizing
 */
function resizeListener() {
	blocklyDiv.style.height =
		(document.getElementsByTagName('body')[0].clientHeight - document.getElementById('top-menu').clientHeight - (videoContainer.clientHeight + sliderContainer.clientHeight )).toString() + "px";
	get_blockly().svgResize(get_blockly().mainWorkspace);
}



const toggleDebugBlocks = (on: boolean) => {
	const blocks = get_blockly().mainWorkspace.getAllBlocks();

	blocks.filter(block => block.hasOwnProperty('defaultDebugValue')).forEach((block: Block) => {
		if (on) {
			block.debugModeOn();
			return;
		}

		block.debugModeOff();
	});
};

export const setupVideoPlayer = () => {
	framePlayer.stop();

	const frames = generateListOfFrame(parseInt(inputNumberOfFrames.value));
	console.log(frames, 'frames generated');
	if (frames.length == 0) {
		return;
	}

	scrubBar.setAttribute('min', '0');
	scrubBar.setAttribute('max', (frames.length - 1).toString());
 	framePlayer.setFrames(frames);
	playBtn.classList.remove('disable');
	forwardBtn.classList.remove('disable');
	backwardBtn.classList.remove('disable');
};


playBtn.addEventListener('click', () => {
	if (framePlayer.isPlaying()) {
		playBtn.firstElementChild.classList.add('fa-play');
		playBtn.firstElementChild.classList.remove('fa-stop');
		framePlayer.stop();
		return;
	}
	playBtn.firstElementChild.classList.remove('fa-play');
	playBtn.firstElementChild.classList.add('fa-stop');
	framePlayer.play();
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



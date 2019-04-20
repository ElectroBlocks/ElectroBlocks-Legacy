import { ExecuteDebugFrame, FramePlayer } from "../frame/frame_player";
import { ArduinoFrame } from "../arduino/arduino_frame";
import { generateListOfFrame } from "../frame/generate_frame";
import { Block, Blockly, get_blockly } from "../frame/block";


const videoDebug = document.getElementById('debug-video');
const scrubBar = document.getElementById('scrub-bar') as HTMLInputElement;
const sliderContainer = document.getElementById('slide-container');
const videoContainer = document.getElementById('video-controls-container');
const inputNumberOfFrames = document.getElementById('loop_times') as HTMLInputElement;

const generateLoopBtn = document.getElementById('generate-loop');
const framePlayer = new FramePlayer(new ExecuteDebugFrame(), scrubBar);
const playBtn = document.getElementById('video-debug-play');
const stopBtn = document.getElementById('video-debug-stop');
const backwardBtn = document.getElementById('video-debug-backward');
const forwardBtn = document.getElementById('video-debug-forward');

scrubBar.oninput = function() {
	framePlayer.stop();
	framePlayer.skipToFrame(parseInt(scrubBar.value));
};

framePlayer.frame$.subscribe((info: {frameNumber: number, frame: ArduinoFrame}) => {

	console.log(`Executing Frame number ${info.frameNumber}.`);
	console.log(new Date());
});


videoDebug.addEventListener('click', () => {

	if (sliderContainer.style.display === 'block') {
		sliderContainer.style.display = 'none';
		videoContainer.style.display = 'none';
		toggleDebugBlocks(false);
		return;
	}


	sliderContainer.style.display = 'block';

	videoContainer.style.display = 'block';

	toggleDebugBlocks(true);
});

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

generateLoopBtn.addEventListener('click', () => {
	framePlayer.stop();

	const frames = generateListOfFrame(parseInt(inputNumberOfFrames.value));
	console.log(frames, 'frames generated');
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

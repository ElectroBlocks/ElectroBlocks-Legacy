import { Block, get_blockly } from "../frame/block";
import { generateListOfFrame } from "../frame/generate_frame";

import { framePlayer } from "../frame/frame_player.factory";


/**
 * Button that toggles the variable debug
 */
const debugBtn = document.getElementById( 'debug-btn' );

/**
 * Used to control the player scrub bar
 */
const scrubBar = document.getElementById( 'scrub-bar' ) as HTMLInputElement;


/**
 * This input controls the number of times the loop is executed
 */
const loopTimesInput = document.getElementById( 'loop-times' ) as HTMLInputElement;

/**
 * Controls how fast or slow the player executes the blocks
 */
const speedSlider = document.getElementById( 'speed' ) as HTMLInputElement;





/**
 * Player Control Buttons
 */
const continueBtn = document.getElementById( 'continue-btn' );
const variableMenu = document.getElementById( 'variable-menu' );
const playBtn = document.getElementById( 'video-debug-play' ) as HTMLLinkElement;
const backwardBtn = document.getElementById( 'video-debug-backward' ) as HTMLLinkElement;
const forwardBtn = document.getElementById( 'video-debug-forward' ) as HTMLLinkElement;

/**
 * Fires when the speed of slider is changed
 */
speedSlider.onchange = () => {
	framePlayer.speed = parseInt( speedSlider.value ) || 0;
};

/**
 * Fires when a person moves scrub bar
 */
scrubBar.oninput =  async ( e ) => {
	playBtn.firstElementChild.classList.add( 'fa-play' );
	playBtn.firstElementChild.classList.remove( 'fa-stop' );
	await framePlayer.skipToFrame(parseInt(scrubBar.value));
};





/**
 * This controls whether the input debug blocks are shown
 */
export const toggleDebugBlocks = ( showInputDebugBlocks: boolean ) => {
	const blocks = get_blockly().mainWorkspace.getAllBlocks();

	blocks.filter( block => block
		.hasOwnProperty( 'defaultDebugValue' ) )
		.forEach( ( block: Block ) => {
			if (showInputDebugBlocks) {
				block.debugModeOn();
				return;
			}

			block.debugModeOn(); // This has to be done for some weird reason
			block.debugModeOff();
	} );
};

export const setupVideoPlayer = async () => {
	await framePlayer.stop();

	const frames = generateListOfFrame( parseInt( loopTimesInput.value ) );
	if (frames.length == 0) {
		disablePlayerUI();
		return;
	}

	scrubBar.setAttribute( 'min', '0' );
	scrubBar.setAttribute( 'max', (frames.length - 1).toString() );
	await framePlayer.setFrames( frames );
	enablePlayerUI();
};

const disablePlayerUI = () => {
	playBtn.classList.add( 'disable' );
	forwardBtn.classList.add( 'disable' );
	backwardBtn.classList.add( 'disable' );
	scrubBar.disabled = true;
};

const enablePlayerUI = () => {

	playBtn.classList.remove( 'disable' );
	forwardBtn.classList.remove( 'disable' );
	backwardBtn.classList.remove( 'disable' );
	scrubBar.disabled = false;
};


playBtn.addEventListener( 'click', async () => {
	if (framePlayer.isPlaying() && !framePlayer.isLastFrame()) {
		playBtn.firstElementChild.classList.add( 'fa-play' );
		playBtn.firstElementChild.classList.remove( 'fa-stop' );
		await framePlayer.stop();
		return;
	}
	playBtn.firstElementChild.classList.remove( 'fa-play' );
	playBtn.firstElementChild.classList.add( 'fa-stop' );
	await framePlayer.play();
} );

forwardBtn.addEventListener( 'click', async () => {
	playBtn.firstElementChild.classList.add( 'fa-play' );
	playBtn.firstElementChild.classList.remove( 'fa-stop' );
	await framePlayer.next();
} );

backwardBtn.addEventListener( 'click', async () => {
	playBtn.firstElementChild.classList.add( 'fa-play' );
	playBtn.firstElementChild.classList.remove( 'fa-stop' );
	await framePlayer.previous();
} );

export const toggleDebugViewer = () => {
	if (debugBtn.classList.contains( 'active' )) {
		debugBtn.classList.remove( 'active' );
		variableMenu.style.display = 'none';
	} else {
		debugBtn.classList.add( 'active' );
		variableMenu.style.display = 'inline';
	}


	if (getComputedStyle(document.getElementById('video-controls-container')).display === 'none') {
		continueBtn.style.display = 'inline-block';
	} else {
		continueBtn.style.display = 'none';
	}
};

loopTimesInput.onchange = async () => {
	await setupVideoPlayer();
};

debugBtn.addEventListener( 'click', () => {
	toggleDebugViewer();
} );


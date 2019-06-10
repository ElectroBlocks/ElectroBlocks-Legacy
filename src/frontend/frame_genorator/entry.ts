import { ExecuteDebugFrame } from "../frame/frame_execute";
import { FramePlayer } from "../frame/frame_player";

import { generateListOfFrame } from "../frame/generate_frame";
import { Block, get_blockly } from "../frame/block";
import { map, tap, filter } from "rxjs/operators";

const debugTbody = document.getElementById( 'debug-tbody' );

const videoDebug = document.getElementById( 'debug-video' );
const scrubBar = document.getElementById( 'scrub-bar' ) as HTMLInputElement;
const sliderContainer = document.getElementById( 'slide-container' );
const videoContainer = document.getElementById( 'video-controls-container' );
const inputNumberOfFrames = document.getElementById( 'loop-times' ) as HTMLInputElement;

const debugBtn = document.getElementById( 'debug-btn' );
const continueBtn = document.getElementById( 'continue-btn' );
const debugMenu = document.getElementById( 'debug-menu' );

const framePlayer = new FramePlayer( new ExecuteDebugFrame() );
const playBtn = document.getElementById( 'video-debug-play' ) as HTMLLinkElement;
const backwardBtn = document.getElementById( 'video-debug-backward' ) as HTMLLinkElement;
const forwardBtn = document.getElementById( 'video-debug-forward' ) as HTMLLinkElement;
const blocklyDiv = document.getElementById( 'content-blocks' );

const speedSlider = document.getElementById( 'speed' ) as HTMLInputElement;

speedSlider.onchange = () => {
	framePlayer.speed = parseInt( speedSlider.value );
};

scrubBar.oninput =  async ( e ) => {
	playBtn.firstElementChild.classList.add( 'fa-play' );
	playBtn.firstElementChild.classList.remove( 'fa-stop' );
	await framePlayer.skipToFrame(parseInt(scrubBar.value));
	console.log( e );
	console.log( 'scrub bar' );
};

framePlayer.changeFrame$.pipe(
	map(frameOutput => frameOutput.blockId),
	tap(blockId => {
		const block = get_blockly().mainWorkspace.getBlockById(blockId);

		if (block) {
			block.select();
		}
	})
).subscribe();

framePlayer.changeFrame$.pipe(
	filter(frameOutput => frameOutput.lastFrame),
	tap(() => {
		playBtn.firstElementChild.classList.add( 'fa-play' );
		playBtn.firstElementChild.classList.remove( 'fa-stop' );
	})
).subscribe();

framePlayer.changeFrame$
	.pipe( map( frameOutput => frameOutput.frameNumber ), tap( frameNumber => {
		scrubBar.value = frameNumber.toString();
	} ) )
	.subscribe();

framePlayer.changeFrame$
	.pipe(
		map( frameOutput => frameOutput.usbMessage ),
		tap( message => {
			if (message.length) {
				document.getElementById( 'last-usb-message' ).style.display = 'none';
				return;
			}

			document.getElementById( 'last-usb-message' ).style.display = 'block';
			document.getElementById( 'last-usb-message' ).innerHTML = message;
		} ) )
	.subscribe();



framePlayer.changeFrame$.pipe(
	map( frameOutput => frameOutput.variables ),
	map( variables => {
		let tbody = '';
		Object.keys( variables ).forEach( key => {

			const value = variables[ key ].type.toString().indexOf( 'List' ) === -1 ?
				variables[ key ].value : `[${variables[ key ].value}]`;

			tbody += '<tr>';
			tbody += '<td>' + variables[ key ].name + '</td>';
			tbody += '<td>' + variables[ key ].type + '</td>';
			tbody += '<td>' + value + '</td>';
			tbody += '</tr>';

		} );

		return tbody;
	} ),
	tap(tbody => {
		debugTbody.innerHTML = tbody;
	})
).subscribe();


videoDebug.addEventListener( 'click', async () => {

	if (sliderContainer.style.display === 'block') {
		sliderContainer.style.display = 'none';
		videoContainer.style.display = 'none';
		videoDebug.classList.remove( 'active' );
		toggleDebugBlocks( false );
		resizeListener();
		toggleDebugViewer();

		return;
	}

	await setupVideoPlayer();
	await framePlayer.skipToFrame(0);
	videoDebug.classList.add( 'active' );
	sliderContainer.style.display = 'block';
	videoContainer.style.display = 'block';
	toggleDebugBlocks( true );
	document.getElementById( 'content-blocks' ).style.height = '600px';
	toggleDebugViewer();
	resizeListener();

} );

/**
 * Controls the resizing
 */
function resizeListener() {
	blocklyDiv.style.height =
		(document.getElementsByTagName( 'body' )[ 0 ].clientHeight - document.getElementById( 'top-menu' ).clientHeight - (videoContainer.clientHeight + sliderContainer.clientHeight)).toString() + "px";
	get_blockly().svgResize( get_blockly().mainWorkspace );
}


const toggleDebugBlocks = ( on: boolean ) => {
	const blocks = get_blockly().mainWorkspace.getAllBlocks();

	blocks.filter( block => block.hasOwnProperty( 'defaultDebugValue' ) ).forEach( ( block: Block ) => {
		if (on) {
			block.debugModeOn();
			return;
		}

		block.debugModeOff();
	} );
};

export const setupVideoPlayer = async () => {
	await framePlayer.stop();

	const frames = generateListOfFrame( parseInt( inputNumberOfFrames.value ) );
	if (frames.length == 0) {
		disablePlayerUI();
		return;
	}

	scrubBar.setAttribute( 'min', '0' );
	scrubBar.setAttribute( 'max', (frames.length - 1).toString() );
	framePlayer.setFrames( frames );

	enablePlayerUI();
};

const disablePlayerUI = () => {
	playBtn.classList.add( 'disable' );
	forwardBtn.classList.add( 'disable' );
	backwardBtn.classList.add( 'disable' );
	videoContainer.classList.add( 'disable' );
	scrubBar.disabled = true;
};

const enablePlayerUI = () => {

	playBtn.classList.remove( 'disable' );
	forwardBtn.classList.remove( 'disable' );
	backwardBtn.classList.remove( 'disable' );
	videoContainer.classList.remove( 'disable' );
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

const toggleDebugViewer = () => {
	if (debugBtn.classList.contains( 'active' )) {
		debugBtn.classList.remove( 'active' );
		debugMenu.style.display = 'none';
	} else {
		debugBtn.classList.add( 'active' );
		debugMenu.style.display = 'inline';
	}

	if (document.getElementById( 'video-controls-container' ).style.display === 'none') {
		continueBtn.style.display = 'inline-block';
	} else {
		continueBtn.style.display = 'none';
	}
};

inputNumberOfFrames.onchange = async () => {
	await setupVideoPlayer();
};

debugBtn.addEventListener( 'click', () => {
	toggleDebugViewer();
} );



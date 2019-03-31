import { Blockly } from '../frame/block';
import { frameGeneratingBlocks } from '../frame/frame_list'
import { generateFrameForInputStatement } from "../frame/blockly_helper";
import { Frame } from "../frame/frame";
import { ExecuteDebugFrame, ExecuteUSBFrame, FramePlayer } from "../frame/frame_player";
import { ArduinoFrame } from "../arduino/arduino_frame";

declare const Blockly: Blockly;


const continueBtn = document.getElementById('continue-btn');


const generateListOfFrame = () => {
		let arduinoBlock = Blockly.mainWorkspace.getAllBlocks().filter(function (block) {
			return block.type == 'arduino_start';
		})[0];

		let topBlocks = Blockly
			.mainWorkspace
			.getTopBlocks()
			.filter(block => block.type != 'arduino_start');

		let frames = new Array<ArduinoFrame>();

		topBlocks
			.filter(block => block.type != 'procedures_defnoreturn')
			.forEach(block => {
				frameGeneratingBlocks[block.type + '_block'](block, frames.length == 0 ? null : frames[frames.length - 1])
					.filter(frame => frame instanceof ArduinoFrame)
					.forEach((currentFrame: ArduinoFrame) => frames.push(currentFrame));
			});

		let setupFrames = generateFrameForInputStatement(
			arduinoBlock,
			'setup',
			frames.length == 0 ? null : frames[frames.length - 1]
		) as ArduinoFrame[];

		setupFrames.forEach(currentFrame => frames.push(currentFrame));

		console.log(frames);

		return frames;
};

const framePlayer = new FramePlayer(new ExecuteUSBFrame());

framePlayer.frame$.subscribe(frame => {
	console.log(frame, 'Arduino Frame Executed');
	console.log(new Date());
});


continueBtn.addEventListener('click', () => {

	framePlayer.stop();

	const frames = generateListOfFrame();

	framePlayer.setFrames(frames);

	framePlayer.play();
});

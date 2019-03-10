import { Blockly } from '../frame/block';
import { frameGeneratingBlocks } from '../frame/frame_list'
import { generateFrameForInputStatement } from "../frame/blockly_helper";
import { ArduinoFrame } from "../arduino/arduino_frame";
import { Frame } from "../frame/frame";

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

		let frames = new Array<Frame>();

		topBlocks
			.filter(block => block.type != 'procedures_defnoreturn')
			.forEach(block => {
				frameGeneratingBlocks[block.type + '_block'](block, frames.length == 0 ? null : frames[frames.length - 1])
					.forEach(currentFrame => frames.push(currentFrame));
			});

		let setupFrames = generateFrameForInputStatement(
			arduinoBlock,
			'setup',
			frames.length == 0 ? null : frames[frames.length - 1]
		);

		setupFrames.forEach(currentFrame => frames.push(currentFrame));

		console.log(setupFrames);
};

continueBtn.addEventListener('click', () => {
	generateListOfFrame();
});
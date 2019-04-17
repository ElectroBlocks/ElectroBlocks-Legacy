import 'jasmine';
import { Blockly } from "./block";
import { inputState } from "./input_state";
import * as blockHelper from "./blockly_helper";
import * as blockly from "./block";
import { ArduinoFrame } from "../arduino/arduino_frame";
import { generateListOfFrame } from "./generate_frame";

describe('Generate Frames', () => {

	let blocklyMock: any|Blockly;


	beforeEach(() => {
		inputState.clearBlockCalls();

		blocklyMock = {
			mainWorkspace: {
				getTopBlocks(): any[] {
					return [
						{
							type: 'arduino_start',
							disabled: false,
						},
						{
							type: 'procedures_defnoreturn',
							disabled: false,
						},
						{
							type: 'generate_fake',
							disabled: true,
						}
					]
				}
			}
		};



		spyOn(blockly, 'get_blockly').and.returnValue(blocklyMock);

	});

	it ('should generate number of frames based on the number of times going through the loop', () => {
		const generateLoopSpy = spyOn(blockHelper, 'generateFrameForInputStatement');
		generateLoopSpy
			.withArgs({type: 'arduino_start', 'disabled': false }, 'setup', null).and
			.callFake(() => [ArduinoFrame.makeEmptyFrame('block_id')]);

		generateLoopSpy
			.withArgs({type: 'arduino_start', 'disabled': false }, 'loop', jasmine.anything()).and
			.callFake(() => [ArduinoFrame.makeEmptyFrame('block_id'), ArduinoFrame.makeEmptyFrame('block_id')]);

		expect(generateListOfFrame(1).length).toBe(3);

		expect(generateListOfFrame(2).length).toBe(5);
	});
});

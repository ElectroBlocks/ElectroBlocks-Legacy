import 'jasmine';
import { Block } from "../frame/block";
import { ArduinoFrame } from "../arduino/arduino_frame";
import { EmptyCommand } from "../frame/command";
import { send_message_block } from "./message";
import * as blockHelperFunctions from "../frame/blockly_helper";

describe('message', () => {

	const block: any|Block = {
		id: 'blockId'
	};

	let getInputValueSpy:  jasmine.Spy;


	const previousFrame = new ArduinoFrame('block1', {
		fred: {
			name: 'fred',
			type: 'String',
			value: 'blue'
		},
	},
		[],
		new EmptyCommand(),
		{ location: 'loop', iteration: 1 }
	);

	beforeEach(() => {
		getInputValueSpy =  spyOn(blockHelperFunctions, 'getInputValue');
	});

	it ('should use the previous frame if available', () => {

		getInputValueSpy.withArgs(block, 'MESSAGE', '', previousFrame).and.returnValue('Hello World');

		const frames = send_message_block(block, { location: 'loop', iteration: 1 }, previousFrame);

		expect(frames.length).toBe(1);
		const [frame] = frames;

		expect(frame.variables['fred'].value).toBe('blue');
		expect(frame.nextCommand().command).toBe('Hello World');
	});

	it ('should to an empty command frame if previous frame not available', () => {

		getInputValueSpy.withArgs(block, 'MESSAGE', '', undefined).and.returnValue('People Cool');

		const frames = send_message_block(block, { location: 'loop', iteration: 1 });

		expect(frames.length).toBe(1);
		const [frame] = frames;

		expect(frame.variables).toEqual({});
		expect(frame.nextCommand().command).toBe('People Cool');

	});

});

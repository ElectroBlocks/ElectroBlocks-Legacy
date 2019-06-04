import 'jasmine';
import { Block } from "../frame/block";
import { ArduinoFrame } from "../arduino/arduino_frame";
import { COMMAND_TYPE, EmptyCommand } from "../frame/command";
import { send_message_block } from "./message";
import * as blockHelperFunctions from "../frame/blockly_helper";

describe('message', () => {

	const usbblock: any|Block = {
		id: 'blockId',
		type: 'send_message'
	};

	const bluetoothSendMessageBlock: any|Block = {
		id: 'blockId',
		type: 'bt_send_message'
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

		getInputValueSpy.withArgs(usbblock, 'MESSAGE', '', previousFrame).and.returnValue('Hello World');

		const frames = send_message_block(usbblock, { location: 'loop', iteration: 1 }, previousFrame);

		expect(frames.length).toBe(1);
		const [frame] = frames;

		expect(frame.variables['fred'].value).toBe('blue');
		expect(frame.nextCommand().command).toBe('Hello World');
		expect(frame.nextCommand().type).toBe(COMMAND_TYPE.MESSAGE);
	});

	it ('should to an empty command frame if previous frame not available', () => {

		getInputValueSpy.withArgs(usbblock, 'MESSAGE', '', undefined).and.returnValue('People Cool');

		const frames = send_message_block(usbblock, { location: 'loop', iteration: 1 });

		expect(frames.length).toBe(1);
		const [frame] = frames;

		expect(frame.variables).toEqual({});
		expect(frame.nextCommand().command).toBe('People Cool');

	});

	it ('should be able to do bluetooth block as well', () => {
		getInputValueSpy.withArgs(bluetoothSendMessageBlock, 'MESSAGE', '', undefined).and.returnValue('Blue Cool');

		const [frame] = send_message_block(bluetoothSendMessageBlock, { location: 'loop', iteration: 1 });

		expect(frame.nextCommand().type).toBe(COMMAND_TYPE.BLUETOOTH_MESSAGE);
		expect(frame.nextCommand().command).toBe('Blue Cool');

	})

});

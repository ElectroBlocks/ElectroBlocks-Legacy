import 'jasmine';
import { Block } from "../frame/block";
import { ARDUINO_UNO_PINS, ArduinoFrame } from "../arduino/arduino_frame";
import { send_message_block } from "./message";
import * as blockHelperFunctions from "../frame/blockly_helper";
import { ArduinoState } from "../arduino/state/arduino.state";
import { BluetoothState } from "../arduino/state/bluetooth.state";

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

	const state = new ArduinoState([new BluetoothState(ARDUINO_UNO_PINS.PIN_6, ARDUINO_UNO_PINS.PIN_7)], {
		fred: {
			name: 'fred',
			type: 'String',
			value: 'blue'
		},
	});

	const previousFrame = new ArduinoFrame('block1', state,
		{ location: 'loop', iteration: 1 }
	);

	beforeEach(() => {
		getInputValueSpy =  spyOn(blockHelperFunctions, 'getInputValue');
	});

	it ('should use the previous frame if available', () => {

		getInputValueSpy.withArgs(usbblock, 'MESSAGE', '',{ location: 'loop', iteration: 1 }, previousFrame).and.returnValue('Hello World');

		const frames = send_message_block(usbblock, { location: 'loop', iteration: 1 }, previousFrame);

		expect(frames.length).toBe(1);
		const [frame] = frames;

		expect(frame.state.variables['fred'].value).toBe('blue');
		expect(frame.state.sendMessage).toBe('Hello World');
	});

	it ('should to an empty arduino.command frame if previous frame not available', () => {

		getInputValueSpy.withArgs(usbblock, 'MESSAGE', '',{ location: 'loop', iteration: 1 }, undefined).and.returnValue('People Cool');

		const frames = send_message_block(usbblock, { location: 'loop', iteration: 1 });

		expect(frames.length).toBe(1);
		const [frame] = frames;

		expect(frame.state.variables).toEqual({});
		expect(frame.state.sendMessage).toBe('People Cool');
	});

	it ('should be able to do bluetooth block as well', () => {

		const previousFrame = new ArduinoFrame('block_is', new ArduinoState([ new BluetoothState(ARDUINO_UNO_PINS.PIN_7, ARDUINO_UNO_PINS.PIN_9) ], {}), { iteration: 0, location: 'loop' });

		getInputValueSpy.withArgs(bluetoothSendMessageBlock, 'MESSAGE', '',{ location: 'loop', iteration: 1 }, previousFrame).and.returnValue('Blue Cool');

		const [frame] = send_message_block(bluetoothSendMessageBlock, { location: 'loop', iteration: 1 }, previousFrame);

		expect((frame.state.components[0] as BluetoothState).sendMessage).toBe('Blue Cool');

	})

});

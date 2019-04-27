import 'jasmine';
import { Block } from "../frame/block";
import { analog_write_block, digital_write_block } from "./input_output";
import { ArduinoFrame } from "../arduino/arduino_frame";
import { EmptyCommand } from "../frame/command";
import { inputState } from "../frame/input_state";
import { ARDUINO_UNO_PINS, Pin, PIN_TYPE } from "../arduino/pin";
import * as blockHelper from "../frame/blockly_helper";

describe('input output frame generators', () => {

	let block: any|Block;

	let getFieldValueSpy: any|jasmine.Spy;

	let addBlockCallSpy: any|jasmine.Spy;

	let getInputValueSpy: any|jasmine.Spy;

	beforeEach(() => {
		block = {
			getFieldValue( fieldName: string ): any {
			}
		};

		getInputValueSpy = spyOn( blockHelper, 'getInputValue' );
		addBlockCallSpy = spyOn(inputState, 'addBlockCall');
		getFieldValueSpy = spyOn(block, 'getFieldValue');
	});

	describe('digital_write_block', () => {
		it (' create a digital write high from block', () => {

			const previousFrame = new ArduinoFrame('asdf', {'hello': {
				name: 'hello', type: 'String', value: 'Hello'
				}}, [], new EmptyCommand(), { location: 'loop', iteration: 0 });

			getFieldValueSpy.withArgs('PIN').and.returnValue('3');
			getFieldValueSpy.withArgs('STATE').and.returnValue('ON');

			const [frame] = digital_write_block(block, {location: 'loop', iteration: 3 }, previousFrame);

			expect(frame.nextCommand().command).toBe('M-P-D:3:1|');
			expect(frame.variables['hello'].name).toBe('hello');
			expect(frame.variables['hello'].value).toBe('Hello');
			expect(frame.variables['hello'].type).toBe('String');
		});

		it('should create a digital write frame that has the led off', () => {
			getFieldValueSpy.withArgs('PIN').and.returnValue('3');
			getFieldValueSpy.withArgs('STATE').and.returnValue('OFF');

			const [frame] = digital_write_block(block, {location: 'loop', iteration: 3 });

			expect(frame.nextCommand().command).toBe('M-P-D:3:0|');

		});

		it ('should not generate another component but replace the old one if it exists', () => {

			getFieldValueSpy.withArgs('PIN').and.returnValue('1');

			const previousFrame = new ArduinoFrame('asdf', {'hello': {
					name: 'hello', type: 'String', value: 'Hello'
				}}, [new Pin(ARDUINO_UNO_PINS.PIN_1, PIN_TYPE.ANALOG, 30)], new EmptyCommand(), { location: 'loop', iteration: 0 });

			getInputValueSpy.withArgs(block, 'WRITE_VALUE', 0, previousFrame).and.returnValue(130);

			const [frame] =
				analog_write_block(block, {location: 'loop', iteration: 3 }, previousFrame);

			expect(frame.components.length).toBe(1);
			expect(frame.components[0].usbCommand().command).toBe('M-P-A:1:130|');
		});
	});

});

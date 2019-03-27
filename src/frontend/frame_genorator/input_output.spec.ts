import 'jasmine';
import { Block } from "../frame/block";
import { digital_write_block } from "./input_output";
import { ArduinoFrame } from "../arduino/arduino_frame";
import { EmptyCommand } from "../frame/command";

describe('input output frame generators', () => {

	let block: any|Block;

	let getFieldValueSpy: any|jasmine.Spy;

	beforeEach(() => {
		block = {
			getFieldValue( fieldName: string ): any {
			}
		}

		getFieldValueSpy = spyOn(block, 'getFieldValue');
	});

	describe('digital_write_block', () => {
		it (' create a digital write high from block', () => {

			const previousFrame = new ArduinoFrame('asdf', {'hello': {
				name: 'hello', type: 'String', value: 'Hello'
				}}, [], new EmptyCommand());

			getFieldValueSpy.withArgs('PIN').and.returnValue('3');
			getFieldValueSpy.withArgs('STATE').and.returnValue('ON');

			const [frame] = digital_write_block(block, previousFrame);

			expect(frame.nextCommand().command).toBe('M-P-D:3:1|');
			expect(frame.variables['hello'].name).toBe('hello');
			expect(frame.variables['hello'].value).toBe('Hello');
			expect(frame.variables['hello'].type).toBe('String');
		});

		it('should create a digital write frame that has the led off', () => {
			getFieldValueSpy.withArgs('PIN').and.returnValue('3');
			getFieldValueSpy.withArgs('STATE').and.returnValue('OFF');

			const [frame] = digital_write_block(block);

			expect(frame.nextCommand().command).toBe('M-P-D:3:0|');

		});
	});
});

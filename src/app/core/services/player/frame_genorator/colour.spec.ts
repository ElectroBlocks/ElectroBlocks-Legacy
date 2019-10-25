import { Block } from 'blockly';
import { ArduinoFrame } from '../arduino/arduino_frame';
import * as blockHelperFunctions from '../frame/blockly_helper';
import { colour_picker_block, colour_random_block, colour_rgb_block } from './color_blocks';
import { ArduinoState } from '../arduino/state/arduino.state';

describe('Color Blocks', () => {

	const frameLocation = { location: 'loop', iteration: 3 };

	let block: any|Block;

	let previousFrame: ArduinoFrame;

	let getInputValueSpy:  jasmine.Spy;

	let getFieldValueSpy: jasmine.Spy;


	beforeEach(() => {
		previousFrame =
			new ArduinoFrame( 'block_id', ArduinoState.makeEmptyState(), frameLocation );

		getInputValueSpy = spyOn( blockHelperFunctions, 'getInputValue' );

		block = {
			getFieldValue( fieldName: string ): any {

			}
		};

		getFieldValueSpy = spyOn(block, 'getFieldValue');
	});

	describe('colour_picker_block', () => {

		it('should take hex value from the color picker and change to rgb object', () => {

			getFieldValueSpy.withArgs('COLOUR').and.returnValue('#1751AA');

			expect(colour_picker_block(block, frameLocation)).toEqual({
				red: 23,
				green: 81,
				blue: 170
			});

		});

	});

	describe('colour_random_block', () => {

		it('should create a random colour value', () => {

			const color = colour_random_block(block, frameLocation);

			expect(color.green).toBeLessThanOrEqual(255);
			expect(color.green).toBeGreaterThanOrEqual(0);

			expect(color.red).toBeLessThanOrEqual(255);
			expect(color.red).toBeGreaterThanOrEqual(0);

			expect(color.blue).toBeLessThanOrEqual(255);
			expect(color.blue).toBeGreaterThanOrEqual(0);

		});

	});

	describe('colour_rgb_block', () => {

		it('should get the rgb number values and parse into an object', () => {
			getInputValueSpy.withArgs(block, 'RED', 0, frameLocation, undefined).and.returnValue(90);

			getInputValueSpy.withArgs(block, 'BLUE', 0, frameLocation, undefined).and.returnValue(0);

			getInputValueSpy.withArgs(block, 'GREEN', 0, frameLocation, undefined).and.returnValue(150);

			const color = colour_rgb_block(block, frameLocation);

			expect(color.red).toBe(90);
			expect(color.green).toBe(150);
			expect(color.blue).toBe(0);

		});

	});

});

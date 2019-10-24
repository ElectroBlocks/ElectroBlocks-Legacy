import 'jasmine';
import { neo_pixel_set_color_block, neo_pixel_setup_block } from './neo-pixel';
import { Block } from 'blockly';
import * as blockHelperFunctions from '../frame/blockly_helper';
import { NeoPixelStripState } from '../arduino/state/neo_pixel_strip.state';
import { ARDUINO_UNO_PINS } from '../arduino/arduino_frame';

describe('Neo Pixel', () => {

	let getInputValueSpy:  jasmine.Spy;
	let getFieldValueSetupBlock:  jasmine.Spy;

	const setupBlock: Block|any = {
		id: 'setup',
		getFieldValue( fieldName: string ): any {
		}
	};

	const colorBlock: Block|any = {
		id: 'color',
		getFieldValue( fieldName: string ): any {
		}
	};


	beforeEach(() => {
		getInputValueSpy =  spyOn(blockHelperFunctions, 'getInputValue');
		getFieldValueSetupBlock = spyOn(setupBlock, 'getFieldValue');
	});

	it ('should setup the neo pixel component', () => {

		getFieldValueSetupBlock.withArgs('NUMBER_LEDS').and.returnValue(30);

		getFieldValueSetupBlock.withArgs('PIN').and.returnValue('A0');

		const [frame] = neo_pixel_setup_block(setupBlock, { location: 'pre-setup', iteration: 0 });

		const ledStrip = frame.state.components.find(component => component instanceof NeoPixelStripState) as NeoPixelStripState;

		expect(ledStrip.numberOfLeds).toBe(30);
		expect(ledStrip.analogPin).toBe(ARDUINO_UNO_PINS.PIN_A0);
	});

	it ('should be able to set neo pixel colors on the strip', () => {

		getFieldValueSetupBlock.withArgs('NUMBER_LEDS').and.returnValue(30);

		getFieldValueSetupBlock.withArgs('PIN').and.returnValue('A0');

		const [previousFrame] = neo_pixel_setup_block(setupBlock, { location: 'pre-setup', iteration: 0 });

		getInputValueSpy.withArgs(colorBlock, 'COLOR', { red: 33, green: 0, blue: 0 }, {iteration: 0, location: 'loop'}, previousFrame).and.returnValue({ red: 140, green: 0, blue: 0 });

		getInputValueSpy.withArgs(colorBlock, 'POSITION', 1, {iteration: 0, location: 'loop'}, previousFrame).and.returnValue(20);

		const [frame1] = neo_pixel_set_color_block(colorBlock, {iteration: 0, location: 'loop'}, previousFrame);

		const ledStrip = frame1.state.components.find(component => component instanceof NeoPixelStripState) as NeoPixelStripState;


		expect(ledStrip.neoPixels.find(pixel => pixel.position == 20).color).toEqual({ red: 140, green: 0, blue: 0 });

		getInputValueSpy.withArgs(colorBlock, 'COLOR', { red: 33, green: 0, blue: 0 }, {iteration: 0, location: 'loop'}, frame1).and.returnValue({ red: 0, green: 140, blue: 0 });

		getInputValueSpy.withArgs(colorBlock, 'POSITION', 1, {iteration: 0, location: 'loop'}, frame1).and.returnValue(30);

		const [frame2] = neo_pixel_set_color_block(colorBlock, {iteration: 0, location: 'loop'}, frame1);

		const ledStrip2 = frame2.state.components.find(component => component instanceof NeoPixelStripState) as NeoPixelStripState;


		expect(ledStrip2.neoPixels.find(pixel => pixel.position == 20).color).toEqual({ red: 140, green: 0, blue: 0 });
		expect(ledStrip2.neoPixels.find(pixel => pixel.position == 30).color).toEqual({ red: 0, green: 140, blue: 0 });

		getInputValueSpy.withArgs(colorBlock, 'COLOR', { red: 33, green: 0, blue: 0 }, {iteration: 0, location: 'loop'}, frame2).and.returnValue({ red: 0, green: 0, blue: 140 });

		getInputValueSpy.withArgs(colorBlock, 'POSITION', 1, {iteration: 0, location: 'loop'}, frame2).and.returnValue(20);

		const [frame3] = neo_pixel_set_color_block(colorBlock, {iteration: 0, location: 'loop'}, frame2);

		const ledStrip3 = frame3.state.components.find(component => component instanceof NeoPixelStripState) as NeoPixelStripState;


		expect(ledStrip3.neoPixels.find(pixel => pixel.position == 20).color).toEqual({ red: 0, green: 0, blue: 140 });
		expect(ledStrip3.neoPixels.find(pixel => pixel.position == 30).color).toEqual({ red: 0, green: 140, blue: 0 });

	});

});

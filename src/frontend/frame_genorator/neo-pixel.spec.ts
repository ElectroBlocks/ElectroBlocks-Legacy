import 'jasmine';
import { neo_pixel_set_color_block, neo_pixel_setup_block } from "./neo-pixel";
import { Block } from "../frame/block";
import * as blockHelperFunctions from "../frame/blockly_helper";
import { NeoPixelStrip } from "../arduino/neo_pixels";
import { COMMAND_TYPE } from "../frame/command";
import { ARDUINO_UNO_PINS } from "../arduino/pin";

describe('Neo Pixel', () => {

	let getInputValueSpy:  jasmine.Spy;
	let getFieldValueSetupBlock:  jasmine.Spy;

	let setupBlock : Block|any = {
		id: 'setup',
		getFieldValue( fieldName: string ): any {
		}
	};

	let colorBlock : Block|any = {
		id: 'color',
		getFieldValue( fieldName: string ): any {
		}
	};


	beforeEach(() => {
		getInputValueSpy =  spyOn(blockHelperFunctions, 'getInputValue');
		getFieldValueSetupBlock = spyOn(setupBlock, 'getFieldValue');
	});

	it ('should setup the neo pixel component', () => {

		getInputValueSpy.withArgs(setupBlock, 'NUMBER_LEDS', 30, undefined).and.returnValue(30);

		getFieldValueSetupBlock.withArgs('PIN').and.returnValue('A0');

		const [frame] = neo_pixel_setup_block(setupBlock, { location: 'pre-setup', iteration: 0 });

		const ledStrip = frame.components.find(component => component instanceof NeoPixelStrip) as NeoPixelStrip;

		expect(frame.nextCommand().type).toBe(COMMAND_TYPE.EMPTY);
		expect(ledStrip.numberOfPixels).toBe(30);
		expect(ledStrip.pin).toBe(ARDUINO_UNO_PINS.PIN_A0);
	});

	it ('should be able to set neo pixel colors on the strip', () => {
		getInputValueSpy.withArgs(setupBlock, 'NUMBER_LEDS', 30, undefined).and.returnValue(30);

		getFieldValueSetupBlock.withArgs('PIN').and.returnValue('A0');

		const [previousFrame] = neo_pixel_setup_block(setupBlock, { location: 'pre-setup', iteration: 0 });

		getInputValueSpy.withArgs(colorBlock, 'COLOR', { red: 33, green: 0, blue: 0 }, previousFrame).and.returnValue({ red: 140, green: 0, blue: 0 });

		getInputValueSpy.withArgs(colorBlock, 'POSITION', 1, previousFrame).and.returnValue(20);

		const [frame1] = neo_pixel_set_color_block(colorBlock, {iteration: 0, location: 'loop'}, previousFrame);

		expect(frame1.nextCommand().command).toBe('M-N-140:0:0:20|');

		getInputValueSpy.withArgs(colorBlock, 'COLOR', { red: 33, green: 0, blue: 0 }, frame1).and.returnValue({ red: 0, green: 140, blue: 0 });

		getInputValueSpy.withArgs(colorBlock, 'POSITION', 1, frame1).and.returnValue(30);

		const [frame2] = neo_pixel_set_color_block(colorBlock, {iteration: 0, location: 'loop'}, frame1);

		expect(frame2.nextCommand().command).toBe('M-N-140:0:0:20|M-N-0:140:0:30|');

		getInputValueSpy.withArgs(colorBlock, 'COLOR', { red: 33, green: 0, blue: 0 }, frame2).and.returnValue({ red: 0, green: 0, blue: 140 });

		getInputValueSpy.withArgs(colorBlock, 'POSITION', 1, frame2).and.returnValue(20);

		const [frame3] = neo_pixel_set_color_block(colorBlock, {iteration: 0, location: 'loop'}, frame2);

		expect(frame3.nextCommand().command).toBe('M-N-0:0:140:20|M-N-0:140:0:30|');

	});

});

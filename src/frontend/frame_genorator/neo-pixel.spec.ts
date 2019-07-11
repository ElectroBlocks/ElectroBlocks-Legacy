import 'jasmine';
import { neo_pixel_set_color_block, neo_pixel_setup_block } from "./neo-pixel";
import { Block } from "../frame/block";
import * as blockHelperFunctions from "../frame/blockly_helper";
import { ARDUINO_UNO_PINS } from "../arduino/pin";
import { NeoPixelStripState } from "../arduino/state/neo_pixel_strip.state";
import { ActionType } from "../frame/action.type";

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

		getInputValueSpy.withArgs(setupBlock, 'NUMBER_LEDS', 30,{ location: 'pre-setup', iteration: 0 }, undefined).and.returnValue(30);

		getFieldValueSetupBlock.withArgs('PIN').and.returnValue('A0');

		const [frame] = neo_pixel_setup_block(setupBlock, { location: 'pre-setup', iteration: 0 });

		const ledStrip = frame.state.components.find(component => component instanceof NeoPixelStripState) as NeoPixelStripState;

		expect(frame.actionType).toBe(ActionType.EMPTY);
		expect(ledStrip.numberOfLeds).toBe(30);
		expect(ledStrip.analogPin).toBe(ARDUINO_UNO_PINS.PIN_A0);
	});

	it ('should be able to set neo pixel colors on the strip', () => {
		getInputValueSpy.withArgs(setupBlock, 'NUMBER_LEDS', 30,{ location: 'pre-setup', iteration: 0 }, undefined).and.returnValue(30);

		getFieldValueSetupBlock.withArgs('PIN').and.returnValue('A0');

		const [previousFrame] = neo_pixel_setup_block(setupBlock, { location: 'pre-setup', iteration: 0 });

		getInputValueSpy.withArgs(colorBlock, 'COLOR', { red: 33, green: 0, blue: 0 }, {iteration: 0, location: 'loop'}, previousFrame).and.returnValue({ red: 140, green: 0, blue: 0 });

		getInputValueSpy.withArgs(colorBlock, 'POSITION', 1, {iteration: 0, location: 'loop'}, previousFrame).and.returnValue(20);

		const [frame1] = neo_pixel_set_color_block(colorBlock, {iteration: 0, location: 'loop'}, previousFrame);

		const ledStrip = frame1.state.components.find(component => component instanceof NeoPixelStripState) as NeoPixelStripState;


		expect(ledStrip.neoPixels[0].color).toBe({ red: 140, green: 0, blue: 0 });

		getInputValueSpy.withArgs(colorBlock, 'COLOR', { red: 33, green: 0, blue: 0 }, {iteration: 0, location: 'loop'}, frame1).and.returnValue({ red: 0, green: 140, blue: 0 });

		getInputValueSpy.withArgs(colorBlock, 'POSITION', 1, {iteration: 0, location: 'loop'}, frame1).and.returnValue(30);

		const [frame2] = neo_pixel_set_color_block(colorBlock, {iteration: 0, location: 'loop'}, frame1);

		const ledStrip2 = frame2.state.components.find(component => component instanceof NeoPixelStripState) as NeoPixelStripState;


		expect(ledStrip2.neoPixels[0].color).toBe({ red: 140, green: 0, blue: 0 });
		expect(ledStrip2.neoPixels[1].color).toBe({ red: 0, green: 140, blue: 0 });

		getInputValueSpy.withArgs(colorBlock, 'COLOR', { red: 33, green: 0, blue: 0 }, {iteration: 0, location: 'loop'}, frame2).and.returnValue({ red: 0, green: 0, blue: 140 });

		getInputValueSpy.withArgs(colorBlock, 'POSITION', 1, {iteration: 0, location: 'loop'}, frame2).and.returnValue(20);

		const [frame3] = neo_pixel_set_color_block(colorBlock, {iteration: 0, location: 'loop'}, frame2);

		const ledStrip3 = frame2.state.components.find(component => component instanceof NeoPixelStripState) as NeoPixelStripState;


		expect(ledStrip3.neoPixels[0].color).toBe({ red: 140, green: 0, blue: 0 });
		expect(ledStrip3.neoPixels[1].color).toBe({ red: 0, green: 0, blue: 140 });

	});

});

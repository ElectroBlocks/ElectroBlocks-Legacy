import 'jasmine';
import { Block } from "../frame/block";
import * as blockHelper from "../frame/blockly_helper";
import { LCD_SCREEN_MEMORY_TYPE, LCDScreen } from "../arduino/lcd_screen";
import {
	lcd_screen_simple_print_block,
	lcd_setup_block,
	lcd_screen_clear_block,
	lcd_screen_blink_block, lcd_backlight_block
} from "./lcd_screen";

describe('LCD Screen', () => {

	let block: any|Block;

	let lcdBlock: any|Block;

	let blockGetFieldValueSpy: jasmine.Spy;

	let lcdBlockGetFieldValueSpy: jasmine.Spy;

	let getInputValueSpy: jasmine.Spy;

	beforeEach(() => {
		block =  {
			id: 'setup_lcd_block',
			getFieldValue( fieldName: string ): any {
			}
		};

		lcdBlock = {
			id: 'lcd_print_block',
			getFieldValue( fieldName: string ): any {
			}
		};

		blockGetFieldValueSpy = spyOn(block, 'getFieldValue');

		lcdBlockGetFieldValueSpy = spyOn(lcdBlock, 'getFieldValue');

		getInputValueSpy = spyOn(blockHelper, 'getInputValue');
	});


	it ('lcd_setup_block should setup lcd', () => {

		blockGetFieldValueSpy.withArgs('MEMORY_TYPE').and.returnValue(LCD_SCREEN_MEMORY_TYPE.OX3F);

		getInputValueSpy.withArgs(block, 'ROWS', 2, undefined).and.returnValue(4);

		getInputValueSpy.withArgs(block, 'COLUMNS', 16, undefined).and.returnValue(20);

		const [frame] =
			lcd_setup_block(block, { location: 'pre-setup', iteration: 0 });

		const [lcdScreen] = frame.components;

		expect(lcdScreen instanceof LCDScreen).toBeTruthy();

		expect(frame.setupCommandUSB().command).toBe('S-1-L:0x3F:4:20|');
	});

	it ('lcd_screen_simple_print_block should print ', () => {

		blockGetFieldValueSpy.withArgs('MEMORY_TYPE').and.returnValue(LCD_SCREEN_MEMORY_TYPE.OX3F);

		getInputValueSpy.withArgs(block, 'ROWS', 2, undefined).and.returnValue(4);

		getInputValueSpy.withArgs(block, 'COLUMNS', 16, undefined).and.returnValue(20);

		const [previousFrame] =
			lcd_setup_block(block, { location: 'pre-setup', iteration: 0 });

		getInputValueSpy.withArgs(lcdBlock, 'ROW_1', '', previousFrame).and.returnValue('Hello');


		getInputValueSpy.withArgs(lcdBlock, 'ROW_2', '', previousFrame).and.returnValue('World');

		getInputValueSpy.withArgs(lcdBlock, 'ROW_3', '', previousFrame).and.returnValue('');

		getInputValueSpy.withArgs(lcdBlock, 'ROW_4', '', previousFrame).and.returnValue('');


		const [frame] = lcd_screen_simple_print_block(lcdBlock, { location: 'loop', iteration: 2 }, previousFrame);

		expect(frame.nextCommand().command).toBe('M-L-Hello               :World               :                    :                    |');
	});

	it ('should be able to clear the screen', () => {
		blockGetFieldValueSpy.withArgs('MEMORY_TYPE')
			.and.returnValue(LCD_SCREEN_MEMORY_TYPE.OX3F);

		getInputValueSpy.withArgs(block, 'ROWS', 2, undefined).and.returnValue(4);

		getInputValueSpy.withArgs(block, 'COLUMNS', 16, undefined).and.returnValue(20);

		const [previousFrame] =
			lcd_setup_block(block, { location: 'pre-setup', iteration: 0 });

		const [frame] = lcd_screen_clear_block(lcdBlock, { location: 'loop', iteration: 2 }, previousFrame);

		expect(frame.nextCommand().command).toBe('M-L-C:0|');
	});

	it ('should be able to make square on the led blink', () => {

		blockGetFieldValueSpy.withArgs('MEMORY_TYPE').and.returnValue(LCD_SCREEN_MEMORY_TYPE.OX3F);

		getInputValueSpy.withArgs(block, 'ROWS', 2, undefined).and.returnValue(4);

		getInputValueSpy.withArgs(block, 'COLUMNS', 16, undefined).and.returnValue(20);

		const [previousFrame] =
			lcd_setup_block(block, { location: 'pre-setup', iteration: 0 });

		getInputValueSpy.withArgs(lcdBlock, 'ROW', 0, previousFrame).and.returnValue(3);

		getInputValueSpy.withArgs(lcdBlock, 'COLUMN', 0, previousFrame).and.returnValue(12);

		lcdBlockGetFieldValueSpy.withArgs('NAME').and.returnValue('BLINK');

		const [frame] = lcd_screen_blink_block(lcdBlock, { location: 'loop', iteration: 2 }, previousFrame);

		expect(frame.nextCommand().command).toBe('M-L-B:3:12:1|')
	});

	it ('should be able to turn on off the lcd screen back light', () => {

		blockGetFieldValueSpy.withArgs('MEMORY_TYPE').and.returnValue(LCD_SCREEN_MEMORY_TYPE.OX3F);

		getInputValueSpy.withArgs(block, 'ROWS', 2, undefined).and.returnValue(4);

		getInputValueSpy.withArgs(block, 'COLUMNS', 16, undefined).and.returnValue(20);

		const [previousFrame] =
			lcd_setup_block(block, { location: 'pre-setup', iteration: 0 });

		lcdBlockGetFieldValueSpy.withArgs('BACKLIGHT').and.returnValue('ON');

		const [frame] = lcd_backlight_block(lcdBlock, { location: 'loop', iteration: 2 }, previousFrame);


		expect(frame.nextCommand().command).toBe('M-L-L:1|');


	});
});

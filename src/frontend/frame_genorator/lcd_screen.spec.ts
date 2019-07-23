import 'jasmine';
import { Block } from "../frame/block";
import * as blockHelper from "../frame/blockly_helper";
import {
	lcd_backlight_block,
	lcd_screen_blink_block,
	lcd_screen_clear_block,
	lcd_screen_print_block,
	lcd_screen_simple_print_block,
	lcd_setup_block
} from "./lcd_screen";
import { LCD_SCREEN_MEMORY_TYPE, LCDScreenState } from "../arduino/state/lcd_screen.state";
import { ActionType } from "../frame/action.type";

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

		getInputValueSpy.withArgs(block, 'ROWS', 2, { location: 'pre-setup', iteration: 0 }, undefined).and.returnValue(4);

		getInputValueSpy.withArgs(block, 'COLUMNS', 16, { location: 'pre-setup', iteration: 0 },  undefined).and.returnValue(20);

		const [frame] =
			lcd_setup_block(block, { location: 'pre-setup', iteration: 0 });

		const lcdScreenState  = frame.state.components[0] as LCDScreenState;

		expect(lcdScreenState instanceof LCDScreenState).toBeTruthy();

		expect(lcdScreenState.rows).toBe(4);
		expect(lcdScreenState.columns).toBe(20);
		expect(lcdScreenState.memoryType).toBe(LCD_SCREEN_MEMORY_TYPE.OX3F);

		expect(frame.actionType).toBe(ActionType.EMPTY);
	});

	it ('lcd_screen_simple_print_block should print ', () => {

		blockGetFieldValueSpy.withArgs('MEMORY_TYPE').and.returnValue(LCD_SCREEN_MEMORY_TYPE.OX3F);

		getInputValueSpy.withArgs(block, 'ROWS', 2,{ location: 'pre-setup', iteration: 0 }, undefined).and.returnValue(4);

		getInputValueSpy.withArgs(block, 'COLUMNS', 16,{ location: 'pre-setup', iteration: 0 }, undefined).and.returnValue(20);

		const [previousFrame] =
			lcd_setup_block(block, { location: 'pre-setup', iteration: 0 });

		getInputValueSpy.withArgs(lcdBlock, 'ROW_1', '', { location: 'loop', iteration: 2 }, previousFrame).and.returnValue('Hello');


		getInputValueSpy.withArgs(lcdBlock, 'ROW_2', '',{ location: 'loop', iteration: 2 }, previousFrame).and.returnValue('World');

		getInputValueSpy.withArgs(lcdBlock, 'ROW_3', '',{ location: 'loop', iteration: 2 }, previousFrame).and.returnValue('');

		getInputValueSpy.withArgs(lcdBlock, 'ROW_4', '',{ location: 'loop', iteration: 2 }, previousFrame).and.returnValue('');


		const [frame] = lcd_screen_simple_print_block(lcdBlock, { location: 'loop', iteration: 2 }, previousFrame);

		const lcdScreenState = frame.state.components.find(component => component instanceof LCDScreenState) as LCDScreenState;

		expect(lcdScreenState.rowsOfText[0]).toBe('Hello               ');
		expect(lcdScreenState.rowsOfText[1]).toBe('World               ');
		expect(lcdScreenState.rowsOfText[2]).toBe('                    ');
		expect(lcdScreenState.rowsOfText[3]).toBe('                    ');
		expect(frame.actionType).toBe(ActionType.LCD_SCREEN_PRINT);
	});

	it ('should be able to clear the screen', () => {
		blockGetFieldValueSpy.withArgs('MEMORY_TYPE')
			.and.returnValue(LCD_SCREEN_MEMORY_TYPE.OX3F);

		getInputValueSpy.withArgs(block, 'ROWS', 2,{ location: 'pre-setup', iteration: 0 }, undefined).and.returnValue(4);

		getInputValueSpy.withArgs(block, 'COLUMNS', 16, { location: 'pre-setup', iteration: 0 }, undefined).and.returnValue(20);

		const [previousFrame] =
			lcd_setup_block(block, { location: 'pre-setup', iteration: 0 });

		const [frame] = lcd_screen_clear_block(lcdBlock, { location: 'loop', iteration: 2 }, previousFrame);

		expect(frame.actionType).toBe(ActionType.LCD_SCREEN_CLEAR);
		const lcdScreenState = frame.state.components.find(component => component instanceof LCDScreenState) as LCDScreenState;
		expect(lcdScreenState.rowsOfText[0]).toBe('                    ');
		expect(lcdScreenState.rowsOfText[1]).toBe('                    ');
		expect(lcdScreenState.rowsOfText[2]).toBe('                    ');
		expect(lcdScreenState.rowsOfText[3]).toBe('                    ');
	});

	it ('should be able to make square on the led blink', () => {

		blockGetFieldValueSpy.withArgs('MEMORY_TYPE').and.returnValue(LCD_SCREEN_MEMORY_TYPE.OX3F);

		getInputValueSpy.withArgs(block, 'ROWS', 2, { location: 'pre-setup', iteration: 0 }, undefined).and.returnValue(4);

		getInputValueSpy.withArgs(block, 'COLUMNS', 16,{ location: 'pre-setup', iteration: 0 }, undefined).and.returnValue(20);

		const [previousFrame] =
			lcd_setup_block(block, { location: 'pre-setup', iteration: 0 });

		getInputValueSpy.withArgs(lcdBlock, 'ROW', 0, { location: 'loop', iteration: 2 }, previousFrame).and.returnValue(3);

		getInputValueSpy.withArgs(lcdBlock, 'COLUMN', 0, { location: 'loop', iteration: 2 }, previousFrame).and.returnValue(12);

		lcdBlockGetFieldValueSpy.withArgs('NAME').and.returnValue('BLINK');

		const [frame] = lcd_screen_blink_block(lcdBlock, { location: 'loop', iteration: 2 }, previousFrame);

		expect(frame.actionType).toBe(ActionType.LCD_SCREEN_BLINK);

		const lcdScreenState = frame.state.components.find(component => component instanceof LCDScreenState) as LCDScreenState;
		expect(lcdScreenState.blink.column).toBe(12);
		expect(lcdScreenState.blink.row).toBe(3);
		expect(lcdScreenState.blink.blinking).toBeTruthy();
	});

	it ('should be able to turn on off the lcd screen back light', () => {

		blockGetFieldValueSpy.withArgs('MEMORY_TYPE').and.returnValue(LCD_SCREEN_MEMORY_TYPE.OX3F);

		getInputValueSpy.withArgs(block, 'ROWS', 2, { location: 'pre-setup', iteration: 0 }, undefined).and.returnValue(4);

		getInputValueSpy.withArgs(block, 'COLUMNS', 16, { location: 'pre-setup', iteration: 0 }, undefined).and.returnValue(20);

		const [previousFrame] =
			lcd_setup_block(block, { location: 'pre-setup', iteration: 0 });

		lcdBlockGetFieldValueSpy.withArgs('BACKLIGHT').and.returnValue('ON');

		const [frame] = lcd_backlight_block(lcdBlock, { location: 'loop', iteration: 2 }, previousFrame);

		expect(frame.actionType).toBe(ActionType.LCD_SCREEN_BACK_LIGHT);

		const lcdScreenState = frame.state.components.find(component => component instanceof LCDScreenState) as LCDScreenState;

		expect(lcdScreenState.backLightOn).toBeTruthy();
	});

	it ('lcd_screen_print_block it should print', () => {
		blockGetFieldValueSpy.withArgs('MEMORY_TYPE').and.returnValue(LCD_SCREEN_MEMORY_TYPE.OX3F);

		getInputValueSpy.withArgs(block, 'ROWS', 2, { location: 'pre-setup', iteration: 0 }, undefined).and.returnValue(4);

		getInputValueSpy.withArgs(block, 'COLUMNS', 16, { location: 'pre-setup', iteration: 0 }, undefined).and.returnValue(20);

		const [previousFrame] =
			lcd_setup_block(block, { location: 'pre-setup', iteration: 0 });
		
		getInputValueSpy.withArgs(lcdBlock, 'ROW_1', '',{ location: 'loop', iteration: 2 }, previousFrame).and.returnValue('Hello');

		getInputValueSpy.withArgs(lcdBlock, 'ROW_2', '',{ location: 'loop', iteration: 2 }, previousFrame).and.returnValue('World');

		getInputValueSpy.withArgs(lcdBlock, 'ROW_3', '',{ location: 'loop', iteration: 2 }, previousFrame).and.returnValue('');

		getInputValueSpy.withArgs(lcdBlock, 'ROW_4', '',{ location: 'loop', iteration: 2 }, previousFrame).and.returnValue('');
	

		const [frame] = lcd_screen_simple_print_block(lcdBlock, { location: 'loop', iteration: 2 }, previousFrame);

		getInputValueSpy.withArgs(lcdBlock, 'ROW', 0, { location: 'loop', iteration: 2 }, frame).and.returnValue(0);

		getInputValueSpy.withArgs(lcdBlock, 'COLUMN',  0,{ location: 'loop', iteration: 2 }, frame).and.returnValue(0);

		getInputValueSpy.withArgs(lcdBlock, 'PRINT', '', { location: 'loop', iteration: 2 }, frame).and.returnValue('World');

		const [simplePrintScreenFrame] = lcd_screen_print_block(lcdBlock, { location: 'loop', iteration: 2 }, frame);

		const lcdScreenState = simplePrintScreenFrame.state.components.find(component => component instanceof LCDScreenState) as LCDScreenState;

		expect(lcdScreenState.rowsOfText[0]).toBe('World               ');
		expect(lcdScreenState.rowsOfText[1]).toBe('World               ');
		expect(lcdScreenState.rowsOfText[2]).toBe('                    ');
		expect(lcdScreenState.rowsOfText[3]).toBe('                    ');

		expect(simplePrintScreenFrame.actionType).toBe(ActionType.LCD_SCREEN_PRINT);
	});
});

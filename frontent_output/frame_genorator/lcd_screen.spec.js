"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jasmine");
const blockHelper = require("../frame/blockly_helper");
const lcd_screen_1 = require("../arduino/lcd_screen");
const lcd_screen_2 = require("./lcd_screen");
describe('LCD Screen', () => {
    let block;
    let lcdBlock;
    let blockGetFieldValueSpy;
    let lcdBlockGetFieldValueSpy;
    let getInputValueSpy;
    beforeEach(() => {
        block = {
            id: 'setup_lcd_block',
            getFieldValue(fieldName) {
            }
        };
        lcdBlock = {
            id: 'lcd_print_block',
            getFieldValue(fieldName) {
            }
        };
        blockGetFieldValueSpy = spyOn(block, 'getFieldValue');
        lcdBlockGetFieldValueSpy = spyOn(lcdBlock, 'getFieldValue');
        getInputValueSpy = spyOn(blockHelper, 'getInputValue');
    });
    it('lcd_setup_block should setup lcd', () => {
        blockGetFieldValueSpy.withArgs('MEMORY_TYPE').and.returnValue(lcd_screen_1.LCD_SCREEN_MEMORY_TYPE.OX3F);
        getInputValueSpy.withArgs(block, 'ROWS', 2, undefined).and.returnValue(4);
        getInputValueSpy.withArgs(block, 'COLUMNS', 16, undefined).and.returnValue(20);
        const [frame] = lcd_screen_2.lcd_setup_block(block, { location: 'pre-setup', iteration: 0 });
        const [lcdScreen] = frame.components;
        expect(lcdScreen instanceof lcd_screen_1.LCDScreen).toBeTruthy();
        expect(frame.setupCommandUSB().command).toBe('S-1-L:0x3F:4:20|');
    });
    it('lcd_screen_simple_print_block should print ', () => {
        blockGetFieldValueSpy.withArgs('MEMORY_TYPE').and.returnValue(lcd_screen_1.LCD_SCREEN_MEMORY_TYPE.OX3F);
        getInputValueSpy.withArgs(block, 'ROWS', 2, undefined).and.returnValue(4);
        getInputValueSpy.withArgs(block, 'COLUMNS', 16, undefined).and.returnValue(20);
        const [previousFrame] = lcd_screen_2.lcd_setup_block(block, { location: 'pre-setup', iteration: 0 });
        getInputValueSpy.withArgs(lcdBlock, 'ROW_1', '', previousFrame).and.returnValue('Hello');
        getInputValueSpy.withArgs(lcdBlock, 'ROW_2', '', previousFrame).and.returnValue('World');
        getInputValueSpy.withArgs(lcdBlock, 'ROW_3', '', previousFrame).and.returnValue('');
        getInputValueSpy.withArgs(lcdBlock, 'ROW_4', '', previousFrame).and.returnValue('');
        const [frame] = lcd_screen_2.lcd_screen_simple_print_block(lcdBlock, { location: 'loop', iteration: 2 }, previousFrame);
        expect(frame.nextCommand().command).toBe('M-L-Hello               :World               :                    :                    |');
    });
    it('should be able to clear the screen', () => {
        blockGetFieldValueSpy.withArgs('MEMORY_TYPE')
            .and.returnValue(lcd_screen_1.LCD_SCREEN_MEMORY_TYPE.OX3F);
        getInputValueSpy.withArgs(block, 'ROWS', 2, undefined).and.returnValue(4);
        getInputValueSpy.withArgs(block, 'COLUMNS', 16, undefined).and.returnValue(20);
        const [previousFrame] = lcd_screen_2.lcd_setup_block(block, { location: 'pre-setup', iteration: 0 });
        const [frame] = lcd_screen_2.lcd_screen_clear_block(lcdBlock, { location: 'loop', iteration: 2 }, previousFrame);
        expect(frame.nextCommand().command).toBe('M-L-C:0|');
    });
    it('should be able to make square on the led blink', () => {
        blockGetFieldValueSpy.withArgs('MEMORY_TYPE').and.returnValue(lcd_screen_1.LCD_SCREEN_MEMORY_TYPE.OX3F);
        getInputValueSpy.withArgs(block, 'ROWS', 2, undefined).and.returnValue(4);
        getInputValueSpy.withArgs(block, 'COLUMNS', 16, undefined).and.returnValue(20);
        const [previousFrame] = lcd_screen_2.lcd_setup_block(block, { location: 'pre-setup', iteration: 0 });
        getInputValueSpy.withArgs(lcdBlock, 'ROW', 0, previousFrame).and.returnValue(3);
        getInputValueSpy.withArgs(lcdBlock, 'COLUMN', 0, previousFrame).and.returnValue(12);
        lcdBlockGetFieldValueSpy.withArgs('NAME').and.returnValue('BLINK');
        const [frame] = lcd_screen_2.lcd_screen_blink_block(lcdBlock, { location: 'loop', iteration: 2 }, previousFrame);
        expect(frame.nextCommand().command).toBe('M-L-B:3:12:1|');
    });
    it('should be able to turn on off the lcd screen back light', () => {
        blockGetFieldValueSpy.withArgs('MEMORY_TYPE').and.returnValue(lcd_screen_1.LCD_SCREEN_MEMORY_TYPE.OX3F);
        getInputValueSpy.withArgs(block, 'ROWS', 2, undefined).and.returnValue(4);
        getInputValueSpy.withArgs(block, 'COLUMNS', 16, undefined).and.returnValue(20);
        const [previousFrame] = lcd_screen_2.lcd_setup_block(block, { location: 'pre-setup', iteration: 0 });
        lcdBlockGetFieldValueSpy.withArgs('BACKLIGHT').and.returnValue('ON');
        const [frame] = lcd_screen_2.lcd_backlight_block(lcdBlock, { location: 'loop', iteration: 2 }, previousFrame);
        expect(frame.nextCommand().command).toBe('M-L-L:1|');
    });
});
//# sourceMappingURL=lcd_screen.spec.js.map
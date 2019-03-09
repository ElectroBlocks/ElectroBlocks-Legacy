"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lcd_screen_1 = require("./lcd_screen");
require("jasmine");
describe('LCD Screen', () => {
    it('should print all the the number of rows in the lcd screen', () => {
        let lcd = new lcd_screen_1.LCDScreen(lcd_screen_1.LCD_SCREEN_MEMORY_TYPE.OX3F, 2, 16, ['Hello', 'World', 'PEOPLE']);
        expect(lcd.usbCommand()).toBe('M-L-Hello           :World           |');
    });
    it('should print strings with spaces', () => {
        let lcd = new lcd_screen_1.LCDScreen(lcd_screen_1.LCD_SCREEN_MEMORY_TYPE.OX3F, 4, 20, ['  Hello  ', '  World  ', '   sdafsd  asdf', ' asdf ']);
        expect(lcd.usbCommand()).toBe('M-L-  Hello             :  World             :   sdafsd  asdf     : asdf               |');
    });
    it('if all the rows are not given it should print a blank row', () => {
        let lcd = new lcd_screen_1.LCDScreen(lcd_screen_1.LCD_SCREEN_MEMORY_TYPE.OX3F, 3, 5, ['1 ', 'Blue']);
        expect(lcd.usbCommand()).toBe('M-L-1    :Blue :     |');
    });
    it('should be able to make a copy of itself', () => {
        let lcd = new lcd_screen_1.LCDScreen(lcd_screen_1.LCD_SCREEN_MEMORY_TYPE.OX3F, 3, 5, ['1 ', 'Blue']);
        let lcd2 = lcd.makeCopy();
        expect(lcd).not.toBe(lcd2);
        expect(lcd).toEqual(lcd2);
        expect(lcd.usbCommand()).toBe(lcd2.usbCommand());
    });
    it('should be able do a setup command', () => {
        let lcd = new lcd_screen_1.LCDScreen(lcd_screen_1.LCD_SCREEN_MEMORY_TYPE.OX3F, 3, 5, ['1 ', 'Blue']);
        expect(lcd.setupCommandUSB()).toBe('L:0x3F:3:5');
    });
});
//# sourceMappingURL=lcd_screen.spec.js.map
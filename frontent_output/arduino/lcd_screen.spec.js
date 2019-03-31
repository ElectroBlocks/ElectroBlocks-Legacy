"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lcd_screen_1 = require("./lcd_screen");
require("jasmine");
const command_1 = require("../frame/command");
describe('LCD Screen', () => {
    it('should print all the the number of rows in the lcd screen', () => {
        let lcd = new lcd_screen_1.LCDScreen(lcd_screen_1.LCD_SCREEN_MEMORY_TYPE.OX3F, 2, 16, ['Hello', 'World', 'PEOPLE']);
        expect(lcd.usbCommand().command).toBe('M-L-Hello           :World           |');
        expect(lcd.usbCommand().type).toBe(command_1.COMMAND_TYPE.USB);
    });
    it('should print strings with spaces', () => {
        let lcd = new lcd_screen_1.LCDScreen(lcd_screen_1.LCD_SCREEN_MEMORY_TYPE.OX3F, 4, 20, ['  Hello  ', '  World  ', '   sdafsd  asdf', ' asdf ']);
        expect(lcd.usbCommand().command).toBe('M-L-  Hello             :  World             :   sdafsd  asdf     : asdf               |');
        expect(lcd.usbCommand().type).toBe(command_1.COMMAND_TYPE.USB);
    });
    it('if all the rows are not given it should print a blank row', () => {
        let lcd = new lcd_screen_1.LCDScreen(lcd_screen_1.LCD_SCREEN_MEMORY_TYPE.OX3F, 3, 5, ['1 ', 'Blue']);
        expect(lcd.usbCommand().command).toBe('M-L-1    :Blue :     |');
        expect(lcd.usbCommand().type).toBe(command_1.COMMAND_TYPE.USB);
    });
    it('should be able to make a copy of itself', () => {
        let lcd = new lcd_screen_1.LCDScreen(lcd_screen_1.LCD_SCREEN_MEMORY_TYPE.OX3F, 3, 5, ['1 ', 'Blue']);
        let lcd2 = lcd.makeCopy();
        expect(lcd).not.toBe(lcd2);
        expect(lcd).toEqual(lcd2);
        expect(lcd.usbCommand()).toEqual(lcd2.usbCommand());
    });
    it('should be able do a setup command', () => {
        let lcd = new lcd_screen_1.LCDScreen(lcd_screen_1.LCD_SCREEN_MEMORY_TYPE.OX3F, 3, 5, ['1 ', 'Blue']);
        expect(lcd.setupCommandUSB().command).toBe('L:0x3F:3:5');
        expect(lcd.setupCommandUSB().type).toBe(command_1.COMMAND_TYPE.USB);
    });
});
//# sourceMappingURL=lcd_screen.spec.js.map
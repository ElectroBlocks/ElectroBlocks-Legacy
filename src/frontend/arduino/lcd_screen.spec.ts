import { LCD_SCREEN_MEMORY_TYPE, LCDScreen } from './lcd_screen';
import 'jasmine';
import { COMMAND_TYPE } from "../frame/command";

describe('LCD Screen', () => {
    
    it ('should print all the the number of rows in the lcd screen', () => {
        let lcd = new LCDScreen(LCD_SCREEN_MEMORY_TYPE.OX3F, 2,  16);

        expect(lcd.simplePrint(['Hello', 'World', 'PEOPLE']).command).toBe('M-L-Hello           :World           |');
        expect(lcd.simplePrint(['Hello', 'World', 'PEOPLE']).type).toBe(COMMAND_TYPE.USB);
    });

    it('should print strings with spaces', () => {
        let lcd = new LCDScreen(LCD_SCREEN_MEMORY_TYPE.OX3F,4, 20);

        expect(lcd.simplePrint(['  Hello  ', '  World  ', '   sdafsd  asdf', ' asdf ']).command).toBe('M-L-  Hello             :  World             :   sdafsd  asdf     : asdf               |');
        expect(lcd.simplePrint(['  Hello  ', '  World  ', '   sdafsd  asdf', ' asdf ']).type).toBe(COMMAND_TYPE.USB);
    });


    it('if all the rows are not given it should print a blank row', () => {
        let lcd = new LCDScreen(LCD_SCREEN_MEMORY_TYPE.OX3F,3, 5);

        expect(lcd.simplePrint(['1 ', 'Blue']).command).toBe('M-L-1    :Blue :     |');
        expect(lcd.simplePrint(['1 ', 'Blue']).type).toBe(COMMAND_TYPE.USB);
    });

    it('should be able to make a copy of itself', () => {
        let lcd = new LCDScreen(LCD_SCREEN_MEMORY_TYPE.OX3F, 3, 5);

        let lcd2 = lcd.makeCopy();

        expect(lcd).not.toBe(lcd2);
        expect(lcd).toEqual(lcd2);
        expect(lcd.simplePrint(['1 ', 'Blue'])).toEqual(lcd2.simplePrint(['1 ', 'Blue']));
    });

    it('should be able do a setup command', () => {
        let lcd = new LCDScreen(LCD_SCREEN_MEMORY_TYPE.OX3F, 3, 5);

        expect(lcd.setupCommandUSB().command).toBe('L:0x3F:3:5');
        expect(lcd.setupCommandUSB().type).toBe(COMMAND_TYPE.USB);
    });

    it('should be able to produce clear command', () => {
        let lcd = new LCDScreen(LCD_SCREEN_MEMORY_TYPE.OX3F, 3, 5);
        expect(lcd.clear().command).toBe('M-L-C:0|');
    });

    it ('should be able to produce the blink command', () => {
        let lcd = new LCDScreen(LCD_SCREEN_MEMORY_TYPE.OX3F, 3, 5);

        expect(lcd.blinkCommandLCD(1, 3, true).command).toBe('M-L-B:1:3:1|');
        expect(lcd.blinkCommandLCD(1, 3, false).command).toBe('M-L-B:1:3:0|');

    });

    it ('should be able to produce the backlight command', () => {
        let lcd = new LCDScreen(LCD_SCREEN_MEMORY_TYPE.OX3F, 3, 5);

        expect(lcd.toggleBackLight(true).command).toBe('M-L-L:1|');
        expect(lcd.toggleBackLight(false).command).toBe('M-L-L:0|');
    });
    
    it ('should be able to print in position', () => {
        let lcd = new LCDScreen(LCD_SCREEN_MEMORY_TYPE.OX3F, 3, 5);
        lcd.simplePrint(['1 ', 'Blue'])
        expect(lcd.print(1, 1, 'oom!').command).toBe('M-L-1    :Boom!:     |')
    });
});

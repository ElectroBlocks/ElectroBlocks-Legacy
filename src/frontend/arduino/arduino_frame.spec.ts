import { LCDScreen, LCD_SCREEN_MEMORY_TYPE } from './lcd_screen';
import { Servo } from './servo';
import { ArduinoFrame } from './arduino_frame';
import 'jasmine';
import { Pin, ARDUINO_UNO_PINS, PIN_TYPE } from './pin';

describe('Arduino Frame', () => {

    const frameLocation = { location: 'loop', iteration: 3 };

    let pin = new Pin(ARDUINO_UNO_PINS.PIN_12, PIN_TYPE.DIGITAL, Pin.HIGH);
    let servo = new Servo(ARDUINO_UNO_PINS.PIN_A0, 30);
    let lcdscreen = new LCDScreen(LCD_SCREEN_MEMORY_TYPE.OX3F, 4, 20);
    let variables = {};
    let simpleFrame = new ArduinoFrame('23423', variables, [pin, servo], servo.usbCommand(), frameLocation);
    let complexFrame = new ArduinoFrame('23423', variables, [lcdscreen,pin, servo], lcdscreen.simplePrint(['hello', 'world']), frameLocation);

    it ('should use the last used component to create the next command', () => {

        expect(simpleFrame.nextCommand().command).toBe('M-S-A0:30|');
        expect(complexFrame.nextCommand().command).toBe('M-L-hello               :world               :                    :                    |');

    }); 


});

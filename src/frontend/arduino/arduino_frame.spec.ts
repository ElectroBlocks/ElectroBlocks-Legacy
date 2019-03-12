import { LCDScreen, LCD_SCREEN_MEMORY_TYPE } from './lcd_screen';
import { Servo } from './servo';
import { ArduinoFrame } from './arduino_frame';
import 'jasmine';
import { Pin, ARDUINO_UNO_PINS, PIN_TYPE } from './pin';

describe('Arduino Frame', () => {

    let pin = new Pin(ARDUINO_UNO_PINS.PIN_12, PIN_TYPE.DIGITAL, Pin.HIGH);
    let servo = new Servo(ARDUINO_UNO_PINS.PIN_A0, 30);
    let lcdscreen = new LCDScreen(LCD_SCREEN_MEMORY_TYPE.OX3F, 4, 20, ['hello', 'world']);
    let variables = {};
    let simpleFrame = new ArduinoFrame('23423', variables, [pin, servo], servo);
    let complexFrame = new ArduinoFrame('23423', variables, [lcdscreen,pin, servo], lcdscreen);

    it ('should use the last used component to create the next command', () => {

        expect(simpleFrame.nextCommand()).toBe('M-S-A0:30|');
        expect(complexFrame.nextCommand()).toBe('M-L-hello               :world               :                    :                    |');

    }); 
    
    it ('should be able to go directly to the frame', () => {
        expect(simpleFrame.directFrameCommand()).toBe('M-P-D:12:1|M-S-A0:30|')
        expect(complexFrame.directFrameCommand()).toBe('S-1-L:0x3F:4:20|M-L-hello               :world               :                    :                    |M-P-D:12:1|M-S-A0:30|');
    });

});
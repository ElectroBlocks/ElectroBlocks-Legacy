"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lcd_screen_1 = require("./lcd_screen");
const servo_1 = require("./servo");
const arduino_frame_1 = require("./arduino_frame");
require("jasmine");
const pin_1 = require("./pin");
describe('Arduino Frame', () => {
    let pin = new pin_1.Pin(pin_1.ARDUINO_UNO_PINS.PIN_12, pin_1.PIN_TYPE.DIGITAL, pin_1.Pin.HIGH);
    let servo = new servo_1.Servo(pin_1.ARDUINO_UNO_PINS.PIN_A0, 30);
    let lcdscreen = new lcd_screen_1.LCDScreen(lcd_screen_1.LCD_SCREEN_MEMORY_TYPE.OX3F, 4, 20, ['hello', 'world']);
    let variables = {};
    let simpleFrame = new arduino_frame_1.ArduinoFrame('23423', variables, [pin, servo], servo);
    let complexFrame = new arduino_frame_1.ArduinoFrame('23423', variables, [lcdscreen, pin, servo], lcdscreen);
    it('should use the last used component to create the next command', () => {
        expect(simpleFrame.nextCommand()).toBe('M-S-A0:30|');
        expect(complexFrame.nextCommand()).toBe('M-L-hello               :world               :                    :                    |');
    });
    it('should be able to go directly to the frame', () => {
        expect(simpleFrame.directFrameCommand()).toBe('M-P-D:12:1|M-S-A0:30|');
        expect(complexFrame.directFrameCommand()).toBe('S-1-L:0x3F:4:20|M-L-hello               :world               :                    :                    |M-P-D:12:1|M-S-A0:30|');
    });
});
//# sourceMappingURL=arduino_frame.spec.js.map
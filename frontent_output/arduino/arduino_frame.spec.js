"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lcd_screen_1 = require("./lcd_screen");
const servo_1 = require("./servo");
const arduino_frame_1 = require("./arduino_frame");
require("jasmine");
const pin_1 = require("./pin");
describe('Arduino Frame', () => {
    const frameLocation = { location: 'loop', iteration: 3 };
    let pin = new pin_1.Pin(pin_1.ARDUINO_UNO_PINS.PIN_12, pin_1.PIN_TYPE.DIGITAL, pin_1.Pin.HIGH);
    let servo = new servo_1.Servo(pin_1.ARDUINO_UNO_PINS.PIN_A0, 30);
    let lcdscreen = new lcd_screen_1.LCDScreen(lcd_screen_1.LCD_SCREEN_MEMORY_TYPE.OX3F, 4, 20, ['hello', 'world']);
    let variables = {};
    let simpleFrame = new arduino_frame_1.ArduinoFrame('23423', variables, [pin, servo], servo.usbCommand(), frameLocation);
    let complexFrame = new arduino_frame_1.ArduinoFrame('23423', variables, [lcdscreen, pin, servo], lcdscreen.usbCommand(), frameLocation);
    it('should use the last used component to create the next command', () => {
        expect(simpleFrame.nextCommand().command).toBe('M-S-A0:30|');
        expect(complexFrame.nextCommand().command).toBe('M-L-hello               :world               :                    :                    |');
    });
    it('Should be able to navigate directly to the frame', () => {
        expect(simpleFrame.directFrameCommand()
            .map(command => command.command)
            .reduce((previous, currentValue) => previous + currentValue, '')).toBe('M-P-D:12:1|M-S-A0:30|');
        expect(complexFrame.directFrameCommand()
            .map(command => command.command)
            .reduce((previous, currentValue) => previous + currentValue, '')).toBe('S-1-L:0x3F:4:20|M-L-hello               :world               :                    :                    |M-P-D:12:1|M-S-A0:30|');
    });
});
//# sourceMappingURL=arduino_frame.spec.js.map
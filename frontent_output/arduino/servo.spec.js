"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pin_1 = require("./pin");
const servo_1 = require("./servo");
require("jasmine");
const command_1 = require("../frame/command");
describe('Servo', () => {
    it('should be able to create rotate command', () => {
        let servo = new servo_1.Servo(pin_1.ARDUINO_UNO_PINS.PIN_4, 30);
        expect(servo.usbCommand().command).toBe('M-S-4:30|');
        expect(servo.usbCommand().type).toBe(command_1.COMMAND_TYPE.USB);
    });
    it('should be able to copy itself', () => {
        let servo = new servo_1.Servo(pin_1.ARDUINO_UNO_PINS.PIN_4, 30);
        let servo2 = servo.makeCopy();
        expect(servo).toEqual(servo2);
        expect(servo).not.toBe(servo2);
    });
    it('setup command should return nothing', () => {
        let servo = new servo_1.Servo(pin_1.ARDUINO_UNO_PINS.PIN_4, 30);
        expect(servo.setupCommandUSB()).toEqual(new command_1.EmptyCommand());
    });
});
//# sourceMappingURL=servo.spec.js.map
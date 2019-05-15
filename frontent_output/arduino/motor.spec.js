"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jasmine");
const motor_1 = require("./motor");
const command_1 = require("../frame/command");
describe('Motor', () => {
    const motor1 = new motor_1.Motor(1, motor_1.MOTOR_DIRECTION.BACKWARD, 20);
    const motor2 = new motor_1.Motor(3, motor_1.MOTOR_DIRECTION.FORWARD, 120);
    it('should be not have an empty setup command', () => {
        expect(motor1.setupCommandUSB().type).toEqual(command_1.COMMAND_TYPE.EMPTY);
        expect(motor2.setupCommandUSB().type).toEqual(command_1.COMMAND_TYPE.EMPTY);
    });
    it('should have a usb command', () => {
        expect(motor1.usbCommand().command).toEqual('M-MT-1:BACKWARD:20|');
        expect(motor2.usbCommand().command).toEqual('M-MT-3:FORWARD:120|');
        expect(motor1.setupCommandUSB().type).toEqual(command_1.COMMAND_TYPE.EMPTY);
        expect(motor2.setupCommandUSB().type).toEqual(command_1.COMMAND_TYPE.EMPTY);
    });
});
//# sourceMappingURL=motor.spec.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usb_1 = require("./usb");
const command_1 = require("../frame/command");
class Servo {
    constructor(pin, angle) {
        this.pin = pin;
        this.angle = angle;
    }
    usbCommand() {
        return {
            command: `${usb_1.USB_COMMAND_TYPES.MOVE}-${usb_1.USB_COMMAND_TYPES.SERVO}-${this.pin}:${this.angle}${usb_1.USB_COMMAND_TYPES.END_OF_COMMAND}`,
            type: command_1.COMMAND_TYPE.USB
        };
    }
    setupCommandUSB() {
        return new command_1.EmptyCommand();
    }
    makeCopy() {
        return new Servo(this.pin, this.angle);
    }
}
exports.Servo = Servo;
//# sourceMappingURL=servo.js.map
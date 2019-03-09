"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usb_1 = require("./usb");
class Servo {
    constructor(pin, angle) {
        this.pin = pin;
        this.angle = angle;
    }
    usbCommand() {
        return `${usb_1.USB_COMMAND_TYPES.MOVE}-${usb_1.USB_COMMAND_TYPES.SERVO}-${this.pin}:${this.angle}${usb_1.USB_COMMAND_TYPES.END_OF_COMMAND}`;
    }
    setupCommandUSB() {
        return '';
    }
    makeCopy() {
        return new Servo(this.pin, this.angle);
    }
}
exports.Servo = Servo;
//# sourceMappingURL=servo.js.map
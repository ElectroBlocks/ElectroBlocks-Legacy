"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usb_1 = require("./usb");
const command_1 = require("../frame/command");
class Motor {
    constructor(motorNumber, direction, speed) {
        this.motorNumber = motorNumber;
        this.direction = direction;
        this.speed = speed;
    }
    setupCommandUSB() {
        return new command_1.EmptyCommand();
    }
    usbCommand() {
        return {
            type: command_1.COMMAND_TYPE.USB,
            command: `M-MT-${this.motorNumber}:${this.direction}:${this.speed}${usb_1.USB_COMMAND_TYPES.END_OF_COMMAND}`
        };
    }
    makeCopy() {
        return new Motor(this.motorNumber, this.direction, this.speed);
    }
}
exports.Motor = Motor;
var MOTOR_DIRECTION;
(function (MOTOR_DIRECTION) {
    MOTOR_DIRECTION["FORWARD"] = "FORWARD";
    MOTOR_DIRECTION["BACKWARD"] = "BACKWARD";
})(MOTOR_DIRECTION = exports.MOTOR_DIRECTION || (exports.MOTOR_DIRECTION = {}));
//# sourceMappingURL=motor.js.map
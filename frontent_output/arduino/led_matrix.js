"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usb_1 = require("./usb");
const command_1 = require("../frame/command");
class LedMatrix {
    constructor() {
        this.leds = new Array();
    }
    setLed(led) {
        let [existingLed] = this.leds.filter(currentLed => currentLed.hasSamePosition(led));
        if (!existingLed) {
            this.leds.push(led);
            return;
        }
        existingLed.isOn = led.isOn;
    }
    setupCommandUSB() {
        return {
            command: usb_1.USB_COMMAND_TYPES.LED_MATRIX,
            type: command_1.COMMAND_TYPE.USB
        };
    }
    makeCopy() {
        let matrix = new LedMatrix();
        this.leds.forEach(led => matrix.setLed(led));
        return matrix;
    }
    usbCommand() {
        let command = '';
        this.leds.forEach(led => {
            command += led.usbCommand().command;
        });
        return {
            command,
            type: command_1.COMMAND_TYPE.USB
        };
    }
}
exports.LedMatrix = LedMatrix;
class LedInMatrix {
    constructor(isOn, xPosition, yPosition) {
        this.isOn = isOn;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
    }
    hasSamePosition(led) {
        return this.xPosition == led.xPosition && this.yPosition == led.yPosition;
    }
    usbCommand() {
        const command = `${usb_1.USB_COMMAND_TYPES.MOVE}-${usb_1.USB_COMMAND_TYPES.LED_MATRIX}-${this.yPosition}:${this.xPosition}:${this.usbOnOff()}${usb_1.USB_COMMAND_TYPES.END_OF_COMMAND}`;
        return {
            type: command_1.COMMAND_TYPE.USB,
            command
        };
    }
    setupCommandUSB() {
        return new command_1.EmptyCommand();
    }
    usbOnOff() {
        return this.isOn ? 'ON' : 'OFF';
    }
}
exports.LedInMatrix = LedInMatrix;
//# sourceMappingURL=led_matrix.js.map
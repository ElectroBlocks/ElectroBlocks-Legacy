"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usb_1 = require("./usb");
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
        return usb_1.USB_COMMAND_TYPES.LED_MATRIX;
    }
    makeCopy() {
        let matrix = new LedMatrix();
        this.leds.forEach(led => matrix.setLed(led));
        return matrix;
    }
    usbCommand() {
        let command = '';
        this.leds.forEach(led => {
            command += led.usbCommand();
        });
        return command;
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
        return `${usb_1.USB_COMMAND_TYPES.MOVE}-${usb_1.USB_COMMAND_TYPES.LED_MATRIX}-${this.yPosition}:${this.xPosition}:${this.usbOnOff()}${usb_1.USB_COMMAND_TYPES.END_OF_COMMAND}`;
    }
    setupCommandUSB() {
        return '';
    }
    usbOnOff() {
        return this.isOn ? 'ON' : 'OFF';
    }
}
exports.LedInMatrix = LedInMatrix;
//# sourceMappingURL=led_matrix.js.map
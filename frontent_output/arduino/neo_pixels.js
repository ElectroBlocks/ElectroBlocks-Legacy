"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usb_1 = require("./usb");
const command_1 = require("../frame/command");
class NeoPixelStrip {
    constructor(pin, numberOfPixels) {
        this.pin = pin;
        this.numberOfPixels = numberOfPixels;
        this.leds = new Array();
    }
    setLed(neoPixel) {
        let led = this.leds.find(led => led.position == neoPixel.position);
        if (led) {
            led.color = neoPixel.color;
            return;
        }
        this.leds.push(neoPixel);
    }
    usbCommand() {
        let command = '';
        this.leds.forEach(led => {
            command += led.usbCommand().command;
        });
        return {
            type: command_1.COMMAND_TYPE.USB,
            command
        };
    }
    makeCopy() {
        let neoPixel = new NeoPixelStrip(this.pin, this.numberOfPixels);
        this.leds.forEach(led => neoPixel.setLed(led));
        return neoPixel;
    }
    setupCommandUSB() {
        return {
            command: `${usb_1.USB_COMMAND_TYPES.NEO_PIXEL}:${this.pin}:${this.numberOfPixels}`,
            type: command_1.COMMAND_TYPE.USB
        };
    }
}
exports.NeoPixelStrip = NeoPixelStrip;
class NeoPixel {
    constructor(color, position) {
        this.color = color;
        this.position = position;
    }
    usbCommand() {
        const command = `${usb_1.USB_COMMAND_TYPES.MOVE}-${usb_1.USB_COMMAND_TYPES.NEO_PIXEL}-${this.color.red}:${this.color.green}:${this.color.blue}:${this.position}${usb_1.USB_COMMAND_TYPES.END_OF_COMMAND}`;
        return {
            command,
            type: command_1.COMMAND_TYPE.USB
        };
    }
    makeCopy() {
        return new NeoPixel(this.color, this.position);
    }
    setupCommandUSB() {
        return new command_1.EmptyCommand();
    }
}
exports.NeoPixel = NeoPixel;
//# sourceMappingURL=neo_pixels.js.map
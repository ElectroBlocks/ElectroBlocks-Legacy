"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usb_1 = require("./usb");
class NeoPixelStrip {
    constructor(pin, numberOfPixels) {
        this.pin = pin;
        this.numberOfPixels = numberOfPixels;
        this.leds = new Array();
    }
    setLed(neoPixel) {
        let [led] = this.leds.filter(led => led.position == neoPixel.position);
        if (led) {
            led.color = neoPixel.color;
            return;
        }
        this.leds.push(neoPixel);
    }
    usbCommand() {
        let command = '';
        this.leds.forEach(led => {
            command += led.usbCommand();
        });
        return command;
    }
    makeCopy() {
        let neoPixel = new NeoPixelStrip(this.pin, this.numberOfPixels);
        this.leds.forEach(led => neoPixel.setLed(led));
        return neoPixel;
    }
    setupCommandUSB() {
        return `${usb_1.USB_COMMAND_TYPES.NEO_PIXEL}:${this.pin}:${this.numberOfPixels}`;
    }
}
exports.NeoPixelStrip = NeoPixelStrip;
class NeoPixel {
    constructor(color, position) {
        this.color = color;
        this.position = position;
    }
    usbCommand() {
        return `${usb_1.USB_COMMAND_TYPES.MOVE}-${usb_1.USB_COMMAND_TYPES.NEO_PIXEL}-${this.color.red}:${this.color.green}:${this.color.blue}:${this.position}${usb_1.USB_COMMAND_TYPES.END_OF_COMMAND}`;
    }
    makeCopy() {
        return new NeoPixel(this.color, this.position);
    }
    setupCommandUSB() {
        return '';
    }
}
exports.NeoPixel = NeoPixel;
//# sourceMappingURL=neo_pixels.js.map
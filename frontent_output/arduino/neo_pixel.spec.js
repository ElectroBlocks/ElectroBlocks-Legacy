"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pin_1 = require("./pin");
const neo_pixels_1 = require("./neo_pixels");
require("jasmine");
describe('Neo Pixel', () => {
    describe('NeoPixel', () => {
        it('should make usb command', () => {
            let neoPixel = new neo_pixels_1.NeoPixel({ red: 23, green: 34, blue: 44 }, 4);
            expect(neoPixel.usbCommand()).toBe('M-N-23:34:44:4|');
        });
        it('should be able to make a copy of itself', () => {
            let neoPixel = new neo_pixels_1.NeoPixel({ red: 23, green: 34, blue: 44 }, 4);
            let neoPixel2 = neoPixel.makeCopy();
            expect(neoPixel).not.toBe(neoPixel2);
            expect(neoPixel).toEqual(neoPixel);
        });
    });
    describe('NeoPixelStrip', () => {
        it('should not have duplicate led positions', () => {
            let neoPixelStrip = new neo_pixels_1.NeoPixelStrip(pin_1.ARDUINO_UNO_PINS.PIN_A0, 60);
            neoPixelStrip.setLed(new neo_pixels_1.NeoPixel({ red: 30, green: 20, blue: 0 }, 4));
            neoPixelStrip.setLed(new neo_pixels_1.NeoPixel({ red: 30, green: 40, blue: 0 }, 4));
            expect(neoPixelStrip.usbCommand()).toBe('M-N-30:40:0:4|');
        });
        it('should be able to do multiple leds', () => {
            let neoPixelStrip = new neo_pixels_1.NeoPixelStrip(pin_1.ARDUINO_UNO_PINS.PIN_A0, 30);
            neoPixelStrip.setLed(new neo_pixels_1.NeoPixel({ red: 30, green: 20, blue: 0 }, 4));
            neoPixelStrip.setLed(new neo_pixels_1.NeoPixel({ red: 40, green: 40, blue: 0 }, 5));
            expect(neoPixelStrip.usbCommand()).toBe('M-N-30:20:0:4|M-N-40:40:0:5|');
        });
        it('should be able to make copies of itself', () => {
            let neoPixelStrip = new neo_pixels_1.NeoPixelStrip(pin_1.ARDUINO_UNO_PINS.PIN_A0, 30);
            neoPixelStrip.setLed(new neo_pixels_1.NeoPixel({ red: 30, green: 20, blue: 0 }, 4));
            neoPixelStrip.setLed(new neo_pixels_1.NeoPixel({ red: 40, green: 40, blue: 0 }, 5));
            let neoPixelStrip2 = neoPixelStrip.makeCopy();
            expect(neoPixelStrip).not.toBe(neoPixelStrip2);
            expect(neoPixelStrip).toEqual(neoPixelStrip2);
            expect(neoPixelStrip.usbCommand()).toBe(neoPixelStrip2.usbCommand());
        });
        it('should create a simple setup command', () => {
            let neoPixelStrip = new neo_pixels_1.NeoPixelStrip(pin_1.ARDUINO_UNO_PINS.PIN_A0, 30);
            expect(neoPixelStrip.setupCommandUSB()).toBe('N:A0:30');
        });
    });
});
//# sourceMappingURL=neo_pixel.spec.js.map
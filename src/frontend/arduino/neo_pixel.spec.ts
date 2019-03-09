import { ARDUINO_UNO_PINS } from './pin';
import { NeoPixel, NeoPixelStrip } from './neo_pixels';
import  'jasmine';

describe('Neo Pixel', () => {

    describe('NeoPixel', () =>  {

        it('should make usb command', () => {
            let neoPixel = new NeoPixel({red: 23, green: 34, blue: 44}, 4);

            expect(neoPixel.usbCommand()).toBe('M-N-23:34:44:4|');
        });

        it('should be able to make a copy of itself', () => {
           
            let neoPixel = new NeoPixel({red: 23, green: 34, blue: 44}, 4);

            let neoPixel2 = neoPixel.makeCopy();

            expect(neoPixel).not.toBe(neoPixel2);
            expect(neoPixel).toEqual(neoPixel);
            
        });

    });

    describe('NeoPixelStrip', () => {
        
        it ('should not have duplicate led positions', () => {
            let neoPixelStrip = new NeoPixelStrip(ARDUINO_UNO_PINS.PIN_A0, 60);

            neoPixelStrip.setLed(new NeoPixel({red: 30, green: 20, blue: 0}, 4));
            neoPixelStrip.setLed(new NeoPixel({red: 30, green: 40, blue: 0}, 4));

            expect(neoPixelStrip.usbCommand()).toBe('M-N-30:40:0:4|')

        });

        it('should be able to do multiple leds', () => {
            let neoPixelStrip = new NeoPixelStrip(ARDUINO_UNO_PINS.PIN_A0, 30);

            neoPixelStrip.setLed(new NeoPixel({red: 30, green: 20, blue: 0}, 4));
            neoPixelStrip.setLed(new NeoPixel({red: 40, green: 40, blue: 0}, 5));

            expect(neoPixelStrip.usbCommand()).toBe('M-N-30:20:0:4|M-N-40:40:0:5|');

        });

        it ('should be able to make copies of itself', () => {
            let neoPixelStrip = new NeoPixelStrip(ARDUINO_UNO_PINS.PIN_A0,30);

            neoPixelStrip.setLed(new NeoPixel({red: 30, green: 20, blue: 0}, 4));
            neoPixelStrip.setLed(new NeoPixel({red: 40, green: 40, blue: 0}, 5));

            let neoPixelStrip2 = neoPixelStrip.makeCopy();

            expect(neoPixelStrip).not.toBe(neoPixelStrip2);
            expect(neoPixelStrip).toEqual(neoPixelStrip2);

            expect(neoPixelStrip.usbCommand()).toBe(neoPixelStrip2.usbCommand());

        });

        it ('should create a simple setup command', () => {
            let neoPixelStrip = new NeoPixelStrip(ARDUINO_UNO_PINS.PIN_A0,30);

            expect(neoPixelStrip.setupCommandUSB()).toBe('N:A0:30');
        });

        
    });

});
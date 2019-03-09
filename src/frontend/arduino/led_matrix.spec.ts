import { LedInMatrix, LedMatrix } from './led_matrix';
import 'jasmine';

describe('Led Matrix', () => {

    describe('LedInMatrix', () => {
        
        it('should be able to tell if another led has the same position', () => {
            let led = new LedInMatrix(false, 3, 4);
            let led2 = new LedInMatrix(true, 4, 3);
            let led3 = new LedInMatrix(true, 3, 4);

            expect(led.hasSamePosition(led3)).toBeTruthy();
            expect(led.hasSamePosition(led2)).toBeFalsy();
        });

        it ('should diplay usb string on or off', () => {
            let led = new LedInMatrix(false, 3, 4);
            expect(led.usbOnOff()).toBe('OFF');
            led.isOn = true;
            expect(led.usbOnOff()).toBe('ON');
        });

        it('should be able to create move command', () => {
            let led = new LedInMatrix(true, 3, 4);
            expect(led.usbCommand()).toBe('M-LC-4:3:ON|');

            led.isOn = false;
            expect(led.usbCommand()).toBe('M-LC-4:3:OFF|');
        });

        it ('setup command should return nothing', () => {
            let led = new LedInMatrix(true, 3, 4);
    
            expect(led.setupCommandUSB()).toBe('');
        });
    });

    describe('LedMatrix', () => {
        it ('should not be able to have duplicate leds', () => {
            let matrix = new LedMatrix();
            let led = new LedInMatrix(true, 3, 4);
            let led2 = new LedInMatrix(true, 3, 4);

            let led3 = new LedInMatrix(true, 4, 4);

            matrix.setLed(led);
            matrix.setLed(led2);
            matrix.setLed(led3);

            expect(matrix.usbCommand()).toBe('M-LC-4:3:ON|M-LC-4:4:ON|');
        });

        it ('should be able to make a copy of itself', () => {
            let matrix = new LedMatrix();
            let led = new LedInMatrix(true, 3, 4);
            let led2 = new LedInMatrix(true, 4, 4);

            matrix.setLed(led);
            matrix.setLed(led2);

            let matrix2 = matrix.makeCopy();
            expect(matrix).toEqual(matrix2);
            expect(matrix).not.toBe(matrix2);

        });

        it ('should be able to make the setup command', () => {
            let matrix = new LedMatrix();
            expect(matrix.setupCommandUSB()).toBe('LC');
        });

        
    });
});
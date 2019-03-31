"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const led_matrix_1 = require("./led_matrix");
require("jasmine");
const command_1 = require("../frame/command");
describe('Led Matrix', () => {
    describe('LedInMatrix', () => {
        it('should be able to tell if another led has the same position', () => {
            let led = new led_matrix_1.LedInMatrix(false, 3, 4);
            let led2 = new led_matrix_1.LedInMatrix(true, 4, 3);
            let led3 = new led_matrix_1.LedInMatrix(true, 3, 4);
            expect(led.hasSamePosition(led3)).toBeTruthy();
            expect(led.hasSamePosition(led2)).toBeFalsy();
        });
        it('should display usb string on or off', () => {
            let led = new led_matrix_1.LedInMatrix(false, 3, 4);
            expect(led.usbOnOff()).toBe('OFF');
            led.isOn = true;
            expect(led.usbOnOff()).toBe('ON');
        });
        it('should be able to create move command', () => {
            let led = new led_matrix_1.LedInMatrix(true, 3, 4);
            expect(led.usbCommand().command).toBe('M-LC-4:3:ON|');
            expect(led.usbCommand().type).toBe(command_1.COMMAND_TYPE.USB);
            led.isOn = false;
            expect(led.usbCommand().command).toBe('M-LC-4:3:OFF|');
            expect(led.usbCommand().type).toBe(command_1.COMMAND_TYPE.USB);
        });
        it('setup command should return nothing', () => {
            let led = new led_matrix_1.LedInMatrix(true, 3, 4);
            expect(led.setupCommandUSB()).toEqual(new command_1.EmptyCommand());
        });
    });
    describe('LedMatrix', () => {
        it('should not be able to have duplicate leds', () => {
            let matrix = new led_matrix_1.LedMatrix();
            let led = new led_matrix_1.LedInMatrix(true, 3, 4);
            let led2 = new led_matrix_1.LedInMatrix(true, 3, 4);
            let led3 = new led_matrix_1.LedInMatrix(true, 4, 4);
            matrix.setLed(led);
            matrix.setLed(led2);
            matrix.setLed(led3);
            expect(matrix.usbCommand().command).toBe('M-LC-4:3:ON|M-LC-4:4:ON|');
            expect(matrix.usbCommand().type).toBe(command_1.COMMAND_TYPE.USB);
        });
        it('should be able to make a copy of itself', () => {
            let matrix = new led_matrix_1.LedMatrix();
            let led = new led_matrix_1.LedInMatrix(true, 3, 4);
            let led2 = new led_matrix_1.LedInMatrix(true, 4, 4);
            matrix.setLed(led);
            matrix.setLed(led2);
            let matrix2 = matrix.makeCopy();
            expect(matrix).toEqual(matrix2);
            expect(matrix).not.toBe(matrix2);
        });
        it('should be able to make the setup command', () => {
            let matrix = new led_matrix_1.LedMatrix();
            expect(matrix.setupCommandUSB().command).toBe('LC');
            expect(matrix.setupCommandUSB().type).toBe(command_1.COMMAND_TYPE.USB);
        });
    });
});
//# sourceMappingURL=led_matrix.spec.js.map
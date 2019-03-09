import { ARDUINO_UNO_PINS } from './pin';
import { Servo } from './servo';
import  'jasmine';

describe('Servo', () => {

    it ('should be able to create rotate command', () => {
        let servo = new Servo(ARDUINO_UNO_PINS.PIN_4, 30);

        expect(servo.usbCommand()).toBe('M-S-4:30|');
    });

    it ('should be able to copy itself', () => {
        let servo = new Servo(ARDUINO_UNO_PINS.PIN_4, 30);

        let servo2 = servo.makeCopy();

        expect(servo).toEqual(servo2);
        expect(servo).not.toBe(servo2);
    });

    it ('setup command should return nothing', () => {
        let servo = new Servo(ARDUINO_UNO_PINS.PIN_4, 30);

        expect(servo.setupCommandUSB()).toBe('');
    });
});
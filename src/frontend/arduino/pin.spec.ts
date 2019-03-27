import { ARDUINO_UNO_PINS, Pin, PIN_TYPE } from './pin';
import 'jasmine';
import { COMMAND_TYPE, EmptyCommand } from "../frame/command";

describe('Pin Test', () => {
    it('should generate the correct command.', () => {
        let pin = new Pin(ARDUINO_UNO_PINS.PIN_12, PIN_TYPE.DIGITAL, Pin.HIGH);

        expect(pin.usbCommand().command).toBe('M-P-D:12:1|');
        expect(pin.usbCommand().type).toBe(COMMAND_TYPE.USB);

    });

    it('digital pins should only be HIGH or LOW', () => {
        let pin = new Pin(ARDUINO_UNO_PINS.PIN_3, PIN_TYPE.DIGITAL, 1000);

        expect(pin.usbCommand().command).toBe('M-P-D:3:1|');
        expect(pin.usbCommand().type).toBe(COMMAND_TYPE.USB);

        pin = new Pin(ARDUINO_UNO_PINS.PIN_3, PIN_TYPE.DIGITAL, -32);

        expect(pin.usbCommand().command).toBe('M-P-D:3:1|');
        expect(pin.usbCommand().type).toBe(COMMAND_TYPE.USB);

    });

    it('analog pin should only do positive number values', () => {
        let pin = new Pin(ARDUINO_UNO_PINS.PIN_A0, PIN_TYPE.ANALOG, -120);

        expect(pin.usbCommand().command).toBe('M-P-A:A0:120|');
        expect(pin.usbCommand().type).toBe(COMMAND_TYPE.USB);

    });

    it('it should be able to make a copy of itself', () => {
        let pin = new Pin(ARDUINO_UNO_PINS.PIN_A0, PIN_TYPE.ANALOG, -120);

        let pin2 = pin.makeCopy();

        // Asserting that they take up different memory locations
        expect(pin).not.toBe(pin2);

        // Should be the same objects
        expect(pin).toEqual(pin2);

        // Asserting that they have the same usb output
        expect(pin.usbCommand()).toEqual(pin2.usbCommand());
    });

    it ('setup command should return nothing', () => {
        let pin = new Pin(ARDUINO_UNO_PINS.PIN_A0, PIN_TYPE.ANALOG, -120);

        expect(pin.setupCommandUSB()).toEqual(new EmptyCommand());
    });
});

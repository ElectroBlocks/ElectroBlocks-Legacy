import { Copy } from './copy';
import { USB, USB_COMMAND_TYPES } from './usb';
import { ARDUINO_UNO_PINS } from './pin';

export class Servo implements USB, Copy<Servo>{
    
    constructor(public readonly pin: ARDUINO_UNO_PINS, public readonly angle: number) {}

    usbCommand(): string {
        return `${USB_COMMAND_TYPES.MOVE}-${USB_COMMAND_TYPES.SERVO}-${this.pin}:${this.angle}${USB_COMMAND_TYPES.END_OF_COMMAND}`
    }

    setupCommandUSB() {
        return '';
    }

    makeCopy() {
        return new Servo(this.pin, this.angle);
    }
} 
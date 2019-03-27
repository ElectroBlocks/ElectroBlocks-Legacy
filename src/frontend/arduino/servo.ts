import { Copy } from './copy';
import { USB, USB_COMMAND_TYPES } from './usb';
import { ARDUINO_UNO_PINS } from './pin';
import { Command, COMMAND_TYPE, EmptyCommand } from "../frame/command";

export class Servo implements USB, Copy<Servo>{
    
    constructor(public readonly pin: ARDUINO_UNO_PINS, public readonly angle: number) {}

    usbCommand(): Command {
        return{
           command: `${USB_COMMAND_TYPES.MOVE}-${USB_COMMAND_TYPES.SERVO}-${this.pin}:${this.angle}${USB_COMMAND_TYPES.END_OF_COMMAND}`,
            type: COMMAND_TYPE.USB
        };
    }

    setupCommandUSB() {
        return new EmptyCommand();
    }

    makeCopy() {
        return new Servo(this.pin, this.angle);
    }
} 

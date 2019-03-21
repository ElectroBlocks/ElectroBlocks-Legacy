import { Copy } from './copy';
import { USB, USB_COMMAND_TYPES } from './usb';

export class Pin implements USB, Copy<Pin> {

    public static readonly HIGH = 1;

    public static readonly LOW = 0;

    constructor(public readonly pinNumber: ARDUINO_UNO_PINS, public readonly type: PIN_TYPE, public readonly state: number) {}

    usbCommand(): string {
        let pinState = Math.abs(this.state);
    
        if (this.type == PIN_TYPE.DIGITAL) {
            pinState = pinState == 0 ? Pin.LOW : Pin.HIGH;        
        }
    
        return `${USB_COMMAND_TYPES.MOVE}-${USB_COMMAND_TYPES.PIN}-${this.type}:${this.pinNumber}:${pinState}${USB_COMMAND_TYPES.END_OF_COMMAND}`
    }

    setupCommandUSB() {
        return '';
    }

    makeCopy() {
        return new Pin(this.pinNumber, this.type, this.state);
    }
}

export enum PIN_TYPE { DIGITAL = 'D', ANALOG = 'A' };

export const stringToPin = (pin: string): ARDUINO_UNO_PINS => {
    const pinKey = "PIN_" + pin.toString();

    return (<any>ARDUINO_UNO_PINS)[pinKey];
};

export enum ARDUINO_UNO_PINS {
    PIN_1 = '1',
    PIN_2 = '2',
    PIN_3 = '3',
    PIN_4 = '4',
    PIN_5 = '5',
    PIN_6 = '6',
    PIN_7 = '7',
    PIN_8 = '8',
    PIN_10 = '10',
    PIN_11 = '11',
    PIN_12 = '12',
    PIN_13 = '13',
    PIN_A0 = 'A0',
    PIN_A1 = 'A1',
    PIN_A2 = 'A2',
    PIN_A3 = 'A3',
    PIN_A4 = 'A4',
    PIN_A5 = 'A5'
};

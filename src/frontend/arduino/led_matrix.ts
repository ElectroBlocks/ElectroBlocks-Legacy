import { Copy } from './copy';
import { USB, USB_COMMAND_TYPES } from './usb';

/**
 * This represents an led matrix
 */
export class LedMatrix implements  Copy<LedMatrix>, USB {

    private leds = new Array<LedInMatrix>();

    /**
     * Sets an led light on the matrix
     * @param led 
     */
    public setLed(led: LedInMatrix) {
       let [existingLed] = this.leds.filter(currentLed => currentLed.hasSamePosition(led));
       
       if (!existingLed) {
           this.leds.push(led);
           return;
       }

       existingLed.isOn = led.isOn;
    }


    setupCommandUSB(): string {
        return USB_COMMAND_TYPES.LED_MATRIX;
    }   
    
    makeCopy(): LedMatrix {
        let matrix = new LedMatrix();
        this.leds.forEach(led => matrix.setLed(led));

        return matrix;
    }

    usbCommand(): string {
        let command = '';
        this.leds.forEach(led => {
            command += led.usbCommand();
        });

        return command;
    }

}

export class LedInMatrix implements USB {

    constructor(public isOn: boolean, public readonly xPosition: number, public readonly yPosition: number) {}

    /**
     * Return true if the led is the same position.
     * 
     * @param led 
     */
    hasSamePosition(led: LedInMatrix): boolean {
        return this.xPosition == led.xPosition && this.yPosition == led.yPosition;
    }

    usbCommand() {
        return `${USB_COMMAND_TYPES.MOVE}-${USB_COMMAND_TYPES.LED_MATRIX}-${this.yPosition}:${this.xPosition}:${this.usbOnOff()}${USB_COMMAND_TYPES.END_OF_COMMAND}`;
    }

    setupCommandUSB() {
        return '';
    }

    /**
     * Returns the usb version of on or off
     */
    usbOnOff() {
        return this.isOn ? 'ON' : 'OFF';
    }

}
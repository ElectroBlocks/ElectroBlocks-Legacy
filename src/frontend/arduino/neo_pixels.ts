import { ARDUINO_UNO_PINS } from './pin';
import { LCDScreen } from './lcd_screen';
import { USB, USB_COMMAND_TYPES } from './usb';
import { RGB } from "./rgb";
import { Copy } from './copy';

export class NeoPixelStrip implements USB, Copy<NeoPixelStrip> {
    
    
    private leds = new Array<NeoPixel>();

    constructor(public readonly pin: ARDUINO_UNO_PINS, public readonly numberOfPixels: number) {}

    /**
     * Sets a neo pixel color 
     * 
     * @param neoPixel 
     */
    public setLed(neoPixel: NeoPixel) {

        let [led] = this.leds.filter(led => led.position == neoPixel.position);
        
        if (led) {
            led.color = neoPixel.color;
            return;
        }
        
        this.leds.push(neoPixel);
    }

    public usbCommand(): string {
        let command = '';
        this.leds.forEach(led => {
            command += led.usbCommand();
        });

        return command;
    }

    makeCopy() {
        let neoPixel = new NeoPixelStrip(this.pin, this.numberOfPixels);

        this.leds.forEach(led => neoPixel.setLed(led));

        return neoPixel;
    }

    setupCommandUSB(): string {
        return `${USB_COMMAND_TYPES.NEO_PIXEL}:${this.pin}:${this.numberOfPixels}`;
    }
}

export class NeoPixel implements Copy<NeoPixel>, USB {

    constructor(public color: RGB, public readonly position: number) {}

    usbCommand() {
        return `${USB_COMMAND_TYPES.MOVE}-${USB_COMMAND_TYPES.NEO_PIXEL}-${this.color.red}:${this.color.green}:${this.color.blue}:${this.position}${USB_COMMAND_TYPES.END_OF_COMMAND}`;
    }

    makeCopy() {
        return new NeoPixel(this.color, this.position);
    }

    setupCommandUSB() {
        return '';
    }

}

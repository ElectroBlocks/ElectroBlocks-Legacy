import { Frame } from '../frame/frame';
import { Variable } from '../frame/variable';
import { USB, USB_COMMAND_TYPES } from './usb';
import { Copy } from './copy';
import { EmptyComponent } from './empty_component';

export class ArduinoFrame implements Frame, USB, Copy<ArduinoFrame> {
    

    constructor(
            public readonly blockId: string,
            public readonly variables: { [key: string]: Variable }, 
            public readonly components: Array<USB>,
            public readonly lastMovedComponent: USB) {}  
            
    public static makeEmptyFrame(blockId: string) {
        return new ArduinoFrame(blockId, {}, [], new EmptyComponent());
    }

    nextCommand() {
        return this.lastMovedComponent.usbCommand();
    }

    directFrameCommand() {
        return this.setupCommandUSB() + this.usbCommand();
    }

    usbCommand(): string {
        return this.components.reduce((previousValue, component) => {
            return previousValue + component.usbCommand();
        }, '');
    }

    setupCommandUSB(): string {
        if (this.components.length == 0) {
            return '';
        }

        let endOfSetup = this.components
                        .filter(component => component.setupCommandUSB().length > 0)
                        .reduce((previousValue, component) => {
                                return previousValue + '-' + component.setupCommandUSB();
                        }, '');

        if (endOfSetup == '') {
            return '';
        }

        let numberOfThingSetup = this.components
                    .filter(component => component.setupCommandUSB().length > 0)
                    .length;

        return `${USB_COMMAND_TYPES.SETUP}-${numberOfThingSetup}${endOfSetup}${USB_COMMAND_TYPES.END_OF_COMMAND}`;
    }

    makeCopy(): ArduinoFrame {
        return new ArduinoFrame(this.blockId, this.variables, this.components, this.lastMovedComponent);
    }
}


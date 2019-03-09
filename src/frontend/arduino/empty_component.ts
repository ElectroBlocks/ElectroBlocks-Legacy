import { USB } from './usb';


export class EmptyComponent implements USB {
    
    usbCommand(): string {
        return '';
    }  

    setupCommandUSB(): string {
        return '';
    }
}
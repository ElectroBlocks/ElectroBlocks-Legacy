import { USB } from './usb';
import { Command, EmptyCommand } from "../frame/command";


export class EmptyComponent implements USB {


    usbCommand(): Command {
        return new EmptyCommand();
    }  

    setupCommandUSB(): Command {
        return new EmptyCommand();
    }
}

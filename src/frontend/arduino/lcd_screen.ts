import { Copy } from './copy';
import { USB, USB_COMMAND_TYPES } from './usb';

export class LCDScreen implements USB, Copy<LCDScreen> {

    constructor(public readonly memoryType: LCD_SCREEN_MEMORY_TYPE,
                public readonly rows: number, 
                public readonly columns: number, 
                public readonly rowsToPrint: string[]) {}


    usbCommand(): string {
        let command = `${USB_COMMAND_TYPES.MOVE}-${USB_COMMAND_TYPES.LCD}-`;

        for (let i = 0; i < this.rows; i += 1) {
            command += this.appendSpace(this.rowsToPrint[i] || '');
            command += i < (this.rows - 1) ? ':' : '';
        }

        return command + USB_COMMAND_TYPES.END_OF_COMMAND;
    }

    setupCommandUSB() {
        return `${USB_COMMAND_TYPES.LCD}:${this.memoryType}:${this.rows}:${this.columns}`;
    }


    appendSpace(printString: string): string {

        let spacesToPrint = this.columns - printString.length;

        for (let i = 0; i < spacesToPrint; i += 1) {
            printString += ' ';
        }

        return printString;
    }

    makeCopy() {
        return new LCDScreen(this.memoryType, this.rows, this.columns, this.rowsToPrint);
    }
}


export enum LCD_SCREEN_MEMORY_TYPE {
    'OX3F' = '0x3F',
    '0X27' = '0x27'
 }
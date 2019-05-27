import { Copy } from './copy';
import { USB, USB_COMMAND_TYPES } from './usb';
import { Command, COMMAND_TYPE } from "../frame/command";

export class LCDScreen implements  Copy<LCDScreen>, USB {

    constructor(public readonly memoryType: LCD_SCREEN_MEMORY_TYPE,
                public readonly rows: number, 
                public readonly columns: number) {}

    print(rowsToPrint: string[]): Command {
        let command = `${USB_COMMAND_TYPES.MOVE}-${USB_COMMAND_TYPES.LCD}-`;

        for (let i = 0; i < this.rows; i += 1) {
            command += this.appendSpace(rowsToPrint[i] || '');
            command += i < (this.rows - 1) ? ':' : '';
        }

         command += USB_COMMAND_TYPES.END_OF_COMMAND;

        return {
            command,
            type: COMMAND_TYPE.USB
        };
    }

    clear(): Command {
        return {
            command: `${USB_COMMAND_TYPES.MOVE}-${USB_COMMAND_TYPES.LCD}-C:0${USB_COMMAND_TYPES.END_OF_COMMAND}`,
            type: COMMAND_TYPE.USB
        };
    }

    toggleBackLight(isOn: boolean): Command {
        const stringControlsOnOff = isOn ? '1': '0';

        return {
            command: `${USB_COMMAND_TYPES.MOVE}-${USB_COMMAND_TYPES.LCD}-L:${stringControlsOnOff}${USB_COMMAND_TYPES.END_OF_COMMAND}`,
            type: COMMAND_TYPE.USB
        };
    }

    blinkCommandLCD(row: number, col: number, isBlinking: boolean): Command {

        const stringControlBlinking = isBlinking ? '1': '0';

        return {
            command: `${USB_COMMAND_TYPES.MOVE}-${USB_COMMAND_TYPES.LCD}-B:${row}:${col}:${stringControlBlinking}${USB_COMMAND_TYPES.END_OF_COMMAND}`,
            type: COMMAND_TYPE.USB
        };
    }

    setupCommandUSB() {
        const command =  `${USB_COMMAND_TYPES.LCD}:${this.memoryType}:${this.rows}:${this.columns}`;

        return {
            command,
            type: COMMAND_TYPE.USB
        };
    }


    appendSpace(printString: string): string {

        let spacesToPrint = this.columns - printString.length;

        for (let i = 0; i < spacesToPrint; i += 1) {
            printString += ' ';
        }

        return printString;
    }

    makeCopy() {
        return new LCDScreen(this.memoryType, this.rows, this.columns);
    }
}


export enum LCD_SCREEN_MEMORY_TYPE {
    'OX3F' = '0x3F',
    '0X27' = '0x27'
 }

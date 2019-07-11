import { Copy } from './copy';
import { USB, USB_COMMAND_TYPES } from './usb';
import { Command, COMMAND_TYPE } from "../frame/command";
import { LCD_SCREEN_MEMORY_TYPE } from "./state/lcd_screen.state";

export class LCDScreen implements  Copy<LCDScreen>, USB {

    private lcdText: string[] = [];

    constructor(public readonly memoryType: LCD_SCREEN_MEMORY_TYPE,
                public readonly rows: number, 
                public readonly columns: number) {
                    for (let i = 0; i < rows; i += 1) {
                        this.lcdText[i] = this.appendSpace('');
                    }
                }



    simplePrint(rowsToPrint: string[]): Command {
        this.lcdText = this.lcdText.map((text, index) => {
            return this.appendSpace(rowsToPrint[index] || '');
        });

        return this.createPrintCommand();
    }

    print(row: number, col: number, print: string): Command {
        const stringToPrint = this.lcdText[row].split('');
        let counter = 0;
        console.log(stringToPrint.length);
        for (let i = col; i < col + print.length; i += 1) {
            stringToPrint[i] = print[counter];
            counter += 1;
        }
        console.log(stringToPrint.length);
        this.lcdText[row] = stringToPrint.join('');
        return this.createPrintCommand();
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

    private createPrintCommand(): Command {
        let command = `${USB_COMMAND_TYPES.MOVE}-${USB_COMMAND_TYPES.LCD}-`;

        command += this.lcdText.join(':') + USB_COMMAND_TYPES.END_OF_COMMAND;

        return {
            command,
            type: COMMAND_TYPE.USB
        };
    }
}




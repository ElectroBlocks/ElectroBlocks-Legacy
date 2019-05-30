"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usb_1 = require("./usb");
const command_1 = require("../frame/command");
class LCDScreen {
    constructor(memoryType, rows, columns) {
        this.memoryType = memoryType;
        this.rows = rows;
        this.columns = columns;
        this.lcdText = [];
        for (let i = 0; i < rows; i += 1) {
            this.lcdText[i] = this.appendSpace('');
        }
    }
    simplePrint(rowsToPrint) {
        this.lcdText = this.lcdText.map((text, index) => {
            return this.appendSpace(rowsToPrint[index] || '');
        });
        return this.createPrintCommand();
    }
    print(row, col, print) {
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
    clear() {
        return {
            command: `${usb_1.USB_COMMAND_TYPES.MOVE}-${usb_1.USB_COMMAND_TYPES.LCD}-C:0${usb_1.USB_COMMAND_TYPES.END_OF_COMMAND}`,
            type: command_1.COMMAND_TYPE.USB
        };
    }
    toggleBackLight(isOn) {
        const stringControlsOnOff = isOn ? '1' : '0';
        return {
            command: `${usb_1.USB_COMMAND_TYPES.MOVE}-${usb_1.USB_COMMAND_TYPES.LCD}-L:${stringControlsOnOff}${usb_1.USB_COMMAND_TYPES.END_OF_COMMAND}`,
            type: command_1.COMMAND_TYPE.USB
        };
    }
    blinkCommandLCD(row, col, isBlinking) {
        const stringControlBlinking = isBlinking ? '1' : '0';
        return {
            command: `${usb_1.USB_COMMAND_TYPES.MOVE}-${usb_1.USB_COMMAND_TYPES.LCD}-B:${row}:${col}:${stringControlBlinking}${usb_1.USB_COMMAND_TYPES.END_OF_COMMAND}`,
            type: command_1.COMMAND_TYPE.USB
        };
    }
    setupCommandUSB() {
        const command = `${usb_1.USB_COMMAND_TYPES.LCD}:${this.memoryType}:${this.rows}:${this.columns}`;
        return {
            command,
            type: command_1.COMMAND_TYPE.USB
        };
    }
    appendSpace(printString) {
        let spacesToPrint = this.columns - printString.length;
        for (let i = 0; i < spacesToPrint; i += 1) {
            printString += ' ';
        }
        return printString;
    }
    makeCopy() {
        return new LCDScreen(this.memoryType, this.rows, this.columns);
    }
    createPrintCommand() {
        let command = `${usb_1.USB_COMMAND_TYPES.MOVE}-${usb_1.USB_COMMAND_TYPES.LCD}-`;
        command += this.lcdText.join(':') + usb_1.USB_COMMAND_TYPES.END_OF_COMMAND;
        return {
            command,
            type: command_1.COMMAND_TYPE.USB
        };
    }
}
exports.LCDScreen = LCDScreen;
var LCD_SCREEN_MEMORY_TYPE;
(function (LCD_SCREEN_MEMORY_TYPE) {
    LCD_SCREEN_MEMORY_TYPE["OX3F"] = "0x3F";
    LCD_SCREEN_MEMORY_TYPE["0X27"] = "0x27";
})(LCD_SCREEN_MEMORY_TYPE = exports.LCD_SCREEN_MEMORY_TYPE || (exports.LCD_SCREEN_MEMORY_TYPE = {}));
//# sourceMappingURL=lcd_screen.js.map
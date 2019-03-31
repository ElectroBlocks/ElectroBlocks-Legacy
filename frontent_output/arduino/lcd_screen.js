"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usb_1 = require("./usb");
const command_1 = require("../frame/command");
class LCDScreen {
    constructor(memoryType, rows, columns, rowsToPrint) {
        this.memoryType = memoryType;
        this.rows = rows;
        this.columns = columns;
        this.rowsToPrint = rowsToPrint;
    }
    usbCommand() {
        let command = `${usb_1.USB_COMMAND_TYPES.MOVE}-${usb_1.USB_COMMAND_TYPES.LCD}-`;
        for (let i = 0; i < this.rows; i += 1) {
            command += this.appendSpace(this.rowsToPrint[i] || '');
            command += i < (this.rows - 1) ? ':' : '';
        }
        command += usb_1.USB_COMMAND_TYPES.END_OF_COMMAND;
        return {
            command,
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
        return new LCDScreen(this.memoryType, this.rows, this.columns, this.rowsToPrint);
    }
}
exports.LCDScreen = LCDScreen;
var LCD_SCREEN_MEMORY_TYPE;
(function (LCD_SCREEN_MEMORY_TYPE) {
    LCD_SCREEN_MEMORY_TYPE["OX3F"] = "0x3F";
    LCD_SCREEN_MEMORY_TYPE["0X27"] = "0x27";
})(LCD_SCREEN_MEMORY_TYPE = exports.LCD_SCREEN_MEMORY_TYPE || (exports.LCD_SCREEN_MEMORY_TYPE = {}));
//# sourceMappingURL=lcd_screen.js.map
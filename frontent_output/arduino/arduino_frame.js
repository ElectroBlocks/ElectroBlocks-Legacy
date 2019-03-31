"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usb_1 = require("./usb");
const command_1 = require("../frame/command");
class ArduinoFrame {
    constructor(blockId, variables, components, command) {
        this.blockId = blockId;
        this.variables = variables;
        this.components = components;
        this.command = command;
    }
    static makeEmptyFrame(blockId) {
        return new ArduinoFrame(blockId, {}, [], new command_1.EmptyCommand());
    }
    nextCommand() {
        return this.command;
    }
    directFrameCommand() {
        return [this.setupCommandUSB(), this.usbCommand()];
    }
    usbCommand() {
        const command = this.components.reduce((previousValue, component) => {
            return previousValue + component.usbCommand().command;
        }, '');
        return {
            command,
            type: command_1.COMMAND_TYPE.USB
        };
    }
    setupCommandUSB() {
        if (this.components.length == 0) {
            return new command_1.EmptyCommand();
        }
        let endOfSetup = this.components
            .filter(component => component.setupCommandUSB().type == command_1.COMMAND_TYPE.USB)
            .reduce((previousValue, component) => {
            return previousValue + '-' + component.setupCommandUSB().command;
        }, '');
        if (endOfSetup == '') {
            return new command_1.EmptyCommand();
        }
        let numberOfThingSetup = this.components
            .filter(component => component.setupCommandUSB().type == command_1.COMMAND_TYPE.USB)
            .length;
        const command = `${usb_1.USB_COMMAND_TYPES.SETUP}-${numberOfThingSetup}${endOfSetup}${usb_1.USB_COMMAND_TYPES.END_OF_COMMAND}`;
        return {
            type: command_1.COMMAND_TYPE.USB,
            command
        };
    }
    makeCopy(blockId) {
        return new ArduinoFrame(blockId, this.variables, this.components, this.command);
    }
}
exports.ArduinoFrame = ArduinoFrame;
//# sourceMappingURL=arduino_frame.js.map
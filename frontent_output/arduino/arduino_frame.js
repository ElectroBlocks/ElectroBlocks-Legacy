"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usb_1 = require("./usb");
const empty_component_1 = require("./empty_component");
class ArduinoFrame {
    constructor(blockId, variables, components, lastMovedComponent) {
        this.blockId = blockId;
        this.variables = variables;
        this.components = components;
        this.lastMovedComponent = lastMovedComponent;
    }
    static makeEmptyFrame(blockId) {
        return new ArduinoFrame(blockId, {}, [], new empty_component_1.EmptyComponent());
    }
    nextCommand() {
        return this.lastMovedComponent.usbCommand();
    }
    directFrameCommand() {
        return this.setupCommandUSB() + this.usbCommand();
    }
    usbCommand() {
        return this.components.reduce((previousValue, component) => {
            return previousValue + component.usbCommand();
        }, '');
    }
    setupCommandUSB() {
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
        return `${usb_1.USB_COMMAND_TYPES.SETUP}-${numberOfThingSetup}${endOfSetup}${usb_1.USB_COMMAND_TYPES.END_OF_COMMAND}`;
    }
    makeCopy() {
        return new ArduinoFrame(this.blockId, this.variables, this.components, this.lastMovedComponent);
    }
}
exports.ArduinoFrame = ArduinoFrame;
//# sourceMappingURL=arduino_frame.js.map
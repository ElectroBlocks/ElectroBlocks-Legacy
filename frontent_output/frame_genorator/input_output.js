"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arduino_frame_1 = require("../arduino/arduino_frame");
const pin_1 = require("../arduino/pin");
const blockly_helper_1 = require("../frame/blockly_helper");
exports.digital_write_block = (block, frameLocation, previousFrame) => {
    const pin = block.getFieldValue('PIN');
    const state = block.getFieldValue('STATE') == 'ON' ? 1 : 0;
    return generatePinFrame(block, frameLocation, pin, state, pin_1.PIN_TYPE.DIGITAL, previousFrame);
};
exports.analog_write_block = (block, frameLocation, previousFrame) => {
    const pin = block.getFieldValue('PIN');
    const state = parseInt(blockly_helper_1.getInputValue(block, 'WRITE_VALUE', 0, previousFrame));
    return generatePinFrame(block, frameLocation, pin, state, pin_1.PIN_TYPE.ANALOG, previousFrame);
};
const generatePinFrame = (block, frameLocation, pin, state, pinType, previousFrame) => {
    let components = previousFrame ? previousFrame.components : [];
    components = components.filter(component => !(component instanceof pin_1.Pin && component.pinNumber == pin_1.stringToPin(pin)));
    const pinComponent = new pin_1.Pin(pin_1.stringToPin(pin), pinType, state);
    components.push(pinComponent);
    const variables = previousFrame ? previousFrame.variables : {};
    return [new arduino_frame_1.ArduinoFrame(block.id, variables, components, pinComponent.usbCommand(), frameLocation)];
};
//# sourceMappingURL=input_output.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arduino_frame_1 = require("../arduino/arduino_frame");
const pin_1 = require("../arduino/pin");
const frame_location_1 = require("../frame/frame_location");
const state_1 = require("../frame/state");
exports.digital_write_block = (block, previousFrame) => {
    const pin = block.getFieldValue('PIN');
    const state = block.getFieldValue('STATE') == 'ON' ? '1' : '0';
    let components = previousFrame ? previousFrame.components : [];
    const pinComponent = new pin_1.Pin(pin_1.stringToPin(pin), pin_1.PIN_TYPE.DIGITAL, parseInt(state));
    components.push(pinComponent);
    const variables = previousFrame ? previousFrame.variables : {};
    return [new arduino_frame_1.ArduinoFrame(block.id, variables, components, pinComponent.usbCommand())];
};
exports.is_button_pressed_block = (block, previousFrame) => {
    const defaultInputValue = false;
    let blockState = state_1.stateHolder.getState(block.id, frame_location_1.currentGeneratingFrameLocation);
    if (!blockState) {
        state_1.stateHolder.setState(block.id, frame_location_1.currentGeneratingFrameLocation, 'Boolean', defaultInputValue);
    }
    return blockState ? blockState.value : defaultInputValue;
};
//# sourceMappingURL=input_output.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arduino_frame_1 = require("../arduino/arduino_frame");
const blockly_helper_1 = require("../frame/blockly_helper");
const pin_1 = require("../arduino/pin");
const neo_pixels_1 = require("../arduino/neo_pixels");
const command_1 = require("../frame/command");
exports.neo_pixel_setup_block = (block, frameLocation, previousFrame) => {
    const pin = block.getFieldValue('PIN').toString();
    const numberOfPixels = parseInt(blockly_helper_1.getInputValue(block, 'NUMBER_LEDS', 0, previousFrame).toString());
    const neoPixelStrip = new neo_pixels_1.NeoPixelStrip(pin_1.stringToPin(pin), numberOfPixels);
    const variables = previousFrame ? previousFrame.variables : {};
    const components = previousFrame ? previousFrame.components : [];
    components.push(neoPixelStrip);
    return [new arduino_frame_1.ArduinoFrame(block.id, variables, components, new command_1.EmptyCommand(), frameLocation)];
};
//# sourceMappingURL=neo-pixel.js.map
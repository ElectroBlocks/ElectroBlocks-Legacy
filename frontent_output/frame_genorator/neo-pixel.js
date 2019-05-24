"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arduino_frame_1 = require("../arduino/arduino_frame");
const blockly_helper_1 = require("../frame/blockly_helper");
const pin_1 = require("../arduino/pin");
const neo_pixels_1 = require("../arduino/neo_pixels");
const command_1 = require("../frame/command");
exports.neo_pixel_setup_block = (block, frameLocation, previousFrame) => {
    const pin = block.getFieldValue('PIN').toString();
    const numberOfPixels = parseInt(blockly_helper_1.getInputValue(block, 'NUMBER_LEDS', 30, previousFrame).toString());
    const neoPixelStrip = new neo_pixels_1.NeoPixelStrip(pin_1.stringToPin(pin), numberOfPixels);
    const variables = previousFrame ? previousFrame.variables : {};
    const components = previousFrame ? previousFrame.components : [];
    components.push(neoPixelStrip);
    return [new arduino_frame_1.ArduinoFrame(block.id, variables, components, new command_1.EmptyCommand(), frameLocation)];
};
exports.neo_pixel_set_color_block = (block, frameLocation, previousFrame) => {
    const color = blockly_helper_1.getInputValue(block, 'COLOR', { red: 33, green: 0, blue: 0 }, previousFrame);
    const position = parseInt(blockly_helper_1.getInputValue(block, 'POSITION', 1, previousFrame).toString());
    const neoPixelStrip = previousFrame.components.find(usb => usb instanceof neo_pixels_1.NeoPixelStrip);
    neoPixelStrip.setLed(new neo_pixels_1.NeoPixel(color, position));
    return [
        new arduino_frame_1.ArduinoFrame(block.id, previousFrame.variables, previousFrame.components, neoPixelStrip.usbCommand(), frameLocation)
    ];
};
//# sourceMappingURL=neo-pixel.js.map
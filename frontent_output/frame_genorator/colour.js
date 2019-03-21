"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blockly_helper_1 = require("../frame/blockly_helper");
const math_1 = require("./math");
const colour_picker_block = (block, previousFrame) => {
    let value = block.getFieldValue('COLOUR');
    return hexToRgb(value);
};
exports.colour_picker_block = colour_picker_block;
const colour_random_block = (block, previousFrame) => {
    return { red: math_1.getRandomInt(0, 255), green: math_1.getRandomInt(0, 255), blue: math_1.getRandomInt(0, 255) };
};
exports.colour_random_block = colour_random_block;
const colour_rgb_block = (block, previousFrame) => {
    const red = blockly_helper_1.getInputValue(block, 'RED', 0, previousFrame).toString();
    const green = blockly_helper_1.getInputValue(block, 'GREEN', 0, previousFrame).toString();
    const blue = blockly_helper_1.getInputValue(block, 'BLUE', 0, previousFrame).toString();
    return { red: parseInt(red), green: parseInt(green), blue: parseInt(blue) };
};
exports.colour_rgb_block = colour_rgb_block;
const hexToRgb = (hex) => {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        red: parseInt(result[1], 16),
        green: parseInt(result[2], 16),
        blue: parseInt(result[3], 16)
    } : null;
};
class Color {
}
exports.Color = Color;
//# sourceMappingURL=colour.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const led_matrix_1 = require("../arduino/led_matrix");
const hasLedMatrix = (previousFrame) => {
    if (!previousFrame) {
        return false;
    }
    if (previousFrame.components.filter(component => component instanceof led_matrix_1.LedMatrix).length == 0) {
        return false;
    }
    return true;
};
exports.led_matrix_make_draw_block = (block, frameLocation, previousFrame) => {
    block.inputList
        .filter(input => input.fieldRow.length > 1)
        .forEach(input => {
        input.fieldRow.forEach((field) => {
            const row = parseInt(field.name.split(',')[0]);
            const column = parseInt(field.name.split(',')[1]);
            const isOn = field.state_;
        });
    });
    return [];
};
//# sourceMappingURL=led_matrix.js.map
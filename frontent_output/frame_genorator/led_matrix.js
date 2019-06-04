"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arduino_frame_1 = require("../arduino/arduino_frame");
const led_matrix_1 = require("../arduino/led_matrix");
const blockly_helper_1 = require("../frame/blockly_helper");
const hasLedMatrix = (previousFrame) => {
    if (!previousFrame) {
        return false;
    }
    return previousFrame
        .components
        .filter(component => component instanceof led_matrix_1.LedMatrix).length !== 0;
};
exports.led_matrix_make_draw_block = (block, frameLocation, previousFrame) => {
    const ledMatrixComponent = hasLedMatrix(previousFrame) ?
        previousFrame.components.find(component => component instanceof led_matrix_1.LedMatrix) : new led_matrix_1.LedMatrix();
    block.inputList
        .filter(input => input.fieldRow.length > 1)
        .forEach(input => {
        input.fieldRow.forEach((field) => {
            const row = parseInt(field.name.split(',')[0]);
            const column = parseInt(field.name.split(',')[1]);
            const isOn = field.state_;
            ledMatrixComponent.setLed(new led_matrix_1.LedInMatrix(isOn, column, row));
        });
    });
    const variables = previousFrame ? previousFrame.variables : {};
    const components = hasLedMatrix(previousFrame) ?
        previousFrame.components : [ledMatrixComponent];
    return [
        new arduino_frame_1.ArduinoFrame(block.id, variables, components, ledMatrixComponent.usbCommand(), frameLocation)
    ];
};
exports.led_matrix_turn_one_on_off_block = (block, frameLocation, previousFrame) => {
    const ledMatrixComponent = hasLedMatrix(previousFrame) ?
        previousFrame.components.find(component => component instanceof led_matrix_1.LedMatrix) : new led_matrix_1.LedMatrix();
    const isOn = block.getFieldValue('STATE') === 'ON';
    const row = parseInt(blockly_helper_1.getInputValue(block, 'ROW', 1, previousFrame).toString()) - 1;
    const column = parseInt(blockly_helper_1.getInputValue(block, 'COLUMN', 1, previousFrame).toString()) - 1;
    ledMatrixComponent.setLed(new led_matrix_1.LedInMatrix(isOn, column, row));
    const variables = previousFrame ? previousFrame.variables : {};
    const components = hasLedMatrix(previousFrame) ?
        previousFrame.components : [ledMatrixComponent];
    return [
        new arduino_frame_1.ArduinoFrame(block.id, variables, components, ledMatrixComponent.usbCommand(), frameLocation)
    ];
};
//# sourceMappingURL=led_matrix.js.map
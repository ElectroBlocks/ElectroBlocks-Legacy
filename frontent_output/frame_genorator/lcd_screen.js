"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arduino_frame_1 = require("../arduino/arduino_frame");
const lcd_screen_1 = require("../arduino/lcd_screen");
const blockly_helper_1 = require("../frame/blockly_helper");
const command_1 = require("../frame/command");
exports.lcd_setup_block = (block, frameLocation, previousFrame) => {
    const memoryType = block.getFieldValue('MEMORY_TYPE');
    const rows = parseInt(blockly_helper_1.getInputValue(block, 'ROWS', 2, previousFrame));
    const columns = parseInt(blockly_helper_1.getInputValue(block, 'COLUMNS', 16, previousFrame));
    const lcdComponent = new lcd_screen_1.LCDScreen(memoryType, rows, columns);
    const components = previousFrame ? previousFrame.components : [];
    components.push(lcdComponent);
    const variables = previousFrame ? previousFrame.variables : {};
    return [
        new arduino_frame_1.ArduinoFrame(block.id, variables, components, new command_1.EmptyCommand(), frameLocation)
    ];
};
exports.lcd_screen_print_block = (block, frameLocation, previousFrame) => {
    const lcdScreen = previousFrame.components.find(component => component instanceof lcd_screen_1.LCDScreen);
    const row = parseInt(blockly_helper_1.getInputValue(block, 'ROW', 0, previousFrame).toString());
    const column = parseInt(blockly_helper_1.getInputValue(block, 'COLUMN', 0, previousFrame).toString());
    const print = blockly_helper_1.getInputValue(block, 'PRINT', '', previousFrame).toString();
    const command = lcdScreen.print(row, column, print);
    return [
        new arduino_frame_1.ArduinoFrame(block.id, previousFrame.variables, previousFrame.components, command, frameLocation)
    ];
};
exports.lcd_screen_simple_print_block = (block, frameLocation, previousFrame) => {
    const lcdScreen = previousFrame.components.find(component => component instanceof lcd_screen_1.LCDScreen);
    const row1 = blockly_helper_1.getInputValue(block, 'ROW_1', '', previousFrame).toString();
    const row2 = blockly_helper_1.getInputValue(block, 'ROW_2', '', previousFrame).toString();
    const row3 = blockly_helper_1.getInputValue(block, 'ROW_3', '', previousFrame).toString();
    const row4 = blockly_helper_1.getInputValue(block, 'ROW_4', '', previousFrame).toString();
    const printCommand = lcdScreen.simplePrint([row1, row2, row3, row4]);
    return [
        new arduino_frame_1.ArduinoFrame(block.id, previousFrame.variables, previousFrame.components, printCommand, frameLocation)
    ];
};
exports.lcd_screen_clear_block = (block, frameLocation, previousFrame) => {
    const lcdScreen = previousFrame.components.find(component => component instanceof lcd_screen_1.LCDScreen);
    const command = lcdScreen.clear();
    return [
        new arduino_frame_1.ArduinoFrame(block.id, previousFrame.variables, previousFrame.components, command, frameLocation)
    ];
};
exports.lcd_screen_blink_block = (block, frameLocation, previousFrame) => {
    const lcdScreen = previousFrame.components.find(component => component instanceof lcd_screen_1.LCDScreen);
    const row = parseInt(blockly_helper_1.getInputValue(block, 'ROW', 0, previousFrame).toString());
    const column = parseInt(blockly_helper_1.getInputValue(block, 'COLUMN', 0, previousFrame).toString());
    const isOn = block.getFieldValue('NAME') == 'BLINK';
    const command = lcdScreen.blinkCommandLCD(row, column, isOn);
    return [
        new arduino_frame_1.ArduinoFrame(block.id, previousFrame.variables, previousFrame.components, command, frameLocation)
    ];
};
exports.lcd_backlight_block = (block, frameLocation, previousFrame) => {
    const lcdScreen = previousFrame.components.find(component => component instanceof lcd_screen_1.LCDScreen);
    const isOn = block.getFieldValue('BACKLIGHT') == 'ON';
    const command = lcdScreen.toggleBackLight(isOn);
    return [
        new arduino_frame_1.ArduinoFrame(block.id, previousFrame.variables, previousFrame.components, command, frameLocation)
    ];
};
//# sourceMappingURL=lcd_screen.js.map
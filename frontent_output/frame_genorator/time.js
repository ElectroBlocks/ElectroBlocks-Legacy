"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arduino_frame_1 = require("../arduino/arduino_frame");
const blockly_helper_1 = require("../frame/blockly_helper");
const command_1 = require("../frame/command");
exports.delay_block_block = (block, frameLocation, previousFrame) => {
    const copyFrame = previousFrame ? previousFrame.makeCopy(block.id) :
        arduino_frame_1.ArduinoFrame.makeEmptyFrame(block.id, frameLocation);
    const time = blockly_helper_1.getInputValue(block, 'DELAY', 1, previousFrame).toString();
    const timeCommand = new command_1.TimeCommand((parseFloat(time) * 1000).toFixed(0).toString());
    const frame = new arduino_frame_1.ArduinoFrame(block.id, copyFrame.variables, copyFrame.components, timeCommand, frameLocation);
    return [frame];
};
//# sourceMappingURL=time.js.map
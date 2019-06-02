"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arduino_frame_1 = require("../arduino/arduino_frame");
const command_1 = require("../frame/command");
const blockly_helper_1 = require("../frame/blockly_helper");
exports.send_message_block = (block, frameLocation, previousFrame) => {
    const message = blockly_helper_1.getInputValue(block, 'MESSAGE', '', previousFrame).toString();
    const command = new command_1.MessageCommand(message);
    if (previousFrame) {
        return [
            new arduino_frame_1.ArduinoFrame(block.id, previousFrame.variables, previousFrame.components, command, frameLocation)
        ];
    }
    return [
        new arduino_frame_1.ArduinoFrame(block.id, {}, [], command, frameLocation)
    ];
};
//# sourceMappingURL=message.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arduino_frame_1 = require("../arduino/arduino_frame");
const command_1 = require("../frame/command");
exports.send_message_block = (block, frameLocation, previousFrame) => {
    if (previousFrame) {
        return [
            new arduino_frame_1.ArduinoFrame(block.id, previousFrame.variables, previousFrame.components, new command_1.EmptyCommand(), frameLocation)
        ];
    }
    return [
        new arduino_frame_1.ArduinoFrame(block.id, {}, [], new command_1.EmptyCommand(), frameLocation)
    ];
};
//# sourceMappingURL=message.js.map
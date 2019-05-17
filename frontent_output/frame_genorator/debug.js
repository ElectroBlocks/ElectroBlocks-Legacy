"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arduino_frame_1 = require("../arduino/arduino_frame");
const command_1 = require("../frame/command");
exports.debug_block = (block, frameLocation, previousFrame) => {
    const components = previousFrame ? previousFrame.components : [];
    const variables = previousFrame ? previousFrame.variables : {};
    const command = new command_1.EmptyCommand();
    return [new arduino_frame_1.ArduinoFrame(block.id, variables, components, command, frameLocation)];
};
//# sourceMappingURL=debug.js.map
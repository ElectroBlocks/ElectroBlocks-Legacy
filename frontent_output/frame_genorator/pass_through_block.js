"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arduino_frame_1 = require("../arduino/arduino_frame");
const command_1 = require("../frame/command");
exports.temp_get_temp_block = (block, frameLocation, previousFrame) => {
    const variables = previousFrame ? previousFrame.variables : {};
    const components = previousFrame ? previousFrame.components : [];
    return [
        new arduino_frame_1.ArduinoFrame(block.id, variables, components, new command_1.EmptyCommand(), frameLocation)
    ];
};
exports.ir_remote_scan_again_block = exports.temp_get_temp_block;
exports.temp_setup_block = exports.temp_get_temp_block;
exports.ir_remote_setup_block = exports.temp_get_temp_block;
exports.soil_sensor_setup_block = exports.temp_get_temp_block;
exports.bluetooth_setup_block = exports.temp_get_temp_block;
//# sourceMappingURL=pass_through_block.js.map
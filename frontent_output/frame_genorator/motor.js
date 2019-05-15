"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arduino_frame_1 = require("../arduino/arduino_frame");
const blockly_helper_1 = require("../frame/blockly_helper");
const motor_1 = require("../arduino/motor");
exports.move_motor_block = (block, frameLocation, previousFrame) => {
    let motorNumber = parseInt(blockly_helper_1.getInputValue(block, 'MOTOR', 1, previousFrame).toString());
    if (motorNumber < 0 || motorNumber > 4) {
        motorNumber = 1;
    }
    const direction = block.getFieldValue('DIRECTION');
    const speed = parseInt(blockly_helper_1.getInputValue(block, 'SPEED', 10, previousFrame).toString());
    let components = previousFrame ? previousFrame.components : [];
    components = components.filter(component => !(component instanceof motor_1.Motor && component.motorNumber == motorNumber));
    const motor = new motor_1.Motor(motorNumber, direction, speed);
    components.push(motor);
    const variables = previousFrame ? previousFrame.variables : {};
    return [new arduino_frame_1.ArduinoFrame(block.id, variables, components, motor.usbCommand(), frameLocation)];
};
//# sourceMappingURL=motor.js.map
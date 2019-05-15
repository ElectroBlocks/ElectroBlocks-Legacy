"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arduino_frame_1 = require("../arduino/arduino_frame");
const pin_1 = require("../arduino/pin");
const servo_1 = require("../arduino/servo");
const blockly_helper_1 = require("../frame/blockly_helper");
exports.servo_move_block = (block, frameLocation, previousFrame) => {
    const pin = block.getFieldValue('PIN').toString();
    const angle = parseInt(blockly_helper_1.getInputValue(block, 'DEGREE', 0, previousFrame).toString());
    let components = previousFrame ? previousFrame.components : [];
    components = components.filter(component => !(component instanceof servo_1.Servo && component.pin == pin_1.stringToPin(pin)));
    const servo = new servo_1.Servo(pin_1.stringToPin(pin), angle);
    components.push(servo);
    const variables = previousFrame ? previousFrame.variables : {};
    return [new arduino_frame_1.ArduinoFrame(block.id, variables, components, servo.usbCommand(), frameLocation)];
};
//# sourceMappingURL=servo.js.map
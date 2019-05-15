"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jasmine");
const blockHelper = require("../frame/blockly_helper");
const motor_1 = require("./motor");
describe('motor', () => {
    let block1;
    let block2;
    let getInputValueSpy;
    let getFieldValueSpyBlock1;
    let getFieldValueSpyBlock2;
    beforeEach(() => {
        block1 = {
            getFieldValue(fieldName) {
            },
            id: 'block1'
        };
        block2 = {
            getFieldValue(fieldName) {
            },
            id: 'block2'
        };
        getInputValueSpy = spyOn(blockHelper, 'getInputValue');
        getFieldValueSpyBlock1 = spyOn(block1, 'getFieldValue');
        getFieldValueSpyBlock2 = spyOn(block2, 'getFieldValue');
    });
    it('should not duplicate motor', () => {
        getFieldValueSpyBlock1.withArgs('DIRECTION').and.returnValue('FORWARD');
        getInputValueSpy.withArgs(block1, 'MOTOR', 1, undefined).and.returnValue(1);
        getInputValueSpy.withArgs(block1, 'SPEED', 10, undefined).and.returnValue(40);
        const [arduinoFrame] = motor_1.move_motor_block(block1, { location: 'loop', iteration: 1 });
        getFieldValueSpyBlock2.withArgs('DIRECTION').and.returnValue('BACKWARD');
        getInputValueSpy.withArgs(block2, 'MOTOR', 1, arduinoFrame).and.returnValue(1);
        getInputValueSpy.withArgs(block2, 'SPEED', 10, arduinoFrame).and.returnValue(140);
        const [lastArduinoFrame] = motor_1.move_motor_block(block2, { location: 'loop', iteration: 1 }, arduinoFrame);
        expect(lastArduinoFrame.components.length).toBe(1);
        expect(lastArduinoFrame.command.command).toBe('M-MT-1:BACKWARD:140|');
    });
    it('should not have 2 motors if the motors are different numbers', () => {
        getFieldValueSpyBlock1.withArgs('DIRECTION').and.returnValue('FORWARD');
        getInputValueSpy.withArgs(block1, 'MOTOR', 1, undefined).and.returnValue(2);
        getInputValueSpy.withArgs(block1, 'SPEED', 10, undefined).and.returnValue(40);
        const [arduinoFrame] = motor_1.move_motor_block(block1, { location: 'loop', iteration: 1 });
        getFieldValueSpyBlock2.withArgs('DIRECTION').and.returnValue('BACKWARD');
        getInputValueSpy.withArgs(block2, 'MOTOR', 1, arduinoFrame).and.returnValue(6);
        getInputValueSpy.withArgs(block2, 'SPEED', 10, arduinoFrame).and.returnValue(140);
        const [lastArduinoFrame] = motor_1.move_motor_block(block2, { location: 'loop', iteration: 1 }, arduinoFrame);
        expect(lastArduinoFrame.components.length).toBe(2);
        expect(lastArduinoFrame.command.command).toBe('M-MT-1:BACKWARD:140|');
    });
});
//# sourceMappingURL=motor.spec.js.map
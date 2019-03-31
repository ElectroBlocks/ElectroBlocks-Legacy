"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jasmine");
const blockHelperFunctions = require("../frame/blockly_helper");
const blockly = require("../frame/block");
const variables_1 = require("./variables");
const arduino_frame_1 = require("../arduino/arduino_frame");
const command_1 = require("../frame/command");
describe('Variables Frame Generators', () => {
    let block;
    let blocklyMock;
    beforeEach(() => {
        blocklyMock = {
            mainWorkspace: {
                getVariableById: () => { }
            }
        };
        block = {
            id: 'block_id',
            getFieldValue(fieldName) {
            }
        };
    });
    const mockSetVariable = (type, variableName, defaultValue, value) => {
        spyOn(blockly, 'getBlockly').and.returnValue(blocklyMock);
        spyOn(block, 'getFieldValue').withArgs('VAR')
            .and.returnValue('variable_id');
        spyOn(blockHelperFunctions, 'getInputValue')
            .withArgs(block, 'VALUE', defaultValue, jasmine.any(arduino_frame_1.ArduinoFrame))
            .and.returnValue(value);
        spyOn(blocklyMock.mainWorkspace, 'getVariableById')
            .withArgs('variable_id')
            .and.returnValue({
            type,
            name: variableName
        });
    };
    const mockGetVariable = (type, variableName) => {
        spyOn(blockly, 'getBlockly').and.returnValue(blocklyMock);
        spyOn(block, 'getFieldValue').withArgs('VAR')
            .and.returnValue('variable_id');
        spyOn(blocklyMock.mainWorkspace, 'getVariableById')
            .withArgs('variable_id')
            .and.returnValue({
            type,
            name: variableName
        });
    };
    describe('variables_set_number_block', () => {
        it('Set number variable value and name in frame.', () => {
            mockSetVariable('Number', 'variable_name', 0, 32);
            let [frame] = variables_1.variables_set_number_block(block);
            expect(frame.blockId).toBe(block.id);
            expect(frame.variables['variable_name'].name).toBe('variable_name');
            expect(frame.variables['variable_name'].value).toBe(32);
            expect(frame.variables['variable_name'].type).toBe('Number');
        });
    });
    describe('variables_set_string_block', () => {
        it('Set string variable value and name in frame.', () => {
            mockSetVariable('String', 'variable_name', '', 'Hello World');
            let [frame] = variables_1.variables_set_string_block(block);
            expect(frame.blockId).toBe(block.id);
            expect(frame.variables['variable_name'].name).toBe('variable_name');
            expect(frame.variables['variable_name'].value).toBe('Hello World');
            expect(frame.variables['variable_name'].type).toBe('String');
        });
    });
    describe('variables_set_boolean_block', () => {
        it('Set boolean variable value and name in frame.', () => {
            mockSetVariable('Boolean', 'variable_name', true, true);
            let [frame] = variables_1.variables_set_boolean_block(block);
            expect(frame.blockId).toBe(block.id);
            expect(frame.variables['variable_name'].name).toBe('variable_name');
            expect(frame.variables['variable_name'].value).toBe(true);
            expect(frame.variables['variable_name'].type).toBe('Boolean');
        });
    });
    describe('variables_set_boolean_block', () => {
        it('Set boolean variable to false.', () => {
            mockSetVariable('Boolean', 'variable_name', true, false);
            let [frame] = variables_1.variables_set_boolean_block(block);
            expect(frame.blockId).toBe(block.id);
            expect(frame.variables['variable_name'].name).toBe('variable_name');
            expect(frame.variables['variable_name'].value).toBe(false);
            expect(frame.variables['variable_name'].type).toBe('Boolean');
        });
    });
    describe('variables_set_colour_block', () => {
        it('Set color variable value and name in frame.', () => {
            mockSetVariable('Colour', 'variable_name', { red: 0, green: 0, blue: 0 }, { red: 20, green: 0, blue: 30 });
            let [frame] = variables_1.variables_set_colour_block(block);
            expect(frame.blockId).toBe(block.id);
            expect(frame.variables['variable_name'].name).toBe('variable_name');
            expect(frame.variables['variable_name'].value)
                .toEqual({ red: 20, green: 0, blue: 30 });
            expect(frame.variables['variable_name'].type).toBe('Colour');
        });
    });
    describe('variables_get_colour_block', () => {
        it('get the color variable from the previous frame', () => {
            let previousFrame = new arduino_frame_1.ArduinoFrame('block_id', { 'variable_name': {
                    name: 'variable_name',
                    type: 'Colour',
                    value: { red: 30, green: 30, blue: 20 }
                }
            }, [], new command_1.EmptyCommand());
            mockGetVariable('Colour', 'variable_name');
            expect(variables_1.variables_get_colour_block(block, previousFrame))
                .toEqual({ red: 30, green: 30, blue: 20 });
        });
    });
    describe('variables_get_number_block', () => {
        it('get the number variable from the previous frame', () => {
            let previousFrame = new arduino_frame_1.ArduinoFrame('block_id', { 'variable_name': {
                    name: 'variable_name',
                    type: 'Number',
                    value: 33
                }
            }, [], new command_1.EmptyCommand());
            mockGetVariable('colour', 'variable_name');
            expect(variables_1.variables_get_number_block(block, previousFrame)).toBe(33);
        });
    });
    describe('variables_get_string_block', () => {
        it('get the string variable from the previous frame', () => {
            let previousFrame = new arduino_frame_1.ArduinoFrame('block_id', { 'variable_name': {
                    name: 'variable_name',
                    type: 'String',
                    value: 'Hello World'
                }
            }, [], new command_1.EmptyCommand());
            mockGetVariable('colour', 'variable_name');
            expect(variables_1.variables_get_string_block(block, previousFrame))
                .toBe('Hello World');
        });
    });
    describe('variables_get_string_block', () => {
        it('get the boolean variable from the previous frame', () => {
            let previousFrame = new arduino_frame_1.ArduinoFrame('block_id', { 'variable_name': {
                    name: 'variable_name',
                    type: 'Boolean',
                    value: false
                }
            }, [], new command_1.EmptyCommand());
            mockGetVariable('Boolean', 'variable_name');
            expect(variables_1.variables_get_string_block(block, previousFrame)).toBe(false);
        });
    });
    describe('variables_set_colour_block', () => {
        it('should use the default value if no block is attached', () => {
            mockSetVariable('Colour', 'variable_name', { red: 0, green: 0, blue: 0 }, null);
            let [frame] = variables_1.variables_set_colour_block(block);
            expect(frame.blockId).toBe(block.id);
            expect(frame.variables['variable_name'].name).toBe('variable_name');
            expect(frame.variables['variable_name'].value)
                .toEqual({ red: 0, green: 0, blue: 0 });
            expect(frame.variables['variable_name'].type).toBe('Colour');
        });
    });
});
//# sourceMappingURL=variables.spec.js.map
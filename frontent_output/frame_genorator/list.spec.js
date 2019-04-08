"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const list_1 = require("./list");
const blockly = require("../frame/block");
const arduino_frame_1 = require("../arduino/arduino_frame");
const pin_1 = require("../arduino/pin");
const blockHelper = require("../frame/blockly_helper");
const variableHelper = require("../frame_genorator/variables");
const command_1 = require("../frame/command");
describe('list generators', () => {
    let block;
    let blocklyMock;
    let fakeVariable = {
        'name': 'number list',
        'value': [],
        'type': 'Number List'
    };
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
        spyOn(blocklyMock.mainWorkspace, 'getVariableById')
            .withArgs('variable_id').and
            .callFake(() => fakeVariable);
        spyOn(block, 'getFieldValue')
            .withArgs('VAR')
            .and.returnValue('variable_id');
        spyOn(blockly, 'get_blockly').and.returnValue(blocklyMock);
    });
    describe('create_list_number_block_block', () => {
        it('should create an array variable in the frame that is blank', () => {
            fakeVariable = {
                type: 'Number List',
                value: [],
                name: 'numberList'
            };
            const [frame] = list_1.create_list_number_block_block(block);
            expect(frame.variables['numberList'].value).toEqual([]);
            expect(frame.variables['numberList'].name).toBe('numberList');
            expect(frame.variables['numberList'].type).toBe('Number List');
        });
        it('should copy over variables and components', () => {
            const pinComponent = new pin_1.Pin(pin_1.ARDUINO_UNO_PINS.PIN_1, pin_1.PIN_TYPE.DIGITAL, 1);
            const previousFrame = new arduino_frame_1.ArduinoFrame('block23', {
                'bill': {
                    type: 'Number',
                    name: 'bill',
                    value: 32
                }
            }, [pinComponent], new command_1.EmptyCommand());
            fakeVariable = {
                type: 'Number List',
                value: [],
                name: 'numberList'
            };
            const [frame] = list_1.create_list_number_block_block(block, previousFrame);
            expect(frame.variables['numberList'].value).toEqual([]);
            expect(frame.variables['numberList'].name).toBe('numberList');
            expect(frame.variables['numberList'].type).toBe('Number List');
            expect(frame.variables['bill'].type).toBe('Number');
            expect(frame.variables['bill'].value).toBe(32);
            expect(frame.variables['bill'].name).toBe('bill');
            expect(frame.components[0]).toBe(pinComponent);
        });
    });
    describe('create_list_string_block_block', () => {
        it('create_list_string_block_block', () => {
            fakeVariable = {
                type: 'String List',
                value: [],
                name: 'stringList'
            };
            const [frame] = list_1.create_list_string_block_block(block);
            expect(frame.variables['stringList'].value).toEqual([]);
            expect(frame.variables['stringList'].name).toBe('stringList');
            expect(frame.variables['stringList'].type).toBe('String List');
        });
    });
    describe('create_list_boolean_block_block', () => {
        it('create_list_boolean_block_block', () => {
            fakeVariable = {
                type: 'Boolean List',
                value: [],
                name: 'booleanList'
            };
            const [frame] = list_1.create_list_boolean_block_block(block);
            expect(frame.variables['booleanList'].value).toEqual([]);
            expect(frame.variables['booleanList'].name).toBe('booleanList');
            expect(frame.variables['booleanList'].type).toBe('Boolean List');
        });
    });
    describe('create_list_colour_block_block', () => {
        it('create_list_colour_block_block', () => {
            fakeVariable = {
                type: 'Colour List',
                value: [],
                name: 'color_list'
            };
            const [frame] = list_1.create_list_colour_block_block(block);
            expect(frame.variables['color_list'].value).toEqual([]);
            expect(frame.variables['color_list'].name).toBe('color_list');
            expect(frame.variables['color_list'].type).toBe('Colour List');
        });
    });
    describe('set_number_list_block_block & get_number_list_block_block', () => {
        it('it should set the index to zero if 1 is used', () => {
            fakeVariable = {
                type: 'Number List',
                value: [],
                name: 'numberList'
            };
            const [previousFrame] = list_1.create_list_number_block_block(block);
            mockSetArrayValue(previousFrame, 3, 0, 323, 'numberList');
            const [frame] = list_1.set_number_list_block_block(block, previousFrame);
            const arrayVariable = frame.variables['numberList'];
            expect(arrayVariable.name).toBe('numberList');
            expect(arrayVariable.value).toEqual([undefined, undefined, 323]);
            expect(list_1.get_number_from_list_block(block, previousFrame)).toBe(323);
        });
    });
    describe('set_number_list_block_block', () => {
        it('should set the string value in the array', () => {
            fakeVariable = {
                type: 'String List',
                value: [],
                name: 'stringList'
            };
            const [previousFrame] = list_1.create_list_string_block_block(block);
            mockSetArrayValue(previousFrame, 1, 0, 'Hello World', 'stringList');
            const [frame] = list_1.set_string_list_block_block(block, previousFrame);
            const arrayVariable = frame.variables['stringList'];
            expect(arrayVariable.name).toBe('stringList');
            expect(arrayVariable.value).toEqual(['Hello World']);
            expect(list_1.get_string_from_list_block(block, previousFrame)).toBe('Hello World');
        });
        describe('set_boolean_list_block_block', () => {
            it('should set a value to false for a boolean', () => {
                fakeVariable = {
                    type: 'Boolean List',
                    value: [],
                    name: 'boolList'
                };
                const [previousFrame] = list_1.create_list_boolean_block_block(block);
                mockSetArrayValue(previousFrame, 1, 0, false, 'boolList');
                const [frame] = list_1.set_boolean_list_block_block(block, previousFrame);
                const arrayVariable = frame.variables['boolList'];
                expect(arrayVariable.name).toBe('boolList');
                expect(arrayVariable.value).toEqual([false]);
                expect(list_1.get_boolean_from_list_block(block, previousFrame)).toBe(false);
            });
        });
        describe('set_colour_list_block_block & get_colour_list_block_block', () => {
            it('should set a colour value in the array', () => {
                fakeVariable = {
                    type: 'Colour List',
                    value: [],
                    name: 'colorList'
                };
                const [previousFrame] = list_1.create_list_colour_block_block(block);
                mockSetArrayValue(previousFrame, 1, 0, { red: 32, green: 0, blue: 120 }, 'colorList');
                const [frame] = list_1.set_colour_list_block_block(block, previousFrame);
                const arrayVariable = frame.variables['colorList'];
                expect(arrayVariable.name).toBe('colorList');
                expect(arrayVariable.value).toEqual([{ red: 32, green: 0, blue: 120 }]);
                expect(list_1.get_colour_from_list_block(block, previousFrame)).toEqual({ red: 32, green: 0, blue: 120 });
            });
        });
    });
    const mockSetArrayValue = (previousFrame, position, defaultValue, actualValue, variableName) => {
        const spyGetInputValue = spyOn(blockHelper, 'getInputValue');
        spyGetInputValue.withArgs(block, 'POSITION', 0, previousFrame)
            .and.returnValue(position);
        spyGetInputValue.withArgs(block, 'VALUE', defaultValue, previousFrame)
            .and.returnValue(actualValue);
        spyOn(variableHelper, 'getVariableName').withArgs(block).and.returnValue(variableName);
    };
});
//# sourceMappingURL=list.spec.js.map
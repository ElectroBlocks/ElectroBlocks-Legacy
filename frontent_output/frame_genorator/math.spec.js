"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jasmine");
const math_1 = require("./math");
const blockHelperFunctions = require("../frame/blockly_helper");
const arduino_frame_1 = require("../arduino/arduino_frame");
const command_1 = require("../frame/command");
describe('Math', () => {
    let mathOperation = 'ADD';
    let block;
    let previousFrame;
    let getInputValueSpy;
    let aValue = 30;
    let bValue = 20;
    let numValue;
    beforeEach(() => {
        previousFrame =
            new arduino_frame_1.ArduinoFrame('block_id', {}, [], new command_1.EmptyCommand());
        getInputValueSpy = spyOn(blockHelperFunctions, 'getInputValue');
        block = {
            getFieldValue(fieldName) {
                if (fieldName == 'OP') {
                    return mathOperation;
                }
                if (fieldName == 'NUM') {
                    return numValue;
                }
            }
        };
        getInputValueSpy
            .withArgs(block, 'A', 1, undefined)
            .and.callFake(() => aValue);
        getInputValueSpy
            .withArgs(block, 'B', 1, undefined)
            .and.callFake(() => bValue);
        getInputValueSpy
            .withArgs(block, 'A', 1, previousFrame)
            .and.callFake(() => aValue);
        getInputValueSpy
            .withArgs(block, 'B', 1, previousFrame)
            .and.callFake(() => bValue);
        getInputValueSpy
            .withArgs(block, 'NUM', 1, previousFrame)
            .and.callFake(() => numValue);
        getInputValueSpy
            .withArgs(block, 'NUM', 1, undefined)
            .and.callFake(() => numValue);
    });
    it('should parse a string to a number', () => {
        numValue = '3';
        expect(math_1.math_number_block(block)).toBe(3);
    });
    describe('math_arithmetic_block', () => {
        it('should be able to add 2 number', () => {
            mathOperation = 'ADD';
            aValue = 30;
            bValue = 22;
            expect(math_1.math_arithmetic_block(block)).toBe(52);
        });
        it('should be able to minus 2 number', () => {
            aValue = 10;
            bValue = 20;
            mathOperation = 'MINUS';
            expect(math_1.math_arithmetic_block(block)).toBe(-10);
        });
        it('should be able to multiply 2 number', () => {
            aValue = 3;
            bValue = 4;
            mathOperation = 'MULTIPLY';
            expect(math_1.math_arithmetic_block(block)).toBe(12);
        });
        it('should be able to divide to number together', () => {
            aValue = 20;
            bValue = 10;
            mathOperation = 'DIVIDE';
            expect(math_1.math_arithmetic_block(block)).toBe(2);
        });
        it('should be able to do exponential operation on a set of number', () => {
            aValue = 2;
            bValue = 3;
            mathOperation = 'POWER';
            expect(math_1.math_arithmetic_block(block, previousFrame)).toBe(8);
        });
    });
    describe('math_round_block', () => {
        it('should be able to round number up', () => {
            mathOperation = 'ROUNDUP';
            numValue = 33.32;
            expect(math_1.math_round_block(block, previousFrame)).toBe(34);
        });
        it('should be able to round down', () => {
            mathOperation = 'ROUNDDOWN';
            numValue = 33.22;
            expect(math_1.math_round_block(block)).toBe(33);
        });
        it('should be able to round', () => {
            mathOperation = 'ROUND';
            numValue = 33.22;
            expect(math_1.math_round_block(block, previousFrame)).toBe(33);
        });
    });
    describe('math_modulo_block', () => {
        it('should be able to get remainder', () => {
            getInputValueSpy
                .withArgs(block, 'DIVIDEND', 1, previousFrame)
                .and.callFake(() => 40);
            getInputValueSpy
                .withArgs(block, 'DIVISOR', 1, previousFrame)
                .and.callFake(() => 30);
            expect(math_1.math_modulo_block(block, previousFrame)).toBe(10);
        });
    });
    describe('math_random_int_block', () => {
        it('should be able to get a random number', () => {
            getInputValueSpy
                .withArgs(block, 'FROM', 1, previousFrame)
                .and.returnValue(0);
            getInputValueSpy
                .withArgs(block, 'TO', 10, previousFrame)
                .and.returnValue(10000);
            let randomNumber = math_1.math_random_int_block(block, previousFrame);
            expect(randomNumber >= 0 && randomNumber <= 100000).toBeTruthy();
            let randomNumber2 = math_1.math_random_int_block(block, previousFrame);
            expect(randomNumber).not.toEqual(randomNumber2);
        });
    });
    describe('string_to_number_block', () => {
        it('should a  string into a number', () => {
            getInputValueSpy
                .withArgs(block, 'VALUE', 0, previousFrame)
                .and.returnValue(332);
            const number = math_1.string_to_number_block(block, previousFrame);
            expect(number).toBe('332');
        });
    });
});
//# sourceMappingURL=math.spec.js.map
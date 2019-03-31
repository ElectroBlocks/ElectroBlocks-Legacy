"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jasmine");
const blockHelper = require("../frame/blockly_helper");
const variableHelper = require("./variables");
const text_1 = require("./text");
describe('text', () => {
    let block;
    let blockSpy;
    let getInputValueSpy;
    let generateFrameForInputStatementSpy;
    let getVariableNameSpy;
    beforeEach(() => {
        block = {
            id: 'block_id',
            getFieldValue(fieldName) {
            }
        };
        blockSpy = spyOn(block, 'getFieldValue');
        getInputValueSpy = spyOn(blockHelper, 'getInputValue');
        generateFrameForInputStatementSpy = spyOn(blockHelper, 'generateFrameForInputStatement');
        getVariableNameSpy = spyOn(variableHelper, 'getVariableName');
    });
    describe('text_block', () => {
        it('should get the text value from the block', () => {
            blockSpy.withArgs('TEXT').and.returnValue('HELLO WORLD');
            expect(text_1.text_block(block)).toBe('HELLO WORLD');
        });
    });
    describe('text_join_block', () => {
        it('should join multiple text string', () => {
            block.inputList = [1, 2, 3];
            getInputValueSpy
                .withArgs(block, 'ADD0', '', undefined)
                .and.returnValue('HELLO');
            getInputValueSpy
                .withArgs(block, 'ADD1', '', undefined)
                .and.returnValue(' ');
            getInputValueSpy
                .withArgs(block, 'ADD2', '', undefined)
                .and.returnValue('WORLD!');
            expect(text_1.text_join_block(block)).toBe('HELLO WORLD!');
        });
    });
    describe('text_changeCase_block', () => {
        it('should change to upper case', () => {
            blockSpy.withArgs('CASE').and.returnValue('UPPERCASE');
            getInputValueSpy
                .withArgs(block, 'TEXT', '', undefined)
                .and.returnValue('world!');
            expect(text_1.text_changeCase_block(block)).toBe('WORLD!');
        });
        it('should change to lower case', () => {
            blockSpy.withArgs('CASE').and.returnValue('lowercase');
            getInputValueSpy
                .withArgs(block, 'TEXT', '', undefined)
                .and.returnValue('WORLD!');
            expect(text_1.text_changeCase_block(block)).toBe('world!');
        });
    });
    describe('text_isEmpty_block', () => {
        it('should return true for empty text', () => {
            getInputValueSpy
                .withArgs(block, 'VALUE', '', undefined)
                .and.returnValue('');
            expect(text_1.text_isEmpty_block(block)).toBeTruthy();
        });
        it('should return false for regular text', () => {
            getInputValueSpy
                .withArgs(block, 'VALUE', '', undefined)
                .and.returnValue('HELLO');
            expect(text_1.text_isEmpty_block(block)).toBeFalsy();
        });
    });
    describe('number_to_string_block', () => {
        it('it should take a string and change it to a number', () => {
            blockSpy.withArgs('PRECISION').and.returnValue('2');
            getInputValueSpy
                .withArgs(block, 'NUMBER', 0, undefined)
                .and.returnValue(3.23343);
            expect(text_1.number_to_string_block(block)).toBe('3.23');
        });
    });
    describe('parse_string_block_block', () => {
        it('should take position 3 and change it to 2 position in the string list', () => {
            getInputValueSpy
                .withArgs(block, 'VALUE', '', undefined)
                .and.returnValue('blue,red,yellow');
            blockSpy.withArgs('DELIMITER').and.returnValue(',');
            getInputValueSpy
                .withArgs(block, 'POSITION', 0, undefined)
                .and.returnValue(3);
            expect(text_1.parse_string_block_block(block)).toBe('yellow');
        });
        it('it should take the 0 value and return the right value', () => {
            getInputValueSpy
                .withArgs(block, 'VALUE', '', undefined)
                .and.returnValue('blue,red,yellow');
            blockSpy.withArgs('DELIMITER').and.returnValue(',');
            getInputValueSpy
                .withArgs(block, 'POSITION', 0, undefined)
                .and.returnValue(0);
            expect(text_1.parse_string_block_block(block)).toBe('blue');
        });
    });
});
//# sourceMappingURL=text.spec.js.map
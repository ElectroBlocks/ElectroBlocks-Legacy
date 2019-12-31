import 'jasmine';
import { Block } from 'blockly';
import * as blockHelper from '../frame/blockly_helper';
import * as variableHelper from './variables';
import {
  number_to_string_block,
  parse_string_block_block,
  text_block,
  text_changeCase_block,
  text_isEmpty_block,
  text_join_block
} from './text';

describe('text', () => {
  let block: any | Block;

  let blockSpy: jasmine.Spy;

  let getInputValueSpy: jasmine.Spy;

  const frameLocation = { location: 'loop', iteration: 3 };

  let generateFrameForInputStatementSpy: jasmine.Spy;

  let getVariableNameSpy: jasmine.Spy;

  beforeEach(() => {
    block = {
      id: 'block_id',
      getFieldValue(fieldName: string): any {}
    };

    blockSpy = spyOn(block, 'getFieldValue');

    getInputValueSpy = spyOn(blockHelper, 'getInputValue');

    generateFrameForInputStatementSpy = spyOn(
      blockHelper,
      'generateFrameForInputStatement'
    );

    getVariableNameSpy = spyOn(variableHelper, 'getVariableName');
  });

  describe('text_block', () => {
    it('should get the text value from the block', () => {
      blockSpy.withArgs('TEXT').and.returnValue('HELLO WORLD');

      expect(text_block(block, frameLocation)).toBe('HELLO WORLD');
    });
  });

  describe('text_join_block', () => {
    it('should join multiple text string', () => {
      block.inputList = [1, 2, 3];

      getInputValueSpy
        .withArgs(block, 'ADD0', '', frameLocation, undefined)
        .and.returnValue('HELLO');

      getInputValueSpy
        .withArgs(block, 'ADD1', '', frameLocation, undefined)
        .and.returnValue(' ');

      getInputValueSpy
        .withArgs(block, 'ADD2', '', frameLocation, undefined)
        .and.returnValue('WORLD!');

      expect(text_join_block(block, frameLocation)).toBe('HELLO WORLD!');
    });
  });

  describe('text_changeCase_block', () => {
    it('should change to upper case', () => {
      blockSpy.withArgs('CASE').and.returnValue('UPPERCASE');
      getInputValueSpy
        .withArgs(block, 'TEXT', '', frameLocation, undefined)
        .and.returnValue('world!');

      expect(text_changeCase_block(block, frameLocation)).toBe('WORLD!');
    });

    it('should change to lower case', () => {
      blockSpy.withArgs('CASE').and.returnValue('lowercase');
      getInputValueSpy
        .withArgs(block, 'TEXT', '', frameLocation, undefined)
        .and.returnValue('WORLD!');

      expect(text_changeCase_block(block, frameLocation)).toBe('world!');
    });
  });

  describe('text_isEmpty_block', () => {
    it('should return true for empty text', () => {
      getInputValueSpy
        .withArgs(block, 'VALUE', '', frameLocation, undefined)
        .and.returnValue('');

      expect(text_isEmpty_block(block, frameLocation)).toBeTruthy();
    });

    it('should return false for regular text', () => {
      getInputValueSpy
        .withArgs(block, 'VALUE', '', frameLocation, undefined)
        .and.returnValue('HELLO');

      expect(text_isEmpty_block(block, frameLocation)).toBeFalsy();
    });
  });

  describe('number_to_string_block', () => {
    it('it should take a string and change it to a number', () => {
      blockSpy.withArgs('PRECISION').and.returnValue('2');

      getInputValueSpy
        .withArgs(block, 'NUMBER', 0, frameLocation, undefined)
        .and.returnValue(3.23343);

      expect(number_to_string_block(block, frameLocation)).toBe('3.23');
    });
  });

  describe('parse_string_block_block', () => {
    it('should take position 3 and change it to 2 position in the string list', () => {
      getInputValueSpy
        .withArgs(block, 'VALUE', '', frameLocation, undefined)
        .and.returnValue('blue,red,yellow');

      blockSpy.withArgs('DELIMITER').and.returnValue(',');

      getInputValueSpy
        .withArgs(block, 'POSITION', 0, frameLocation, undefined)
        .and.returnValue(3);

      expect(parse_string_block_block(block, frameLocation)).toBe('yellow');
    });

    it('it should take the 0 value and return the right value', () => {
      getInputValueSpy
        .withArgs(block, 'VALUE', '', frameLocation, undefined)
        .and.returnValue('blue,red,yellow');

      blockSpy.withArgs('DELIMITER').and.returnValue(',');

      getInputValueSpy
        .withArgs(block, 'POSITION', 0, frameLocation, undefined)
        .and.returnValue(0);

      expect(parse_string_block_block(block, frameLocation)).toBe('blue');
    });
  });
});

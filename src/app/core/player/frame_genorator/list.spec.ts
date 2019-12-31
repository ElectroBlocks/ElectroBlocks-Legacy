import {
  create_list_boolean_block_block,
  create_list_colour_block_block,
  create_list_number_block_block,
  create_list_string_block_block,
  get_boolean_from_list_block,
  get_colour_from_list_block,
  get_number_from_list_block,
  get_string_from_list_block,
  set_boolean_list_block_block,
  set_colour_list_block_block,
  set_number_list_block_block,
  set_string_list_block_block
} from './list';
import { Block, mainWorkspace } from 'blockly';
import * as Blockly from 'blockly/core';
import { Variable } from '../frame/variable';
import { ARDUINO_UNO_PINS, ArduinoFrame } from '../arduino/arduino_frame';
import { PIN_TYPE, PinPicture, PinState } from '../arduino/state/pin.state';
import * as blockHelper from '../frame/blockly_helper';
import * as variableHelper from './variables';
import { ArduinoState } from '../arduino/state/arduino.state';

describe('list generators', () => {
  let block: any | Block;

  const frameLocation = { location: 'loop', iteration: 3 };

  let blocklyMock: any | Blockly;

  let fakeVariable: any | Variable = {
    name: 'number list',
    value: [],
    type: 'Number List'
  };

  let spyGetInputValue: jasmine.Spy;

  beforeEach(() => {
    spyGetInputValue = spyOn(blockHelper, 'getInputValue');
    blocklyMock = {
      mainWorkspace: {
        getVariableById: () => {}
      }
    };

    Blockly.mainWorkspace = blocklyMock.mainWorkspace;
    block = {
      id: 'block_id',
      getFieldValue(fieldName: string): any {}
    };

    spyOn(blocklyMock.mainWorkspace, 'getVariableById')
      .withArgs('variable_id')
      .and.callFake(() => fakeVariable);

    spyOn(block, 'getFieldValue')
      .withArgs('VAR')
      .and.returnValue('variable_id')
      .withArgs('SIZE')
      .and.returnValue(3);
  });

  describe('create_list_number_block_block', () => {
    it('should create an array variable in the frame that is blank', () => {
      fakeVariable = {
        type: 'Number List',
        value: [],
        name: 'numberList'
      };

      const [frame] = create_list_number_block_block(block, frameLocation);

      expect(frame.state.variables['numberList'].value).toEqual([]);
      expect(frame.state.variables['numberList'].name).toBe('numberList');
      expect(frame.state.variables['numberList'].type).toBe('Number List');
    });

    it('should copy over variables and components', () => {
      const pinComponent = new PinState(
        ARDUINO_UNO_PINS.PIN_1,
        PIN_TYPE.DIGITAL_OUTPUT,
        1,
        PinPicture.SENSOR
      );

      const state = new ArduinoState(
        [pinComponent],
        {
          bill: {
            type: 'Number',
            name: 'bill',
            value: 32
          }
        },
        false
      );

      const previousFrame = new ArduinoFrame(
        'block23',
        state,
        {
          location: 'loop',
          iteration: 0
        },
        ''
      );

      fakeVariable = {
        type: 'Number List',
        value: [],
        name: 'numberList'
      };

      const [frame] = create_list_number_block_block(
        block,
        frameLocation,
        previousFrame
      );

      expect(frame.state.variables['numberList'].value).toEqual([]);
      expect(frame.state.variables['numberList'].name).toBe('numberList');
      expect(frame.state.variables['numberList'].type).toBe('Number List');

      expect(frame.state.variables['bill'].type).toBe('Number');
      expect(frame.state.variables['bill'].value).toBe(32);
      expect(frame.state.variables['bill'].name).toBe('bill');

      expect(frame.state.components[0]).toEqual(pinComponent);
    });
  });

  describe('create_list_string_block_block', () => {
    it('create_list_string_block_block', () => {
      fakeVariable = {
        type: 'String List',
        value: [],
        name: 'stringList'
      };

      const [frame] = create_list_string_block_block(block, frameLocation);

      expect(frame.state.variables['stringList'].value).toEqual([]);
      expect(frame.state.variables['stringList'].name).toBe('stringList');
      expect(frame.state.variables['stringList'].type).toBe('String List');
    });
  });

  describe('create_list_boolean_block_block', () => {
    it('create_list_boolean_block_block', () => {
      fakeVariable = {
        type: 'Boolean List',
        value: [],
        name: 'booleanList'
      };

      const [frame] = create_list_boolean_block_block(block, frameLocation);

      expect(frame.state.variables['booleanList'].value).toEqual([]);
      expect(frame.state.variables['booleanList'].name).toBe('booleanList');
      expect(frame.state.variables['booleanList'].type).toBe('Boolean List');
    });
  });

  describe('create_list_colour_block_block', () => {
    it('create_list_colour_block_block', () => {
      fakeVariable = {
        type: 'Colour List',
        value: [],
        name: 'color_list'
      };

      const [frame] = create_list_colour_block_block(block, frameLocation);

      expect(frame.state.variables['color_list'].value).toEqual([]);
      expect(frame.state.variables['color_list'].name).toBe('color_list');
      expect(frame.state.variables['color_list'].type).toBe('Colour List');
    });
  });

  describe('set_number_list_block_block & get_number_list_block_block', () => {
    it('it should set the index to zero if 1 is used', () => {
      fakeVariable = {
        type: 'Number List',
        value: [],
        name: 'numberList'
      };

      const [previousFrame] = create_list_number_block_block(
        block,
        frameLocation
      );

      mockSetArrayValue(previousFrame, 3, 0, 323, 'numberList');

      const [frame] = set_number_list_block_block(
        block,
        frameLocation,
        previousFrame
      );

      spyGetInputValue
        .withArgs(block, 'POSITION', 0, frameLocation, frame)
        .and.returnValue(1);

      const arrayVariable = frame.state.variables['numberList'];

      expect(arrayVariable.name).toBe('numberList');
      // It should set it back 1 because everything 0 indexed
      expect(arrayVariable.value).toEqual([undefined, undefined, 323]);
      spyGetInputValue
        .withArgs(block, 'POSITION', 0, frameLocation, frame)
        .and.returnValue(3);

      // Because it's the same position being expected this will work
      expect(get_number_from_list_block(block, frameLocation, frame)).toBe(323);
    });
  });

  describe('set_number_list_block_block', () => {
    it('should set the string value in the array', () => {
      fakeVariable = {
        type: 'String List',
        value: [],
        name: 'stringList'
      };

      const [previousFrame] = create_list_string_block_block(
        block,
        frameLocation
      );

      mockSetArrayValue(previousFrame, 1, 0, 'Hello World', 'stringList');

      const [frame] = set_string_list_block_block(
        block,
        frameLocation,
        previousFrame
      );

      spyGetInputValue
        .withArgs(block, 'POSITION', 0, frameLocation, frame)
        .and.returnValue(1);

      const arrayVariable = frame.state.variables['stringList'];

      expect(arrayVariable.name).toBe('stringList');
      // It should set it back 1 because everything 0 indexed
      expect(arrayVariable.value).toEqual(['Hello World']);

      // Because it's the same position being expected this will work
      expect(get_string_from_list_block(block, frameLocation, frame)).toBe(
        'Hello World'
      );
    });

    describe('set_boolean_list_block_block', () => {
      it('should set a value to false for a boolean', () => {
        fakeVariable = {
          type: 'Boolean List',
          value: [],
          name: 'boolList'
        };

        const [previousFrame] = create_list_boolean_block_block(
          block,
          frameLocation
        );

        mockSetArrayValue(previousFrame, 1, 0, false, 'boolList');

        const [frame] = set_boolean_list_block_block(
          block,
          frameLocation,
          previousFrame
        );

        spyGetInputValue
          .withArgs(block, 'POSITION', 0, frameLocation, frame)
          .and.returnValue(1);

        const arrayVariable = frame.state.variables['boolList'];

        expect(arrayVariable.name).toBe('boolList');
        // It should set it back 1 because everything 0 indexed
        expect(arrayVariable.value).toEqual([false]);

        // Because it's the same position being expected this will work
        expect(get_boolean_from_list_block(block, frameLocation, frame)).toBe(
          false
        );
      });
    });

    describe('set_colour_list_block_block & get_colour_list_block_block', () => {
      it('should set a colour value in the array', () => {
        fakeVariable = {
          type: 'Colour List',
          value: [],
          name: 'colorList'
        };

        const [previousFrame] = create_list_colour_block_block(
          block,
          frameLocation
        );

        mockSetArrayValue(
          previousFrame,
          1,
          0,
          { red: 32, green: 0, blue: 120 },
          'colorList'
        );

        const [frame] = set_colour_list_block_block(
          block,
          frameLocation,
          previousFrame
        );

        spyGetInputValue
          .withArgs(block, 'POSITION', 0, frameLocation, frame)
          .and.returnValue(1);

        const arrayVariable = frame.state.variables['colorList'];

        expect(arrayVariable.name).toBe('colorList');
        // It should set it back 1 because everything 0 indexed
        expect(arrayVariable.value).toEqual([{ red: 32, green: 0, blue: 120 }]);

        // Because it's the same position being expected this will work
        expect(get_colour_from_list_block(block, frameLocation, frame)).toEqual(
          { red: 32, green: 0, blue: 120 }
        );
      });
    });
  });

  const mockSetArrayValue = (
    previousFrame: ArduinoFrame,
    position: number,
    defaultValue: any,
    actualValue: any,
    variableName: string
  ) => {
    spyGetInputValue
      .withArgs(block, 'POSITION', 0, frameLocation, previousFrame)
      .and.returnValue(position);

    spyGetInputValue
      .withArgs(block, 'VALUE', defaultValue, frameLocation, previousFrame)
      .and.returnValue(actualValue);

    spyOn(variableHelper, 'getVariableName')
      .withArgs(block)
      .and.returnValue(variableName);
  };
});

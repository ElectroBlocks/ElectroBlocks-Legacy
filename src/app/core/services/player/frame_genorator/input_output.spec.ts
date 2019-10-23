import 'jasmine';
import { Block } from 'blockly';
import { analog_write_block, digital_write_block } from './input_output';
import { ARDUINO_UNO_PINS, ArduinoFrame } from '../arduino/arduino_frame';
import * as blockHelper from '../frame/blockly_helper';
import { ArduinoState } from '../arduino/state/arduino.state';
import { PIN_TYPE, PinPicture, PinState } from '../arduino/state/pin.state';

describe('input output frame generators', () => {
  let block: any | Block;

  let getFieldValueSpy: any | jasmine.Spy;

  let getInputValueSpy: any | jasmine.Spy;

  beforeEach(() => {
    block = {
      getFieldValue(fieldName: string): any {}
    };

    getInputValueSpy = spyOn(blockHelper, 'getInputValue');
    getFieldValueSpy = spyOn(block, 'getFieldValue');
  });

  describe('digital_write_block', () => {
    it(' create a digital write high from block', () => {
      const state = new ArduinoState(
        [],
        {
          hello: {
            name: 'hello',
            type: 'String',
            value: 'Hello'
          }
        },
        false
      );

      const previousFrame = new ArduinoFrame('asdf', state, {
        location: 'loop',
        iteration: 0
      });

      getFieldValueSpy.withArgs('PIN').and.returnValue('3');
      getFieldValueSpy.withArgs('STATE').and.returnValue('ON');

      const [frame] = digital_write_block(
        block,
        { location: 'loop', iteration: 3 },
        previousFrame
      );

      const pinState = frame.state.components.find(
        component => component instanceof PinState
      ) as PinState;

      expect(pinState.state).toBe(1);
      expect(pinState.type).toBe(PIN_TYPE.DIGITAL_OUTPUT);
      expect(pinState.pin).toBe(ARDUINO_UNO_PINS.PIN_3);

      expect(frame.state.variables['hello'].name).toBe('hello');
      expect(frame.state.variables['hello'].value).toBe('Hello');
      expect(frame.state.variables['hello'].type).toBe('String');
    });

    it('should create a digital write frame that has the led off', () => {
      getFieldValueSpy.withArgs('PIN').and.returnValue('3');
      getFieldValueSpy.withArgs('STATE').and.returnValue('OFF');

      const [frame] = digital_write_block(block, {
        location: 'loop',
        iteration: 3
      });

      const pinState = frame.state.components.find(
        component => component instanceof PinState
      ) as PinState;

      expect(pinState.state).toBe(0);
      expect(pinState.type).toBe(PIN_TYPE.DIGITAL_OUTPUT);
      expect(pinState.pin).toBe(ARDUINO_UNO_PINS.PIN_3);
    });

    it('should not generate another component but replace the old one if it exists', () => {
      const frameLocation = { location: 'loop', iteration: 3 };
      getFieldValueSpy.withArgs('PIN').and.returnValue('A0');

      const state = new ArduinoState(
        [
          new PinState(
            ARDUINO_UNO_PINS.PIN_A0,
            PIN_TYPE.ANALOG_OUTPUT,
            30,
            PinPicture.GENERIC
          )
        ],
        {
          hello: {
            name: 'hello',
            type: 'String',
            value: 'Hello'
          }
        },
        false
      );

      const previousFrame = new ArduinoFrame('asdf', state, {
        location: 'loop',
        iteration: 0
      });

      getInputValueSpy
        .withArgs(block, 'WRITE_VALUE', 0, frameLocation, previousFrame)
        .and.returnValue(130);

      const [frame] = analog_write_block(block, frameLocation, previousFrame);

      expect(frame.state.components.length).toBe(1);

      const pinState = frame.state.components[0] as PinState;

      expect(pinState.state).toBe(130);
      expect(pinState.type).toBe(PIN_TYPE.ANALOG_OUTPUT);
      expect(pinState.pin).toBe(ARDUINO_UNO_PINS.PIN_A0);
    });
  });
});

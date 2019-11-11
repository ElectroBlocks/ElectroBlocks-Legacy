import 'jasmine';
import { Block } from 'blockly';
import { ArduinoFrame } from '../arduino/arduino_frame';
import { arduino_send_message_block } from './message';
import * as blockHelperFunctions from '../frame/blockly_helper';
import { ArduinoState } from '../arduino/state/arduino.state';
import { ArduinoMessageState } from '../arduino/state/arduino-message.state';

describe('message', () => {
  const usbblock: any | Block = {
    id: 'blockId',
    type: 'send_message'
  };

  let getInputValueSpy: jasmine.Spy;

  const state = new ArduinoState(
    [new ArduinoMessageState(false, 'hello world')],
    {
      fred: {
        name: 'fred',
        type: 'String',
        value: 'blue'
      }
    }
  );

  const previousFrame = new ArduinoFrame(
    'block1',
    state,
    {
      location: 'loop',
      iteration: 1
    },
    ''
  );

  beforeEach(() => {
    getInputValueSpy = spyOn(blockHelperFunctions, 'getInputValue');
  });

  it(`should have state stored in previous frame if it's there.`, () => {
    getInputValueSpy
      .withArgs(
        usbblock,
        'MESSAGE',
        '',
        { location: 'loop', iteration: 1 },
        previousFrame
      )
      .and.returnValue('Hello World');

    const frames = arduino_send_message_block(
      usbblock,
      { location: 'loop', iteration: 1 },
      previousFrame
    );

    expect(frames.length).toBe(1);
    const [frame] = frames;

    expect(frame.state.variables['fred'].value).toBe('blue');
    expect(frame.state.sendMessage).toBe('Hello World');
  });

  it('should return message attached to the block ', () => {
    getInputValueSpy
      .withArgs(
        usbblock,
        'MESSAGE',
        '',
        { location: 'loop', iteration: 1 },
        undefined
      )
      .and.returnValue('People Cool');

    const frames = arduino_send_message_block(usbblock, {
      location: 'loop',
      iteration: 1
    });

    expect(frames.length).toBe(1);
    const [frame] = frames;

    expect(frame.state.variables).toEqual({});
    expect(frame.state.sendMessage).toBe('People Cool');
  });
});

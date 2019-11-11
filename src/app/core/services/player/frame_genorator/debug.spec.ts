import 'jasmine';
import { Block } from 'blockly';
import { ArduinoFrame } from '../arduino/arduino_frame';
import { debug_block } from './debug';
import { ArduinoState } from '../arduino/state/arduino.state';

describe('debug', () => {
  const block: any | Block = {
    id: 'blockId'
  };

  const state = new ArduinoState(
    [],
    {
      fred: {
        name: 'fred',
        type: 'String',
        value: 'blue'
      }
    },
    false
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

  it('should copy over the variables', () => {
    const frames = debug_block(
      block,
      { location: 'loop', iteration: 1 },
      previousFrame
    );

    expect(frames.length).toBe(1);
    const [frame] = frames;

    expect(frame.state.variables['fred'].value).toBe('blue');
  });

  it('should be able to work without previous frame', () => {
    const frames = debug_block(block, { location: 'loop', iteration: 1 });

    expect(frames.length).toBe(1);
    const [frame] = frames;

    expect(frame.state.variables).toEqual({});
  });
});

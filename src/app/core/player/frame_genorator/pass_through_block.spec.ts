import 'jasmine';
import { ArduinoFrame } from '../arduino/arduino_frame';
import { temp_setup_block } from './pass_through_block';
import { Block } from 'blockly';
import { ArduinoState } from '../arduino/state/arduino.state';

describe('pass through frame generator', () => {
  const previousFrame = new ArduinoFrame(
    'block1',
    new ArduinoState([], {
      fred: {
        value: 'blue',
        type: 'String',
        name: 'fred'
      }
    }),
    { location: 'loop', iteration: 1 },
    ''
  );

  const block: any | Block = {
    id: 'block_id'
  };

  it('should use the previous frame if defined', () => {
    const [frame] = temp_setup_block(
      block,
      { iteration: 1, location: 'loop' },
      previousFrame
    );

    expect(frame.state.variables['fred'].value).toBe('blue');
  });
});

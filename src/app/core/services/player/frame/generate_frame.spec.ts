import 'jasmine';
import { inputState } from './input_state';
import * as blockHelper from './blockly_helper';
import * as Blockly from 'blockly/core';
import { ArduinoFrame } from '../arduino/arduino_frame';
import { generateListOfFrame } from './generate_frame';

describe('Generate Frames', () => {
  let blocklyMock: any | Blockly;

  const frameLocation = { location: 'loop', iteration: 3 };

  beforeEach(() => {
    inputState.clearBlockCalls();

    blocklyMock = {
      mainWorkspace: {
        getTopBlocks(): any[] {
          return [
            {
              type: 'arduino_start',
              disabled: false
            },
            {
              type: 'procedures_defnoreturn',
              disabled: false
            },
            {
              type: 'generate_fake',
              disabled: true
            }
          ];
        }
      }
    };

    Blockly.mainWorkspace = blocklyMock.mainWorkspace;
  });

  it('should generate number of frames based on the number of times going through the loop', async () => {
    const generateLoopSpy = spyOn(
      blockHelper,
      'generateFrameForInputStatement'
    );

    generateLoopSpy
      .withArgs(
        { type: 'arduino_start', disabled: false },
        'setup',
        { location: 'setup', iteration: 0 },
        null
      )
      .and.callFake(() => [
        ArduinoFrame.makeEmptyFrame('block_id', frameLocation)
      ]);

    generateLoopSpy
      .withArgs(
        { type: 'arduino_start', disabled: false },
        'loop',
        { location: 'loop', iteration: jasmine.any(Number) },
        jasmine.anything()
      )
      .and.callFake(() => [
        ArduinoFrame.makeEmptyFrame('block_id', frameLocation),
        ArduinoFrame.makeEmptyFrame('block_id', frameLocation)
      ]);

    expect((await generateListOfFrame(1)).length).toBe(3);

    expect((await generateListOfFrame(2)).length).toBe(5);
  });
});

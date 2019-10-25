import 'jasmine';
import * as blockHelper from './blockly_helper';
import * as Blockly from 'blockly/core';
import { ArduinoFrame } from '../arduino/arduino_frame';
import { generateListOfFrame } from './generate_frame';

describe('Generate Frames', () => {
  let blocklyMock: any | Blockly;
  let numberOfTimesThroughLoop = 3;
  const frameLocation = { location: 'loop', iteration: 3 };

  beforeEach(() => {
    blocklyMock = {
      mainWorkspace: {
        getTopBlocks(): any[] {
          return [
            {
              type: 'arduino_start',
              isEnabled: () => {
                return true;
              },
              getFieldValue(fieldName: string) {
                return numberOfTimesThroughLoop;
              }
            },
            {
              type: 'procedures_defnoreturn',
              isEnabled: () => {
                return true;
              }
            },
            {
              type: 'generate_fake',
              isEnabled: () => {
                return true;
              }
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

    // SETUP FUNCTION
    generateLoopSpy
      .withArgs(
        jasmine.objectContaining({ type: 'arduino_start' }),
        'setup',
        { location: 'setup', iteration: 0 },
        null
      )
      .and.callFake(() => [
        ArduinoFrame.makeEmptyFrame('block_id', frameLocation)
      ]);

    // LOOP FUNCTION
    generateLoopSpy
      .withArgs(
        jasmine.objectContaining({ type: 'arduino_start' }),
        'loop',
        { location: 'loop', iteration: jasmine.any(Number) },
        jasmine.anything()
      )
      .and.callFake(() => [
        ArduinoFrame.makeEmptyFrame('block_id', frameLocation),
        ArduinoFrame.makeEmptyFrame('block_id', frameLocation)
      ]);

    expect((await generateListOfFrame()).length).toBe(7);

    numberOfTimesThroughLoop = 1;
    expect((await generateListOfFrame()).length).toBe(3);
  });
});

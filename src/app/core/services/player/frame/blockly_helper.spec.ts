import { frameGeneratingBlocks, valueGeneratingBlocks } from './frame_list';
import { Frame, FrameLocation } from './frame';
import { ArduinoFrame } from './../arduino/arduino_frame';
import {
  generateFrameForInputStatement,
  getInputValue
} from './blockly_helper';
import { ArduinoState } from './../arduino/state/arduino.state';
import { Block, Connection } from 'blockly';

describe('generateFrameForInputStatement', () => {
  const frameLocation = { location: 'loop', iteration: 0 };

  it('should generate a list of frames from a input that contains blocks', () => {
    frameGeneratingBlocks['fake_generate_block'] = (
      block: Block | any,
      frameLocation: FrameLocation,
      previousFrame?: Frame
    ): Frame[] => {
      return [
        new ArduinoFrame(
          'block_id',
          ArduinoState.makeEmptyState(),
          frameLocation, ''
        )
      ];
    };

    frameGeneratingBlocks['fake_generate_2_block'] = (
      block: Block | any,
      frameLocation: FrameLocation,
      previousFrame?: Frame
    ): Frame[] => {
      return [
        new ArduinoFrame(
          'block_id',
          ArduinoState.makeEmptyState(),
          frameLocation, ''
        ),
        new ArduinoFrame(
          'block_id',
          ArduinoState.makeEmptyState(),
          frameLocation, ''
        )
      ];
    };

    const block3: Block | any = {
      type: 'fake_generate',
      isEnabled: () => {
        return false;
      }
    };

    const block2: Block | any = {
      type: 'fake_generate_2',
      isEnabled: () => {
        return true;
      },
      nextConnection: {
        targetBlock(): Block {
          return block3;
        }
      }
    };

    const block1: Block | any = {
      type: 'fake_generate',
      isEnabled: () => {
        return true;
      },
      nextConnection: {
        targetBlock(): Block {
          return block2;
        }
      }
    };

    const topBlock: Block | any = {
      type: 'fake_generate',
      isEnabled: () => {
        return true;
      },
      nextConnection: {
        targetBlock(): Block {
          return block1;
        }
      }
    };

    const containerBlock: Block | any = {
      getInputTargetBlock(statementName: string): Block {
        return topBlock;
      },
      isEnabled: () => {
        return true;
      }
    };

    const frames = generateFrameForInputStatement(
      containerBlock,
      'start',
      null
    );

    expect(frames.length).toBe(4);
    expect(frames[0]).toEqual(jasmine.any(ArduinoFrame));
    expect(frames[1]).toEqual(jasmine.any(ArduinoFrame));
    expect(frames[2]).toEqual(jasmine.any(ArduinoFrame));
    expect(frames[3]).toEqual(jasmine.any(ArduinoFrame));
  });

  it('should get the input value from a block', () => {
    valueGeneratingBlocks['number_block'] = (
      block: Block,
      frameLocation: FrameLocation,
      previousFrame?: Frame
    ) => 4;

    const targetBlockContainingValue: Block | any = {
      type: 'number'
    };

    const parentBlock: Block | any = {
      getInput(inputName: string): { connection: Connection | any } {
        return {
          connection: {
            getSourceBlock(): Block {
              return parentBlock;
            },
            targetBlock(): Block {
              return targetBlockContainingValue;
            }
          }
        };
      }
    };

    expect(getInputValue(parentBlock, 'VALUE', 0, frameLocation)).toBe(4);
  });

  it('should get the value from the inputState class for debug blocks', () => {
    const targetBlockContainingValue: Block | any = {
      id: 'block_id',
      type: 'text',
      getFieldValue(fieldName: string) {
        return 'awesome';
      }
    };

    const parentBlock: Block | any = {
      getInput(inputName: string): { connection: Connection | any } {
        return {
          connection: {
            getSourceBlock(): Block {
              return parentBlock;
            },
            targetBlock(): Block {
              return targetBlockContainingValue;
            }
          }
        };
      }
    };

    expect(getInputValue(parentBlock, 'VALUE', 0, frameLocation)).toBe(
      'awesome'
    );
  });

  it('should use default value if no blocks are attached', () => {
    const parentBlock: Block | any = {
      getInput(inputName: string): { connection: Connection | any } {
        return {
          connection: {
            getSourceBlock(): Block {
              return parentBlock;
            },
            targetBlock(): Block {
              return null;
            }
          }
        };
      }
    };

    expect(getInputValue(parentBlock, 'VALUE', 0, frameLocation)).toBe(0);
  });
});

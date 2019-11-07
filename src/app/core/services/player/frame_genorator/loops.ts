import { ArduinoFrame } from '../arduino/arduino_frame';
import {
  generateFrameForInputStatement,
  getInputValue
} from '../frame/blockly_helper';
import { getVariableName } from './variables';
import { Block } from 'blockly';
import { Frame, FrameLocation } from '../frame/frame';
import { ArduinoState } from '../arduino/state/arduino.state';
import { Step } from '../arduino/step';

/**
 * Generates a simple loop block where the user does not have control
 * over the index variable.
 */
const controls_repeat_ext_block = (
  block: Block,
  frameLocation: FrameLocation,
  previousFrame?: ArduinoFrame
) => {

  const times = getInputValue(
    block,
    'TIMES',
    1,
    frameLocation,
    previousFrame
  ) as number;

  const copiedState = previousFrame ? previousFrame.copyState() : new ArduinoState([], {});

  if (times <= 0) {
    return [new ArduinoFrame(block.id, copiedState, frameLocation, [
      new Step(block.id, 'Will not run the loop becuase it is set to run 0 times!')
    ])];
  }

      const step = new Step(
        block.id,
        `Repeat block running 1 out of ${times} times.`
      );

  const firstLoopFrame = new ArduinoFrame(block.id, copiedState, frameLocation, [
    step
  ]);

  let frames = generateFrameForInputStatement(
    block,
    'DO',
    frameLocation,
    firstLoopFrame
  ) as ArduinoFrame[];
  frames.unshift(firstLoopFrame);

  for (let i = 1; i < times; i += 1) {
    previousFrame = frames[frames.length - 1];
    const loopFrame = new ArduinoFrame(block.id, previousFrame.copyState(), previousFrame.frameLocation, [
      new Step(
        block.id,
        `Repeat block running ${i + 1} out of ${times} times.`
      )
    ]);

    if (times - 1 > i) {
      frames.push(loopFrame);
    }

    frames = frames.concat(generateFrameForInputStatement(
      block,
      'DO',
      frameLocation,
      loopFrame
    ) as ArduinoFrame[]);
  }

  return frames;
};

/**
 * A for / count with block
 */
const controls_for_block = (
  block: Block,
  frameLocation: FrameLocation,
  previousFrame?: ArduinoFrame
) => {
  const start = parseInt(
    getInputValue(block, 'FROM', 1, frameLocation, previousFrame).toString(), 0
  );

  const to = parseInt(
    getInputValue(block, 'TO', 1, frameLocation, previousFrame).toString(), 0
  );

  let by = Math.abs(
    parseInt(
      getInputValue(block, 'BY', 1, frameLocation, previousFrame).toString(), 0
    )
  );

  const loopFrame = generateLoopFrame(
    start,
    block,
    frameLocation,
    previousFrame
  );

  let frames = <ArduinoFrame[]>(
    generateFrameForInputStatement(block, 'DO', frameLocation, loopFrame)
  );

  frames.unshift(loopFrame);

  if (to === start) {
    return frames;
  }

  by *= to > start ? 1 : -1;

  let index = start + by;

  while (checkLoop(index, to, to > start)) {
    const nextLoopFrame = generateLoopFrame(
      index,
      block,
      frameLocation,
      frames[frames.length - 1]
    );
    frames.push(nextLoopFrame); // so that it copies the value and not the reference
    frames = frames.concat(<ArduinoFrame[]>(
      generateFrameForInputStatement(block, 'DO', frameLocation, nextLoopFrame)
    ));
    index += by;
  }

  return frames;
};

/**
 * Checks in the count with block if it should exit it
 */
const checkLoop = (index: number, to: number, isPositive: boolean) => {
  if (isPositive) {
    return index <= to;
  }

  return index >= to;
};

const generateLoopFrame = (
  indexValue: number,
  block: Block,
  frameLocation: FrameLocation,
  previousFrame?: ArduinoFrame
): ArduinoFrame => {
  const state = previousFrame
    ? previousFrame.copyState()
    : ArduinoState.makeEmptyState();
  const { variables } = state;

  const indexVariableName = getVariableName(block);

  variables[indexVariableName] = {
    type: 'Number',
    value: indexValue,
    name: indexVariableName
  };

  return new ArduinoFrame(block.id, state, frameLocation);
};

export { controls_for_block, controls_repeat_ext_block };

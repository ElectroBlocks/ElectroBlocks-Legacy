import { Block } from 'blockly';
import { ArduinoFrame } from '../arduino/arduino_frame';
import { getInputValue } from '../frame/blockly_helper';
import { FrameLocation } from '../frame/frame';
import { ArduinoState } from '../arduino/state/arduino.state';

export const delay_block_block = (
  block: Block,
  frameLocation: FrameLocation,
  previousFrame?: ArduinoFrame
) => {
  const copyFrame = previousFrame
    ? previousFrame.makeCopy(block.id, frameLocation)
    : ArduinoFrame.makeEmptyFrame(block.id, frameLocation);

  const time = getInputValue(
    block,
    'DELAY',
    1,
    frameLocation,
    previousFrame
  ).toString();

  const state = previousFrame
    ? previousFrame.copyState()
    : ArduinoState.makeEmptyState();

  const updatedState = new ArduinoState(
    state.components,
    state.variables,
    false,
    '',
    parseFloat(time) * 1000
  );

  const frame = new ArduinoFrame(block.id, updatedState, frameLocation);

  return [frame];
};

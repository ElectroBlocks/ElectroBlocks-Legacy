import { Block } from 'blockly';
import { ArduinoFrame } from '../arduino/arduino_frame';
import { getInputValue } from '../frame/blockly_helper';
import { FrameLocation } from '../frame/frame';
import { ArduinoState } from '../arduino/state/arduino.state';
import { getSensorData } from '../frame/generate_frame';
import { TimeState } from '../arduino/state/time.state';

export const delay_block_block = (
  block: Block,
  frameLocation: FrameLocation,
  previousFrame?: ArduinoFrame
) => {

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

export const time_seconds_block = (
         block: Block,
         frameLocation: FrameLocation,
         previousFrame?: ArduinoFrame
) => {
  const timeState = getTimeState(frameLocation);

  return timeState.timeInSeconds;
};

const getTimeState = (frameLocation: FrameLocation): TimeState => {
  const data = getSensorData();
  const loopNumber = frameLocation.iteration;
  return data[loopNumber].find(
    (component) => component instanceof TimeState
  ) as TimeState;
};

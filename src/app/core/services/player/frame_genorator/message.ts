import { Block } from 'blockly';
import { FrameLocation } from '../frame/frame';
import { ArduinoFrame } from '../arduino/arduino_frame';
import { getInputValue } from '../frame/blockly_helper';
import { ArduinoState } from '../arduino/state/arduino.state';

export const arduino_send_message_block = (
  block: Block,
  frameLocation: FrameLocation,
  previousFrame?: ArduinoFrame
): ArduinoFrame[] => {
  const message = getInputValue(
    block,
    'MESSAGE',
    '',
    frameLocation,
    previousFrame
  ).toString();

  const state = previousFrame
    ? previousFrame.copyState()
    : ArduinoState.makeEmptyState();

  const updatedState = new ArduinoState(
    state.components,
    state.variables,
    true,
    false,
    message
  );

  return [new ArduinoFrame(block.id, updatedState, frameLocation)];
};

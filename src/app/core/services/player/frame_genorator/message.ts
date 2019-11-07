import { Block } from 'blockly';
import { FrameLocation } from '../frame/frame';
import { ArduinoFrame } from '../arduino/arduino_frame';
import { getInputValue } from '../frame/blockly_helper';
import { ArduinoState } from '../arduino/state/arduino.state';
import { getSensorData } from '../frame/generate_frame';
import { ArduinoMessageState } from '../arduino/state/arduino-message.state';
import { Step } from '../arduino/step';

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
    message
  );

  const step = new Step(block.id, `Arduino sending message to computer: ${message}`);

  return [new ArduinoFrame(block.id, updatedState, frameLocation)];
};

export const arduino_get_message_block = (block: Block,
  frameLocation: FrameLocation,
  previousFrame?: ArduinoFrame
) => {
  const messageState = getArduionMessage(frameLocation);

  return messageState.message;

};

export const arduino_receive_message_block = (
         block: Block,
         frameLocation: FrameLocation,
         previousFrame?: ArduinoFrame
       ) => {
         const messageState = getArduionMessage(frameLocation);

         return messageState.recievingMessage;
       };


const getArduionMessage = (frameLocation: FrameLocation): ArduinoMessageState => {
  const data = getSensorData();
  const loopNumber = frameLocation.iteration;
  return data[loopNumber].find(
    (component) => component instanceof ArduinoMessageState
  ) as ArduinoMessageState;
};

import { Block } from 'blockly';
import { ArduinoFrame } from '../arduino/arduino_frame';
import { getInputValue } from '../frame/blockly_helper';
import { FrameLocation } from '../frame/frame';
import { ArduinoState } from '../arduino/state/arduino.state';
import { ServoState } from '../arduino/state/servo.state';
import { stringToPin } from '../arduino/arduino_frame';
import { Step } from '../arduino/step';

export const rotate_servo_block = (
  block: Block,
  frameLocation: FrameLocation,
  previousFrame?: ArduinoFrame
): ArduinoFrame[] => {
  const state = previousFrame
    ? previousFrame.copyState()
    : ArduinoState.makeEmptyState();

  const pin = block.getFieldValue('PIN').toString();

  const angle = parseInt(
    getInputValue(block, 'DEGREE', 0, frameLocation, previousFrame).toString(),
    0
  );

  const servoState = state.components.find(
    (component) =>
      component instanceof ServoState && component.pin === stringToPin(pin)
  ) as ServoState;

  if (servoState instanceof ServoState) {
    const index = state.components.indexOf(servoState);

    state.components[index] = new ServoState(angle, stringToPin(pin));
  } else {
    state.components.push(new ServoState(angle, stringToPin(pin)));
  }

  const step = new Step(block.id, `Rotating servo ${servoState.pin} to this angle ${servoState.degree}°.`);

  return [new ArduinoFrame(block.id, state, frameLocation, [step])];
};

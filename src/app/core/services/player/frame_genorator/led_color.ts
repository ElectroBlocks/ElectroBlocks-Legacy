import { Block } from 'blockly';
import { FrameLocation } from '../frame/frame';
import { ArduinoFrame, stringToPin } from '../arduino/arduino_frame';
import { ArduinoState } from '../arduino/state/arduino.state';
import { LedColorState } from '../arduino/state/led_color.state';
import { getInputValue } from '../frame/blockly_helper';
import { Color } from './color';

export const led_color_setup_block = (
  block: Block,
  frameLocation: FrameLocation,
  previousFrame?: ArduinoFrame
): ArduinoFrame[] => {
  const state = previousFrame
    ? previousFrame.copyState()
    : ArduinoState.makeEmptyState();

  const [redPinString, greenPinString, bluePinString] = block
    .getFieldValue('WIRE')
    .split('-');

  const greenPin = stringToPin(greenPinString);
  const redPin = stringToPin(redPinString);
  const bluePin = stringToPin(bluePinString);
  const type =
    block.getFieldValue('PICTURE_TYPE') === 'BREADBOARD'
      ? 'BREADBOARD'
      : 'BUILT_IN';

  state.components.push(
    new LedColorState(redPin, greenPin, bluePin, type, {
      red: 0,
      green: 0,
      blue: 0
    })
  );

  return [new ArduinoFrame(block.id, state, frameLocation)];
};

export const set_color_led_block = (
  block: Block,
  frameLocation: FrameLocation,
  previousFrame?: ArduinoFrame
): ArduinoFrame[] => {
  const state = previousFrame
    ? previousFrame.copyState()
    : ArduinoState.makeEmptyState();
  const ledColor = state.components.find(
    c => c instanceof LedColorState
  ) as LedColorState;

  const color = getInputValue(
    block,
    'COLOUR',
    { red: 255, blue: 0, green: 0 },
    frameLocation,
    previousFrame
  ) as Color;

  ledColor.color.red = color.red;
  ledColor.color.blue = color.blue;
  ledColor.color.green = color.green;

  return [new ArduinoFrame(block.id, state, frameLocation)];
};

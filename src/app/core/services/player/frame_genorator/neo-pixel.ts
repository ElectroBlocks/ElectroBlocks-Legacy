import { Block } from 'blockly';
import { FrameLocation } from '../frame/frame';
import { ArduinoFrame } from '../arduino/arduino_frame';
import { getInputValue } from '../frame/blockly_helper';
import { Color } from './color';
import { NeoPixelStripState } from '../arduino/state/neo_pixel_strip.state';
import { ArduinoState } from '../arduino/state/arduino.state';
import { stringToPin } from '../arduino/arduino_frame';

export const neo_pixel_setup_block = (
  block: Block,
  frameLocation: FrameLocation,
  previousFrame?: ArduinoFrame
): ArduinoFrame[] => {
  const state = previousFrame
    ? previousFrame.copyState()
    : ArduinoState.makeEmptyState();

  if (state.components.find(c => c instanceof NeoPixelStripState)) {
    return [];
  }

  const pin = stringToPin(block.getFieldValue('PIN').toString());

  const numberOfPixels = parseInt(block.getFieldValue('NUMBER_LEDS'));

  const leds: Array<{ position: number; color: Color }> = [];

  for (let i = 1; i <= numberOfPixels; i += 1) {
    leds.push({ position: i, color: { red: 0, green: 0, blue: 0 } });
  }

  const neoPixelState = new NeoPixelStripState(numberOfPixels, pin, leds);

  state.components.push(neoPixelState);

  return [new ArduinoFrame(block.id, state, frameLocation)];
};

export const neo_pixel_set_color_block = (
  block: Block,
  frameLocation: FrameLocation,
  previousFrame?: ArduinoFrame
): ArduinoFrame[] => {
  const color = getInputValue(
    block,
    'COLOR',
    { red: 33, green: 0, blue: 0 },
    frameLocation,
    previousFrame
  ) as Color;

  const position = parseInt(
    getInputValue(block, 'POSITION', 1, frameLocation, previousFrame).toString()
  );

  const state = previousFrame.copyState();

  const neoPixelState = state.components.find(
    c => c instanceof NeoPixelStripState
  ) as NeoPixelStripState;

  const index = neoPixelState.neoPixels.findIndex(
    pixel => pixel.position == position
  );

  if (neoPixelState.neoPixels[index]) {
    neoPixelState.neoPixels[index].color = color;
  }

  return [new ArduinoFrame(block.id, state, frameLocation)];
};

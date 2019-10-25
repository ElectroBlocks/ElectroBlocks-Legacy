/**
 * Some super weird error where you can't have interfaces with exported functions
 */
import { getInputValue } from '../frame/blockly_helper';
import { ArduinoFrame } from '../arduino/arduino_frame';
import { Color, hexToRgb } from './color';
import { Block } from 'blockly';
import { FrameLocation } from '../frame/frame';
import { getRandomInt } from './math';

export const colour_picker_block = (
  block: Block,
  frameLocation: FrameLocation,
  previousFrame?: ArduinoFrame
): Color => {
  const value = block.getFieldValue('COLOUR');

  return hexToRgb(value);
};

/**
 * Returns a random colour object
 *
 */
export const colour_random_block = (
  block: Block,
  frameLocation: FrameLocation,
  previousFrame?: ArduinoFrame
): Color => {
  return {
    red: getRandomInt(0, 255),
    green: getRandomInt(0, 255),
    blue: getRandomInt(0, 255)
  };
};

/**
 * Returns a colour object
 *
 */
export const colour_rgb_block = (
  block: Block,
  frameLocation: FrameLocation,
  previousFrame?: ArduinoFrame
): Color => {
  const red = getInputValue(
    block,
    'RED',
    0,
    frameLocation,
    previousFrame
  ).toString();

  const green = getInputValue(
    block,
    'GREEN',
    0,
    frameLocation,
    previousFrame
  ).toString();

  const blue = getInputValue(
    block,
    'BLUE',
    0,
    frameLocation,
    previousFrame
  ).toString();

  console.log(red, green, blue);

  return { red: parseInt(red), green: parseInt(green), blue: parseInt(blue) };
};

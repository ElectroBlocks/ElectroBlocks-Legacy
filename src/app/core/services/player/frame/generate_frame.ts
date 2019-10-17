import { ArduinoFrame, ARDUINO_UNO_PINS } from './../arduino/arduino_frame';
import { frameGeneratingBlocks } from './frame_list';
import { generateFrameForInputStatement } from './blockly_helper';
import * as Blockly from 'blockly/core';
import { Block } from 'blockly';
import * as _ from 'lodash';
import { listOfStateHoldersBlocks } from './state_holder';
import { ElectricAttachmentComponentState } from '../arduino/state/electric.state';
import { blockMultipleSetup } from '../../blockly/events/enableDisableBlocks';
import { ButtonState } from '../arduino/state/button.state';
import { BluetoothState } from '../arduino/state/bluetooth.state';

export const generateListOfFrame = async (): Promise<
  ArduinoFrame[] | ARDUINO_UNO_PINS[]
> => {
  const arduinoBlock = Blockly.mainWorkspace
    .getTopBlocks()
    .filter(function(block) {
      return block.type === 'arduino_start';
    })[0];

  const numberOfTimesThroughLoop = arduinoBlock.getFieldValue('LOOP_TIMES');

  const sensorStatesForLoop = getSensorData();

  const topBlocks: Block[] = Blockly.mainWorkspace
    .getTopBlocks()
    .filter(block => block.type !== 'arduino_start');

  // If there are duplicate block
  if (hasDuplicateBlocks(topBlocks)) {
    return [];
  }

  const frames = new Array<ArduinoFrame>();
  topBlocks
    .filter(block => block.isEnabled() && (block as any).rendered)
    .filter(block => block.type !== 'procedures_defnoreturn')
    .forEach(block => {
      frameGeneratingBlocks[block.type + '_block'](
        block,
        { location: 'pre-setup', iteration: 0 },
        frames.length === 0 ? null : frames[frames.length - 1]
      )
        .filter(frame => frame instanceof ArduinoFrame)
        .forEach((currentFrame: ArduinoFrame) => frames.push(currentFrame));
    });

  if (sensorStatesForLoop[0] && frames[0]) {
    sensorStatesForLoop[0].forEach(sensorComponent => {
      frames[0].state.components.push(sensorComponent);
    });
  }

  const setupFrames = generateFrameForInputStatement(
    arduinoBlock,
    'setup',
    { location: 'setup', iteration: 0 },
    frames.length === 0 ? null : frames[frames.length - 1]
  ) as ArduinoFrame[];

  setupFrames.forEach(currentFrame => frames.push(currentFrame));

  for (let i = 0; i < numberOfTimesThroughLoop; i += 1) {
    const loopFrames = generateFrameForInputStatement(
      arduinoBlock,
      'loop',
      { location: 'loop', iteration: i },
      frames.length === 0 ? null : frames[frames.length - 1]
    ) as ArduinoFrame[];

    loopFrames.forEach(currentFrame => {
      sensorStatesForLoop[i].forEach(sensorComponent => {
        const componentIndex = currentFrame.state.components.findIndex(
          component => {
            if (
              component instanceof ButtonState &&
              sensorComponent instanceof ButtonState
            ) {
              return component.pin === sensorComponent.pin;
            }

            return (
              component.electricComponentType ===
              sensorComponent.electricComponentType
            );
          }
        );

        if (
          currentFrame.state.components[componentIndex] instanceof
            BluetoothState &&
          (currentFrame.state.components[componentIndex] as BluetoothState).sendMessage.length > 0
        ) {
          // DON'T SET BLUETOOTH SEND MESSAGE 
          // SET BY BLOCK FRAME GENERATOR
          return;
        }
          currentFrame.state.components[componentIndex] = sensorComponent;
      });
      frames.push(currentFrame);
    });
  }

  console.log(frames, 'frames');

  const duplicatePinsFounds = getDuplicatePins(frames);

  if (duplicatePinsFounds.length > 0) {
    return duplicatePinsFounds;
  }

  return frames;
};

const getDuplicatePins = (frames: ArduinoFrame[]): ARDUINO_UNO_PINS[] => {
  if (frames.length === 0) {
    return [];
  }

  const lastFrame = frames[frames.length - 1];

  const listOfPins = lastFrame.state.components
    .map(component => component.pins)
    .reduce((pins, val) => pins.concat(val), [])
    .sort();
  console.log(listOfPins, 'list of pins');
  const pinCount = _.countBy(listOfPins);
  const duplicatePins = [];
  for (const pin in pinCount) {
    if (pinCount[pin] > 1) {
      duplicatePins.push(pin);
    }
  }
  console.log(duplicatePins);
  return duplicatePins;
};

const hasDuplicateBlocks = (blocks: Block[]) => {
  const blockCountObject = _.countBy(blocks.map(block => block.type));
  for (const blockType in blockCountObject) {
    if (
      blockCountObject[blockType] > 1 &&
      !blockMultipleSetup.includes(blockType)
    ) {
      return true;
    }
  }

  return false;
};

export const getSensorData = (): {
  [key: number]: ElectricAttachmentComponentState[];
} => {
  const sensorStatesForLoop: {
    [key: number]: ElectricAttachmentComponentState[];
  } = {};

  const arduinoBlock = Blockly.mainWorkspace
    .getTopBlocks()
    .filter(function(block) {
      return block.type === 'arduino_start';
    })[0];

  const numberOfTimesThroughLoop = arduinoBlock.getFieldValue('LOOP_TIMES');

  for (let i = 0; i < numberOfTimesThroughLoop; i += 1) {
    sensorStatesForLoop[i] = [];
  }

  const topBlocks: Block[] = Blockly.mainWorkspace
    .getTopBlocks()
    .filter(
      block =>
        block.type !== 'arduino_start' &&
        (block as any).rendered &&
        block.isEnabled()
    );
  topBlocks
    .filter(block => block.isEnabled())
    .filter(block =>
      Object.keys(listOfStateHoldersBlocks).includes(block.type + '_block')
    )
    .forEach(block => {
      const mapData = listOfStateHoldersBlocks[block.type + '_block'];
      for (let i = 0; i < numberOfTimesThroughLoop; i += 1) {
        const component = mapData.convertToState(
          block,
          JSON.parse(block.data),
          i
        );
        sensorStatesForLoop[i].push(component);
      }
    });

  return sensorStatesForLoop;
};

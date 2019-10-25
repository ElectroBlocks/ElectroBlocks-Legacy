import { FrameOutput } from '../../player/frame/frame_output';
import { Block } from 'blockly';
import {
  mapFakeSensorValuesToBlocks,
  SensorBlockMapper
} from '../../player/frame/map_fake_sensor_values_to_blocks';
import * as _ from 'lodash';
import { SensorComponent } from '../../player/arduino/state/electric.state';
import { blocksInsideInput } from '../../player/frame/blockly_helper';
import { ButtonState } from '../../player/arduino/state/button.state';
import { BlocklyService } from '../../blockly.service';
import * as Blockly from 'blockly/core';
import { PinState } from '../../player/arduino/state/pin.state';

/**
 * Populates all the sensor blocks with fake readonly data.
 */
export const changeFramePopulateSensorBlock = (
  changeFrame: FrameOutput,
  arduinoStartBlock: Block
) => {
  const mapToSetupSensorBlocks = getListOfSensorBlockMappings();
  const allBlocks = Blockly.getMainWorkspace().getAllBlocks();

  BlocklyService.DISABLE_READONLY_CHECK = true;

  mapToSetupSensorBlocks.forEach(mapToSetupSensorBlock => {
    const listOfBlockTypes = mapToSetupSensorBlock.fieldsToCollect.map(
      info => info.sensorBlockType
    );

    const sensorBlocksToSetFakeValues = getListOfSensorBlocksToSet(
      allBlocks,
      changeFrame,
      arduinoStartBlock,
      listOfBlockTypes
    );
    sensorBlocksToSetFakeValues.forEach(sensorBlockToSet =>
      setSensorBlockWithFakeValue(
        changeFrame,
        sensorBlockToSet,
        mapToSetupSensorBlock
      )
    );
  });

  BlocklyService.DISABLE_READONLY_CHECK = false;
};

/**
 * Gets a list of all the possible fake sensor blocks
 * Notice we exclude setting sensor blocks in the setup if the loop number is greater than 1.
 */
const getListOfSensorBlocksToSet = (
  allBlocks: Block[],
  changeFrame: FrameOutput,
  arduinoStartBlock: Block,
  listOfBlockTypes: string[]
) => {
  return allBlocks
    .filter(possibleBlock => listOfBlockTypes.includes(possibleBlock.type))
    .filter(possibleBlock => {
      return (
        changeFrame.frameLocation.iteration === 0 ||
        !isBlockInSetupArduinoFunction(possibleBlock, arduinoStartBlock)
      );
    });
};

/**
 * This will set get sensor data blocks with the fake readonly values
 */
const setSensorBlockWithFakeValue = (
  changeFrame: FrameOutput,
  sensorBlockToSet: Block,
  mapToSetupSensorBlock: SensorBlockMapper
) => {
  const blockMapInfo = mapToSetupSensorBlock.fieldsToCollect.find(
    info => info.sensorBlockType === sensorBlockToSet.type
  );

  const stateToSetFakeSensor = findSensorState(
    changeFrame,
    sensorBlockToSet,
    mapToSetupSensorBlock
  );
  console.log(sensorBlockToSet, 'lol');
  sensorBlockToSet
    .getField('SIMPLE_DEBUG')
    .setValue(stateToSetFakeSensor.getFieldValue(blockMapInfo.dataSaveKey));
};

/**
 * Gets a list of sensor setup block mapping
 */
const getListOfSensorBlockMappings = () => {
  const topBlocks: Block[] = Blockly.mainWorkspace
    .getTopBlocks()
    .filter(block => block.type !== 'arduino_start');
  const mapToSetupSensorBlocks = topBlocks
    .filter(block => block.isEnabled())
    .filter(block =>
      Object.keys(mapFakeSensorValuesToBlocks).includes(block.type + '_block')
    )
    .map(setupBlock => mapFakeSensorValuesToBlocks[setupBlock.type + '_block']);

  // We manually add time no matter what
  mapToSetupSensorBlocks.push(mapFakeSensorValuesToBlocks['time_setup_block']);

  return mapToSetupSensorBlocks;
};

/**
 * This is used to see if the sensor block is in the setup function
 * If so there are certain times we want to exclude it
 */
const isBlockInSetupArduinoFunction = (
  possibleBlock: Block,
  arduinoStartBlock: Block
) => {
  const setupBlocksIdsParentIds = (blocksInsideInput(
    arduinoStartBlock,
    'setup'
  ) as Block[]).map(b => b.id);

  let statementParent = possibleBlock.getParent();
  while (statementParent) {
    if (
      statementParent.getParent() &&
      statementParent.getParent().type === 'arduino_start'
    ) {
      break;
    }
    statementParent = statementParent.getParent();
  }

  return setupBlocksIdsParentIds.includes(statementParent.id);
};

const findSensorState = (
  changeFrame: FrameOutput,
  sensorBlockToSet: Block,
  mapToSetupSensorBlock: SensorBlockMapper
) => {
  return changeFrame.state.components.find(c => {
    if (c instanceof ButtonState) {
      return c.pin === sensorBlockToSet.getFieldValue('PIN');
    }

    if (c instanceof PinState) {
      return c.pin === sensorBlockToSet.getFieldValue('PIN');
    }

    return (
      c instanceof SensorComponent && mapToSetupSensorBlock.type === c.type
    );
  }) as SensorComponent;
};

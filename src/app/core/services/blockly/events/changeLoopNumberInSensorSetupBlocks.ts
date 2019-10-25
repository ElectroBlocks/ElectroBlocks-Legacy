import * as Blockly from 'blockly';
import { sensorSetupBlocks } from './enableDisableBlocks';

export const changeLoopNumberInSensorBlocks = (
  workspace: Blockly.Workspace,
  event: Object
) => {
  if (
    event['element'] !== 'field' ||
    event['name'] !== 'LOOP_TIMES' ||
    event['blockId'] === null
  ) {
    return;
  }

  const arduinoStart = Blockly.getMainWorkspace().getBlockById(
    event['blockId']
  );

  if (arduinoStart.type !== 'arduino_start') {
    return;
  }

  const loopTimes = +arduinoStart.getFieldValue('LOOP_TIMES');

  Blockly.getMainWorkspace()
    .getTopBlocks(true)
    .filter(block => sensorSetupBlocks.includes(block.type))
    .forEach(setupBlock => {
      if (+setupBlock.getFieldValue('LOOP') > loopTimes) {
        setupBlock.getField('LOOP').setValue(loopTimes.toString());
      }
    });
};

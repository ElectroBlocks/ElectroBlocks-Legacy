import {
  listOfStateHoldersBlocks,
  FakeInputMap
} from '../../player/frame/state_holder';
import * as _ from 'lodash';
import { Block } from 'blockly';

export const saveDebugBlockState = (workspace, numberOfLoops) => {
  const setupBlocks = workspace
    .getAllBlocks(true)
    .filter(block =>
      Object.keys(listOfStateHoldersBlocks).includes(block.type + '_block')
    );

  setupBlocks.forEach(block => {
    const currentData = block.data ? JSON.parse(block.data) : [];
    const setupBlockMatch = listOfStateHoldersBlocks[block.type + '_block'];
    if (currentData.length === 0) {
      setInitialData(block, setupBlockMatch.fieldsToCollect, numberOfLoops);
      return;
    }

    if (numberOfLoops > currentData.length) {
      for (let i = currentData.length; i <= numberOfLoops; i += 1) {
        const dataToCopy = _.cloneDeep(currentData[currentData.length - 1]);
        currentData.push(dataToCopy);
      }
    }

    const loopNumber = parseInt(block.getFieldValue('LOOP'), 0);

    currentData[loopNumber - 1] = collectDataFromSetupBlock(
      block,
      setupBlockMatch.fieldsToCollect
    );
    block.data = JSON.stringify(currentData);
  });
};

const setInitialData = (
  block: Block,
  input: FakeInputMap[],
  numberOfLoops: number
) => {
  const data = [];
  for (let i = 0; i < numberOfLoops; i += 1) {
    data.push(collectDataFromSetupBlock(block, input));
  }
  console.log(data);
  block.data = JSON.stringify(data);
};

const collectDataFromSetupBlock = (block: Block, input: FakeInputMap[]) => {
  const loopDataToSave = {};
  input.forEach(field => {
    loopDataToSave[field.dataSaveKey] = getFieldValueFromSetup(
      block,
      field.type,
      field.setupBlockFieldName
    );
  });

  console.log(loopDataToSave, 'loopDataToSave');
  return loopDataToSave;
};

const getFieldValueFromSetup = (
  block: Block,
  type: string,
  fieldName: string
) => {
  if (type === 'field_checkbox') {
    return block.getField(fieldName).getValue() !== 'FALSE';
  }

  if (type === 'field_input') {
    return block.getFieldValue(fieldName);
  }

  return null;
};

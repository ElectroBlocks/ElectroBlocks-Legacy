import { listOfStateHoldersBlocks } from '../../player/frame/state_holder';

export const changeSetupBlockValueBecauseOfLoopChange = (
  workspace,
  event: Object
) => {
  if (
    event['element'] !== 'field' ||
    event['name'] !== 'LOOP' ||
    event['blockId'] === undefined ||
    event['newValue'] === undefined
  ) {
    return;
  }

  const block = workspace.getBlockById(event['blockId']);
  const loopNumber = parseInt(event['newValue'], 0);
  if (!Object.keys(listOfStateHoldersBlocks).includes(block.type + '_block')) {
    return;
  }

  const mapInfo = listOfStateHoldersBlocks[block.type + '_block'];
  const dataInBlockSaved = JSON.parse(block.data);
  const newValues = dataInBlockSaved[loopNumber - 1];
  mapInfo.fieldsToCollect.forEach(info => {
    block
      .getField(info.setupBlockFieldName)
      .setValue(newValues[info.dataSaveKey]);
  });
};

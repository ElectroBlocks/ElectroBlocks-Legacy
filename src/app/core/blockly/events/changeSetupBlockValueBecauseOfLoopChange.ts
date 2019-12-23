import { mapFakeSensorValuesToBlocks } from '../../player/frame/map_fake_sensor_values_to_blocks';

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
  if (!Object.keys(mapFakeSensorValuesToBlocks).includes(block.type + '_block')) {
    return;
  }

  const mapInfo = mapFakeSensorValuesToBlocks[block.type + '_block'];
  const dataInBlockSaved = JSON.parse(block.data);
  const newValues = dataInBlockSaved[loopNumber - 1];
  mapInfo.fieldsToCollect.forEach(info => {
    block
      .getField(info.setupBlockFieldName)
      .setValue(newValues[info.dataSaveKey]);
  });
};

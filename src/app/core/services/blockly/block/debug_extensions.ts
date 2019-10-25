import { BlocklyService } from '../../blockly.service';
import * as Blockly from 'blockly/core';
import { selectedBoard } from '../types/pins';

export const loopTimes = () => {
  const arduinoStartBlock = Blockly.getMainWorkspace()
    .getAllBlocks()
    .find(block => block.type === 'arduino_start');

  const numberOfTimesThroughTheLoop = arduinoStartBlock
    ? parseInt(arduinoStartBlock.getFieldValue('LOOP_TIMES'), 0)
    : 3;

  const options = [];
  for (let i = 1; i <= numberOfTimesThroughTheLoop; i += 1) {
    options.push([i.toString(), i.toString()]);
  }
  return options;
};

Blockly.Extensions.register('debug', function() {
  this.getField('SIMPLE_DEBUG').setValidator(value => {
    if (BlocklyService.DISABLE_READONLY_CHECK) {
      return value;
    }

    return null;
  });
});

Blockly.Extensions.register('debug-setup', function() {
  const loopField = new Blockly.FieldDropdown(function() {
    return loopTimes();
  });

  this.getInput('LOOP_INPUT').appendField(loopField, 'LOOP');
});

export const getAvialablePinsFromSetupBlock = (setupBlockType: string) => {
  const pins = Blockly.getMainWorkspace()
    .getAllBlocks()
    .filter(block => block.type === setupBlockType)
    .map(block => [block.getFieldValue('PIN'), block.getFieldValue('PIN')]);

  if (pins.length === 0) {
    return selectedBoard().digitalPins;
  }

  return pins;
};

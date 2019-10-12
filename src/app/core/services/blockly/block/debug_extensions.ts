import { BlocklyService } from '../../blockly.service';
import * as Blockly from 'blockly/core';



Blockly.Extensions.register('debug', function() {
  this.getField('SIMPLE_DEBUG').setValidator(value => {
    if (BlocklyService.DISABLE_READONLY_CHECK) {
      return value;
    }

    return null;
  });
});

Blockly.Extensions.register('debug-setup', function() {
  console.log('test called');

  const loopField = new Blockly.FieldDropdown(function() {
    const arduinoStartBlock = Blockly.getMainWorkspace()
      .getAllBlocks()
      .find(block => block.type === 'arduino_start');

    const loopTimes = arduinoStartBlock ?  parseInt(
      arduinoStartBlock.getFieldValue('LOOP_TIMES'),
      0
    ) : 3;

    const options = [];
    for (let i = 1; i <= loopTimes; i += 1) {
      options.push([i.toString(), i.toString()]);
    }
    return options;
  });

  this.getInput('LOOP_INPUT').appendField(loopField, 'LOOP');

});

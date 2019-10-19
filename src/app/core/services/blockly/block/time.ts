import { defineBlocksWithJsonArray } from 'blockly';
import * as Blockly from 'blockly/core';
import { loopTimes } from './debug_extensions';

defineBlocksWithJsonArray([
  {
    type: 'time_seconds',
    message0: '%1 seconds arduino been on.',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/time/time.png',
        width: 15,
        height: 15,
        alt: '*',
        flipRtl: false
      }
    ],
    output: 'Number',
    colour: 310,
    tooltip: '',
    helpUrl: ''
  },
  {
    type: 'delay_block',
    message0: '%1 wait for  %2 seconds',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/time/time.png',
        width: 15,
        height: 15,
        alt: '*',
        flipRtl: false
      },
      {
        type: 'input_value',
        name: 'DELAY',
        check: 'Number'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 310,
    tooltip: '',
    helpUrl: ''
  }
]);

Blockly.Blocks['time_setup'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(
        new Blockly.FieldImage('./assets/blocks/time/time.png', 15, 15, {
          alt: '*',
          flipRtl: 'FALSE'
        })
      )
      .appendField('Fake Arduino Time');

    this.appendDummyInput('SHOW_CODE_VIEW').appendField(
      '-----------------------------------------'
    );
    this.appendDummyInput()
      .appendField('LOOP')
      .appendField(
        new Blockly.FieldDropdown(() => {
          return loopTimes();
        }),
        'LOOP'
      );

    this.appendDummyInput()
      .appendField('Time In Seconds')
      .appendField(
        new Blockly.FieldTextInput('1'),
        'time_in_seconds'
      );

    this.setColour(310);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

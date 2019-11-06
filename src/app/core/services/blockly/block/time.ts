import { defineBlocksWithJsonArray } from 'blockly';
import * as Blockly from 'blockly/core';
import { loopTimes } from './debug_extensions';
import { COLOR_THEME } from './color_theme';

defineBlocksWithJsonArray([
  {
    type: 'time_seconds',
    message0: '%1 seconds arduino been on?%2 has been on for %3 seconds.',
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
        type: 'input_dummy'
      },
      {
        type: 'field_input',
        name: 'SIMPLE_DEBUG',
        text: ''
      }
    ],
    output: 'Number',
    colour: COLOR_THEME.ARDUINO,
    tooltip: '',
    helpUrl: '',
    extensions: ['debug']
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
    colour: COLOR_THEME.ARDUINO,
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
      .appendField('Setup Time');

    this.appendDummyInput()
      .appendField('How many seconds per loop')
      .appendField(
        new Blockly.FieldNumber(0.1, 0, 100000, 0.00001),
        'time_in_seconds'
      );

    this.setColour(COLOR_THEME.ARDUINO);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

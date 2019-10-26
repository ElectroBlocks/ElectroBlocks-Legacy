import { defineBlocksWithJsonArray } from 'blockly';
import { selectedBoard } from '../types/pins';
import * as Blockly from 'blockly/core';
import { loopTimes } from './debug_extensions';

defineBlocksWithJsonArray([
  {
    type: 'ir_remote_has_code_receive',
    message0: '%1 is receiving a code? %2 Is receiving message? (readonly) %3',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/ir_remote/ir_remote.png',
        width: 15,
        height: 15,
        alt: '*',
        flipRtl: false
      },
      {
        type: 'input_dummy'
      },
      {
        type: 'field_checkbox',
        name: 'SIMPLE_DEBUG',
        checked: false
      }
    ],
    output: 'Boolean',
    colour: 210,
    tooltip: '',
    helpUrl: '',
    extensions: ['debug']
  },
  {
    type: 'ir_remote_get_code',
    message0: '%1 get ir remote code. %2 message (readonly) %3',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/ir_remote/ir_remote.png',
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
    output: 'String',
    colour: 210,
    tooltip: '',
    helpUrl: '',
    extensions: ['debug']
  }
]);

Blockly.Blocks['ir_remote_setup'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(
        new Blockly.FieldImage(
          './assets/blocks/ir_remote/ir_remote.png',
          15,
          15,
          { alt: '*', flipRtl: 'FALSE' }
        )
      )
      .appendField('Setup IR Remote');
    this.appendDummyInput()
      .appendField('Analog Pin# ')
      .appendField(
        new Blockly.FieldDropdown(selectedBoard().analogPins),
        'PIN'
      );
    this.appendDummyInput('SHOW_CODE_VIEW').appendField(
      '-----------------------------'
    );
    this.appendDummyInput()
      .appendField('Loop')
      .appendField(
        new Blockly.FieldDropdown(() => {
          return loopTimes();
        }),
        'LOOP'
      );
    this.appendDummyInput()
      .appendField('Scan New Code? ')
      .appendField(
        new Blockly.FieldCheckbox('TRUE', (value) => {
          if ('FALSE' === value) {
            this.getField('code').setValue('');
          }
          return value;
        }),
        'scanned_new_code'
      );
    this.appendDummyInput()
      .appendField('Code')
      .appendField(
        new Blockly.FieldTextInput('E932B', (value) => {
          if (this.getFieldValue('scanned_new_code') === 'FALSE') {
            return null;
          }
          return value;
        }),
        'code'
      );
    this.setColour(210);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

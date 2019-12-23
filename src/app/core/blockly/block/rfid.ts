import { defineBlocksWithJsonArray } from 'blockly';
import './debug_extensions';
import * as Blockly from 'blockly/core';
import { selectedBoard } from '../types/pins';
import { loopTimes } from './debug_extensions';
import { COLOR_THEME } from './color_theme';

defineBlocksWithJsonArray([
  {
    type: 'rfid_scan',
    message0: '%1 Did RFID read scan a new card? %2 new card? (readonly) %3',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/rfid/rfid.png',
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
    inputsInline: false,
    output: 'Boolean',
    colour: COLOR_THEME.SENSOR,
    tooltip: '',
    helpUrl: '',
    extensions: ['debug']
  },
  {
    type: 'rfid_card',
    lastDummyAlign0: 'RIGHT',
    metadata: 'blue',
    message0: '%1 Get RFID Card Number %2 RFID Card# (readonly) = %3',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/rfid/rfid.png',
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
        text: `ex_card_num`
      }
    ],
    inputsInline: false,
    output: 'String',
    colour: COLOR_THEME.SENSOR,
    tooltip: '',
    helpUrl: '',
    extensions: ['debug']
  },
  {
    type: 'rfid_tag',
    lastDummyAlign0: 'RIGHT',
    metadata: 'blue',
    message0: '%1 Get RFID Tag %2 RFID Tag # (readonly) = %3',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/rfid/rfid.png',
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
        text: `ex_tag_num`
      }
    ],
    inputsInline: false,
    output: 'String',
    colour: COLOR_THEME.SENSOR,
    tooltip: '',
    helpUrl: ''
  }
]);

Blockly.Blocks['rfid_setup'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(
        new Blockly.FieldImage('./assets/blocks/rfid/rfid.png', 15, 15, {
          alt: '*',
          flipRtl: 'FALSE'
        })
      )
      .appendField('RFID Setup');
    this.appendDummyInput()
      .appendField('RX Pin#')
      .appendField(new Blockly.FieldDropdown(selectedBoard().digitalPins), 'RX')
      .appendField('TX Pin#')
      .appendField(
        new Blockly.FieldDropdown(selectedBoard().digitalPins),
        'TX'
      );
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
      .appendField('Scanned Card?')
      .appendField(
        new Blockly.FieldCheckbox('TRUE', value => {
          if ('FALSE' === value) {
            this.getField('card_number').setValue('');
            this.getField('tag').setValue('');
          }
          return value;
        }),
        'scanned_card'
      );
    this.appendDummyInput()
      .appendField('Card #:')
      .appendField(
        new Blockly.FieldTextInput('card_number', value => {
          if (this.getFieldValue('scanned_card') === 'FALSE') {
            return null;
          }
          return value;
        }),
        'card_number'
      );
    this.appendDummyInput()
      .appendField('Tag#:')
      .appendField(
        new Blockly.FieldTextInput('tag', value => {
          if (this.getFieldValue('scanned_card') === 'FALSE') {
            return null;
          }
          return value;
        }),
        'tag'
      );
    this.setColour(COLOR_THEME.SENSOR);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

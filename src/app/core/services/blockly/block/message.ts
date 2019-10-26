import { defineBlocksWithJsonArray } from 'blockly';
import * as Blockly from 'blockly/core';
import { loopTimes } from './debug_extensions';

defineBlocksWithJsonArray([
  {
    type: 'arduino_receive_message',
    message0:
      '%1 Is Arduino receiving message? %2 Is receiving message? (readonly) %3',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/message/message.png',
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
    colour: 20,
    tooltip: '',
    helpUrl: '',
    extensions: ['debug']
  },
  {
    type: 'arduino_get_message',
    message0: '%1 arduino get message. %2 message (readonly) %3',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/message/message.png',
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
    colour: 20,
    tooltip: '',
    helpUrl: '',
    extensions: ['debug']
  },
  {
    type: 'arduino_send_message',
    message0: '%1 Arduino send message %2',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/message/message.png',
        width: 15,
        height: 15,
        alt: '*',
        flipRtl: false
      },
      {
        type: 'input_value',
        name: 'MESSAGE',
        check: 'String'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip: '',
    helpUrl: ''
  }
]);

Blockly.Blocks['message_setup'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(
        new Blockly.FieldImage('./assets/blocks/message/message.png', 15, 15, {
          alt: '*',
          flipRtl: 'FALSE'
        })
      )
      .appendField('Message Setup');

    this.appendDummyInput('SHOW_CODE_VIEW').appendField(
      '-----------------------------------------'
    );
    this.appendDummyInput()
      .appendField('Loop')
      .appendField(new Blockly.FieldDropdown(() => loopTimes()), 'LOOP');
    this.appendDummyInput()
      .appendField('Receiving Message? ')
      .appendField(
        new Blockly.FieldCheckbox('TRUE', (value) => {
          if ('FALSE' === value) {
            this.getField('message').setValue('');
          }
          return value;
        }),
        'receiving_message'
      );
    this.appendDummyInput()
      .appendField('Message:')
      .appendField(
        new Blockly.FieldTextInput('message', (value) => {
          if (this.getFieldValue('receiving_message') === 'FALSE') {
            return null;
          }
          return value;
        }),
        'message'
      );
    this.setColour(20);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

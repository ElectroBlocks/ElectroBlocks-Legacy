import { defineBlocksWithJsonArray } from 'blockly';
import { selectedBoard } from '../types/pins';
import * as Blockly from 'blockly/core';
import { loopTimes } from './debug_extensions';

defineBlocksWithJsonArray([
  {
    type: 'bluetooth_get_message',
    message0: '%1 bluetooth get message',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/bluetooth/bluetooth.png',
        width: 15,
        height: 15,
        alt: '*',
        flipRtl: false
      }
    ],
    inputsInline: true,
    output: 'String',
    colour: 290,
    tooltip: '',
    helpUrl: ''
  },
  {
    type: 'bluetooth_has_message',
    message0: '%1 bluetooth receiving message?',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/bluetooth/bluetooth.png',
        width: 15,
        height: 15,
        alt: '*',
        flipRtl: false
      }
    ],
    output: 'Boolean',
    colour: 290,
    tooltip: '',
    helpUrl: ''
  },
  {
    type: 'bluetooth_send_message',
    message0: '%1 bluetooth send message. %2',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/bluetooth/bluetooth.png',
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
    colour: 290,
    tooltip: '',
    helpUrl: ''
  }
]);

Blockly.Blocks['bluetooth_setup'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("./assets/blocks/bluetooth/bluetooth.png", 15, 15, { alt: "*", flipRtl: "FALSE" }))
        .appendField("Bluetooth Setup");
    this.appendDummyInput()
        .appendField("RX Pin# ")
        .appendField(new Blockly.FieldDropdown(selectedBoard().digitalPins), "RX")
        .appendField("TX Pin#")
        .appendField(new Blockly.FieldDropdown(selectedBoard().digitalPins), "TX");
    this.appendDummyInput("SHOW_CODE_VIEW")
        .appendField("-----------------------------------------");
    this.appendDummyInput()
        .appendField("Loop")
        .appendField(new Blockly.FieldDropdown(() => loopTimes()), "LOOP");
    this.appendDummyInput()
        .appendField("Receiving Message? ")
        .appendField(new Blockly.FieldCheckbox("TRUE", value => {
          if ("FALSE" === value) {
            this.getField('message').setValue('');
          }
          return value;
        }), "receiving_message");
    this.appendDummyInput()
        .appendField("Message:")
        .appendField(new Blockly.FieldTextInput("message",           value => {
          if (this.getFieldValue('receiving_message') === 'FALSE') {
             return null;
          }
          return value;
        }), "message");
    this.setColour(290);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
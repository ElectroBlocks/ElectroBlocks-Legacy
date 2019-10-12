import { defineBlocksWithJsonArray } from 'blockly';
import { selectedBoard } from '../types/pins';

defineBlocksWithJsonArray([
  {
    type: 'bluetooth_setup',
    message0: '%1 Bluetooth Setup %2 RX Pin# %3 TX Pin# %4',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/bluetooth/bluetooth.png',
        width: 15,
        height: 20,
        alt: '*',
        flipRtl: false
      },
      {
        type: 'input_dummy'
      },
      {
        type: 'field_dropdown',
        name: 'RX',
        options: selectedBoard().digitalPins
      },
      {
        type: 'field_dropdown',
        name: 'TX',
        options: selectedBoard().digitalPins
      }
    ],
    colour: 290,
    tooltip: '',
    helpUrl: ''
  },
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

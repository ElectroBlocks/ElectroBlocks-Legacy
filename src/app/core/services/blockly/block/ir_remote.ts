import { defineBlocksWithJsonArray } from 'blockly';
import { selectedBoard } from '../types/pins';

defineBlocksWithJsonArray([
  {
    type: 'ir_remote_setup',
    message0: '%1 Setup IR Remote %2 Analog Pin#  %3',
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
        type: 'field_dropdown',
        name: 'PIN',
        options: selectedBoard().analogPins
      }
    ],
    colour: 210,
    tooltip: '',
    helpUrl: ''
  },
  {
    type: 'ir_remote_has_code_receive',
    message0: '%1 is receiving a code?',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/ir_remote/ir_remote.png',
        width: 15,
        height: 15,
        alt: '*',
        flipRtl: false
      }
    ],
    output: 'Boolean',
    colour: 210,
    tooltip: '',
    helpUrl: ''
  },
  {
    type: 'ir_remote_get_code',
    message0: '%1 get ir remote code.',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/ir_remote/ir_remote.png',
        width: 15,
        height: 15,
        alt: '*',
        flipRtl: false
      }
    ],
    output: 'String',
    colour: 210,
    tooltip: '',
    helpUrl: ''
  },
  {
    type: 'ir_remote_scan_again',
    message0: '%1 Rescan for new code',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/ir_remote/ir_remote.png',
        width: 15,
        height: 15,
        alt: '*',
        flipRtl: false
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 210,
    tooltip: '',
    helpUrl: ''
  }
]);

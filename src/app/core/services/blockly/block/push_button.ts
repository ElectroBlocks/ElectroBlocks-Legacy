import { defineBlocksWithJsonArray } from 'blockly';
import { selectedBoard } from '../types/pins';

defineBlocksWithJsonArray([
  {
    type: 'is_button_pressed',
    message0: '%1 Is button connected to PIN# %2  pressed?',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/push_button/push_button.png',
        width: 15,
        height: 15,
        alt: '*',
        flipRtl: false
      },
      {
        type: 'field_dropdown',
        name: 'PIN',
        options: selectedBoard().digitalPins
      }
    ],
    output: 'Boolean',
    colour: 260,
    tooltip: '',
    helpUrl: ''
  }
]);

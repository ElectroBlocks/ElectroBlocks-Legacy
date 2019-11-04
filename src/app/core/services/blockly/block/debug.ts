import { defineBlocksWithJsonArray } from 'blockly';
import { COLOR_THEME } from './color_theme';

defineBlocksWithJsonArray([
  {
    type: 'debug_block',
    message0: 'Debug %1 %2',
    args0: [
      {
        type: 'input_dummy'
      },
      {
        type: 'field_image',
        src: './assets/blocks/debug/debug.png',
        width: 70,
        height: 50,
        alt: '*',
        flipRtl: false
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: COLOR_THEME.ARDUINO,
    tooltip: '',
    helpUrl: ''
  }
]);

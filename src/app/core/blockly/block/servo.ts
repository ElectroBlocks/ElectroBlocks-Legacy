import { defineBlocksWithJsonArray } from 'blockly';
import { selectedBoard } from '../types/pins';
import { COLOR_THEME } from './color_theme';

defineBlocksWithJsonArray([
  {
    type: 'rotate_servo',
    message0: '%1 Rotate Servo %2 Pin# %3 %4 Degrees %5',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/servo/servo.png',
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
        options: selectedBoard().digitalPins
      },
      {
        type: 'input_dummy',
        align: 'RIGHT'
      },
      {
        type: 'input_value',
        name: 'DEGREE',
        check: 'Number',
        align: 'RIGHT'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: COLOR_THEME.COMPONENTS,
    tooltip: '',
    helpUrl: ''
  }
]);

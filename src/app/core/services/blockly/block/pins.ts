import { defineBlocksWithJsonArray } from 'blockly';
import { selectedBoard } from '../types/pins';

defineBlocksWithJsonArray([
  {
    type: 'digital_write',
    message0: '%1 Turn  %2 pin# %3',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/arduino/digital_write.png',
        width: 15,
        height: 15,
        alt: '*',
        flipRtl: false
      },
      {
        type: 'field_dropdown',
        name: 'STATE',
        options: [['on', 'ON'], ['off', 'OFF']]
      },
      {
        type: 'field_dropdown',
        name: 'PIN',
        options: selectedBoard().digitalPins
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 260,
    tooltip: '',
    helpUrl: ''
  },
  {
    type: 'digital_read',
    message0:
      '%1 Is electricity runing through pin# %2?',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/arduino/digital_read.png',
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
    helpUrl: '',
  },
  {
    type: 'analog_read',
    message0: '%1 Read number from analog pin# %2',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/arduino/analog_read.png',
        width: 15,
        height: 15,
        alt: '*',
        flipRtl: false
      },
      {
        type: 'field_dropdown',
        name: 'PIN',
        options: selectedBoard().analogPins
      }
    ],
    output: 'Number',
    colour: 260,
    tooltip: '',
    helpUrl: ''
  },
  {
    type: 'analog_write',
    message0: '%1 Send analog wave to pin %2 %3 Wave Intensity %4',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/arduino/analog_write.png',
        width: 15,
        height: 20,
        alt: '*',
        flipRtl: false
      },
      {
        type: 'field_dropdown',
        name: 'PIN',
        options: selectedBoard().analogPins
      },
      {
        type: 'input_dummy'
      },
      {
        type: 'input_value',
        name: 'WRITE_VALUE',
        check: 'Number',
        align: 'RIGHT'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 260,
    tooltip: '',
    helpUrl: ''
  }
]);

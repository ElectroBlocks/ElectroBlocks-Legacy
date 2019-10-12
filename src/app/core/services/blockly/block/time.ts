import { defineBlocksWithJsonArray } from 'blockly';

defineBlocksWithJsonArray([
  {
    type: 'time_seconds',
    message0: '%1 seconds arduino been on.',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/time/time.png',
        width: 15,
        height: 15,
        alt: '*',
        flipRtl: false
      }
    ],
    output: 'Number',
    colour: 310,
    tooltip: '',
    helpUrl: ''
  },
  {
    type: 'delay_block',
    message0: '%1 wait for  %2 seconds',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/time/time.png',
        width: 15,
        height: 15,
        alt: '*',
        flipRtl: false
      },
      {
        type: 'input_value',
        name: 'DELAY',
        check: 'Number'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 310,
    tooltip: '',
    helpUrl: ''
  }
]);

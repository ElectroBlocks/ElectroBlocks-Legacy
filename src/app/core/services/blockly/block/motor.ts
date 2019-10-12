import { defineBlocksWithJsonArray } from 'blockly';

defineBlocksWithJsonArray([
  // BEGIN JSON EXTRACT
  {
    type: 'move_motor',
    message0: '%1 Move  motor %2 Which Motor %3 Direction %4 %5 Speed %6',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/motor/motor.png',
        width: 15,
        height: 15,
        alt: '*',
        flipRtl: false
      },
      {
        type: 'input_dummy'
      },
      {
        type: 'input_value',
        name: 'MOTOR',
        check: 'Number',
        align: 'RIGHT'
      },
      {
        type: 'field_dropdown',
        name: 'DIRECTION',
        options: [['Forward', 'FORWARD'], ['Backward', 'BACKWARD']]
      },
      {
        type: 'input_dummy',
        align: 'RIGHT'
      },
      {
        type: 'input_value',
        name: 'SPEED',
        check: 'Number',
        align: 'RIGHT'
      }
    ],
    inputsInline: false,
    previousStatement: null,
    nextStatement: null,
    colour: 190,
    tooltip: '',
    helpUrl: ''
  }
]);

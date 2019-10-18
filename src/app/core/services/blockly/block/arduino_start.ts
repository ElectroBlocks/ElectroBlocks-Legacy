import { defineBlocksWithJsonArray } from 'blockly';

defineBlocksWithJsonArray([
  {
    type: 'arduino_start',
    message0:
      'Setup (runs once) %1 %2 Loop (runs forever) %3 Loop (runs %4 times) %5 %6',
    args0: [
      {
        type: 'input_dummy'
      },
      {
        type: 'input_statement',
        name: 'setup'
      },
      {
        type: 'input_dummy'
      },
      {
        type: 'field_number',
        name: 'LOOP_TIMES',
        value: 3,
        min: 0,
        max: 1000
      },
      {
        type: 'input_dummy'
      },
      {
        type: 'input_statement',
        name: 'loop'
      }
    ],
    colour: 135,
    tooltip: '',
    helpUrl: ''
  }
]);

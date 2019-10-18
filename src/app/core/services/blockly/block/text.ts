import { defineBlocksWithJsonArray } from 'blockly';

defineBlocksWithJsonArray([
  // BEGIN JSON EXTRACT
  {
    type: 'number_to_string',
    message0: 'Decimal places displayed %1 %2 Number to String %3',
    args0: [
      {
        type: 'field_number',
        name: 'PRECISION',
        value: 2,
        min: 0,
        max: 5,
        precision: 1
      },
      {
        type: 'input_dummy'
      },
      {
        type: 'input_value',
        name: 'NUMBER',
        check: 'Number',
        align: 'RIGHT'
      }
    ],
    output: 'String',
    colour: '%{BKY_TEXTS_HUE}',
    tooltip: '',
    helpUrl: ''
  },
  {
    type: 'parse_string_block',
    message0:
      'Get Part Of Text Block %1 Value %2 Separating Character %3 %4 Position %5',
    args0: [
      {
        type: 'input_dummy'
      },
      {
        type: 'input_value',
        name: 'VALUE',
        check: 'String'
      },
      {
        type: 'field_dropdown',
        name: 'DELIMITER',
        options: [
          [',', ','],
          ['#', '#'],
          ['$', '$'],
          ['^', '^'],
          ['|', '|'],
          ['@', '@']
        ]
      },
      {
        type: 'input_dummy'
      },
      {
        type: 'input_value',
        name: 'POSITION',
        check: 'Number'
      }
    ],
    inputsInline: false,
    output: 'String',
    colour: '%{BKY_TEXTS_HUE}',
    tooltip: '',
    helpUrl: ''
  }
]); // END JSON EXTRACT (Do not delete this comment.)

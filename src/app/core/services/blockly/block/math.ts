import { defineBlocksWithJsonArray } from 'blockly';

defineBlocksWithJsonArray([
  {
    type: 'string_to_number',
    message0: 'Text to Number %1',
    args0: [
      {
        type: 'input_value',
        name: 'VALUE',
        check: 'String'
      }
    ],
    output: 'Number',
    colour: 230,
    tooltip: '',
    helpUrl: ''
  }
]);

import { defineBlocksWithJsonArray } from 'blockly';
import { COLOR_THEME } from './color_theme';

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
    colour: COLOR_THEME.VALUES,
    tooltip: '',
    helpUrl: ''
  }
]);

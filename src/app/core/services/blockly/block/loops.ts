import { defineBlocksWithJsonArray } from 'blockly';
import * as Blockly from 'blockly/core';
import { COLOR_THEME } from './color_theme';

defineBlocksWithJsonArray([
  {
    type: 'controls_for',
    message0: 'count with %1 from %2 to %3 by adding %4',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: null,
        variableTypes: ['Number'],
        defaultType: 'Number',
        createNewVariable: true,
        showOnlyVariableAssigned: false
      },
      {
        type: 'input_value',
        name: 'FROM',
        check: 'Number',
        align: 'RIGHT'
      },
      {
        type: 'input_value',
        name: 'TO',
        check: 'Number',
        align: 'RIGHT'
      },
      {
        type: 'input_value',
        name: 'BY',
        check: 'Number',
        align: 'RIGHT'
      }
    ],
    message1: '%{BKY_CONTROLS_REPEAT_INPUT_DO} %1',
    args1: [
      {
        type: 'input_statement',
        name: 'DO'
      }
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: COLOR_THEME.CONTROL,
    helpUrl: '%{BKY_CONTROLS_FOR_HELPURL}',
    extensions: ['contextMenu_newGetVariableBlock', 'controls_for_tooltip']
  }
]);

import { defineBlocksWithJsonArray } from 'blockly';
import Blockly from 'blockly/core';

defineBlocksWithJsonArray([
  // If/else block that does not use a mutator.
  {
    type: 'control_if',
    message0: '%{BKY_CONTROLS_IF_MSG_IF} %1',
    args0: [
      {
        type: 'input_value',
        name: 'IF0',
        check: 'Boolean'
      }
    ],
    message1: '%{BKY_CONTROLS_IF_MSG_THEN} %1',
    args1: [
      {
        type: 'input_statement',
        name: 'DO0'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '%{BKY_LOGIC_HUE}',
    tooltip: '%{BKYCONTROLS_IF_TOOLTIP_2}',
    helpUrl: '%{BKY_CONTROLS_IF_HELPURL}',
    extensions: ['controls_if_tooltip']
  },
  {
    type: 'controls_ifelse',
    message0: '%{BKY_CONTROLS_IF_MSG_IF} %1',
    args0: [
      {
        type: 'input_value',
        name: 'IF0',
        check: 'Boolean'
      }
    ],
    message1: '%{BKY_CONTROLS_IF_MSG_THEN} %1',
    args1: [
      {
        type: 'input_statement',
        name: 'DO0'
      }
    ],
    message2: '%{BKY_CONTROLS_IF_MSG_ELSE} %1',
    args2: [
      {
        type: 'input_statement',
        name: 'ELSE'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '%{BKY_LOGIC_HUE}',
    tooltip: '%{BKYCONTROLS_IF_TOOLTIP_2}',
    helpUrl: '%{BKY_CONTROLS_IF_HELPURL}',
    extensions: ['controls_if_tooltip']
  }
]);

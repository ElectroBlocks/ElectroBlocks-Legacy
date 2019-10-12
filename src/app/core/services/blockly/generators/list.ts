import * as Blockly from 'blockly/core';
import { Block } from 'blockly';

export const setZeroIndexAdjustFunc = () => {
  Blockly.Arduino.functionNames_['zeroIndexAdjustNumber'] =
    '\n\nint zeroIndexAdjustNumber(double pos) {\n' +
    '\tpos = pos <= 0 ? 0 : pos;\n' +
    '\treturn pos >= 1 ? pos - 1 : pos;\n' +
    '}\n';
};

var initListVariable = function(block: Block, type: string) {
  
  setZeroIndexAdjustFunc();

  var size = block.getFieldValue('SIZE');

  var variableId = block.getFieldValue('VAR');

  var variable = Blockly.mainWorkspace.getVariableById(variableId);

  Blockly.Arduino.variablesInitCode_ +=
    type + ' ' + variable.name + '[' + size + '];\n';

  return '';
};

var setListVariable = function(block: Block) {
  const position = Blockly.Arduino.valueToCode(
    block,
    'POSITION',
    Blockly.Arduino.ORDER_ATOMIC
  );

  var variableId = block.getFieldValue('VAR');

  var variable = Blockly.mainWorkspace.getVariableById(variableId);

  var value = Blockly.Arduino.valueToCode(
    block,
    'VALUE',
    Blockly.Arduino.ORDER_ATOMIC
  );

  return (
    variable.name +
    '[zeroIndexAdjustNumber(' +
    position +
    ')] = ' +
    value +
    ';\n'
  );
};

var getListVariable = function(block: Block) {
  var variableId = block.getFieldValue('VAR');

  var variable = Blockly.mainWorkspace.getVariableById(variableId);

  var position = Blockly.Arduino.valueToCode(
    block,
    'POSITION',
    Blockly.Arduino.ORDER_ATOMIC
  );

  return [
    variable.name + '[zeroIndexAdjustNumber(' + position + ')]',
    Blockly.Arduino.ORDER_ATOMIC
  ];
};

Blockly.Arduino['create_list_number_block'] = function(block: Block) {
  return initListVariable(block, 'double');
};

Blockly.Arduino['create_list_string_block'] = function(block: Block) {
  return initListVariable(block, 'String');
};

Blockly.Arduino['create_list_boolean_block'] = function(block: Block) {
  return initListVariable(block, 'boolean');
};

Blockly.Arduino['create_list_colour_block'] = function(block: Block) {
  return initListVariable(block, 'RGB');
};

Blockly.Arduino['set_string_list_block'] = setListVariable;
Blockly.Arduino['set_boolean_list_block'] = setListVariable;
Blockly.Arduino['set_number_list_block'] = setListVariable;
Blockly.Arduino['set_colour_list_block'] = setListVariable;

Blockly.Arduino['get_string_from_list'] = getListVariable;
Blockly.Arduino['get_boolean_from_list'] = getListVariable;
Blockly.Arduino['get_number_from_list'] = getListVariable;
Blockly.Arduino['get_colour_from_list'] = getListVariable;

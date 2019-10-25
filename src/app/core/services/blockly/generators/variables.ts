import * as Blockly from 'blockly/core';
import { Block } from 'blockly';

const setVariableFunction = function(defaultValue) {
  return function(block) {
    const variableName = Blockly.Arduino.variableDB_.getName(
      block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE
    );
    const variableValue = Blockly.Arduino.valueToCode(
      block,
      'VALUE',
      Blockly.Arduino.ORDER_ATOMIC
    );

    return variableName + ' = ' + (variableValue || defaultValue) + ';\n';
  };
};

const getVariableFunction = function(block) {
  const variableName = Blockly.Arduino.variableDB_.getName(
    block.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE
  );

  return [variableName, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['variables_set_number'] = setVariableFunction(10);
Blockly.Arduino['variables_set_boolean'] = setVariableFunction('true');
Blockly.Arduino['variables_set_string'] = setVariableFunction('" "');
Blockly.Arduino['variables_set_colour'] = setVariableFunction(`{ 22,  0,  22}`);

Blockly.Arduino['variables_get_number'] = getVariableFunction;
Blockly.Arduino['variables_get_boolean'] = getVariableFunction;
Blockly.Arduino['variables_get_string'] = getVariableFunction;
Blockly.Arduino['variables_get_colour'] = getVariableFunction;

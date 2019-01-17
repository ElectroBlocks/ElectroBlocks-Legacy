
'use strict';

goog.provide('Blockly.Arduino.variables');

goog.require('Blockly.Arduino');

var setVariableFunction = function (block) {
    var variableName = Blockly.Arduino.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var variableValue = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_ATOMIC);

    return variableName + ' = ' + variableValue + ';\n'
};

var getVariableFunction = function(block) {
    var variableName = Blockly.Arduino.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

    return [variableName, Blockly.Arduino.ORDER_ATOMIC];

};

Blockly.Arduino['variables_set_number'] = setVariableFunction;
Blockly.Arduino['variables_set_boolean'] = setVariableFunction;
Blockly.Arduino['variables_set_string'] = setVariableFunction;
Blockly.Arduino['variables_set_colour'] = setVariableFunction;


Blockly.Arduino['variables_get_number'] = getVariableFunction;
Blockly.Arduino['variables_get_boolean'] = getVariableFunction;
Blockly.Arduino['variables_get_string'] = getVariableFunction;
Blockly.Arduino['variables_get_colour'] = getVariableFunction;

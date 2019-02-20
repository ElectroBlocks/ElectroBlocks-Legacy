'use strict';

goog.provide('Blockly.Arduino.list');

goog.require('Blockly.Arduino');

var initListVariable = function(block, type) {

    var size = block.getFieldValue('SIZE');

    var variableId = block.getFieldValue('VAR');

    var variable = Blockly.mainWorkspace.getVariableById(variableId);

    Blockly.Arduino.variablesInitCode_ += type + ' ' + variable.name + '[' + size + '];\n';

    return '';
};

var setListVariable = function (block) {

    var position = Blockly.Arduino.valueToCode(
        block, 'POSITION', Blockly.Arduino.ORDER_ATOMIC
    );

    position = parseInt(position) > 0 ? position -1 : 0;

    var variableId = block.getFieldValue('VAR');

    var variable = Blockly.mainWorkspace.getVariableById(variableId);

    var value = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_ATOMIC);

    return variable.name + '[' + position + '] = ' + value + ';\n';

};

var getListVariable = function(block) {
    var variableId = block.getFieldValue('VAR');

    var variable = Blockly.mainWorkspace.getVariableById(variableId);

    var position = Blockly.Arduino.valueToCode(
        block, 'POSITION', Blockly.Arduino.ORDER_ATOMIC
    );

    position = parseInt(position) > 0 ? position -1 : 0;

    return [ variable.name + '[' + position + ']',  Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['create_list_number_block'] = function(block) {

    return initListVariable(block, 'double');
};

Blockly.Arduino['create_list_string_block'] = function(block) {

    return initListVariable(block, 'String');
};

Blockly.Arduino['create_list_boolean_block'] = function(block) {

    return initListVariable(block, 'boolean');
};

Blockly.Arduino['create_list_colour_block'] = function(block) {

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

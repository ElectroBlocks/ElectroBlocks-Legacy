goog.provide('Blockly.Arduino.list');

goog.require('Blockly.Arduino');


Blockly.Arduino.lists_setIndex = function () {
    var value = Blockly.Arduino.valueToCode(this, 'VALUE',  Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
    var varName = Blockly.Arduino.valueToCode(this, 'VARIABLE',  Blockly.Arduino.ORDER_ASSIGNMENT);
    var index = Blockly.Arduino.valueToCode(this, 'INDEX',  Blockly.Arduino.ORDER_ASSIGNMENT) || '0';

    return varName + '[' + index + '] = ' + value + '; \n';
};

Blockly.Arduino.lists_getIndex = function () {
    var varName = Blockly.Arduino.valueToCode(this, 'VARIABLE',  Blockly.Arduino.ORDER_ASSIGNMENT);
    var index = Blockly.Arduino.valueToCode(this, 'INDEX',  Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
    return [varName + '[' + index + ']', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.lists_length = function () {
    var varName = Blockly.Arduino.valueToCode(this, 'VALUE',  Blockly.Arduino.ORDER_ASSIGNMENT);
    return ['sizeof(' + varName + ')', Blockly.Arduino.ORDER_ATOMIC];
};
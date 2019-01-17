'use strict';

goog.provide('Blockly.Arduino.procedures');

goog.require('Blockly.Arduino');


Blockly.Arduino['procedures_defreturn'] = function(block) {
    // Define a procedure with a return value.
    var funcName = Blockly.Arduino.variableDB_.getName(
        block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
    var branch = Blockly.Arduino.statementToCode(block, 'STACK');
    var returnType = block.getFieldValue('RETURN TYPE') || 'void';


    var returnValue = Blockly.Arduino.valueToCode(block, 'RETURN',
            Blockly.Arduino.ORDER_NONE) || '';
    if (returnValue) {
        returnValue = Blockly.Arduino.INDENT + 'return ' + returnValue + ';\n';
    }
    var args = [];
    for (var i = 0; i < block.argumentVarModels_.length; i++) {
        args[i] =  translateType(block.argumentVarModels_[i].type) + ' ' + block.argumentVarModels_[i].name;
    }
    var code = translateType(returnType) + ' ' + funcName + '(' + args.join(', ') + ') {\n' +
        branch + returnValue + '}';
    code = Blockly.Arduino.scrub_(block, code);
    // Add % so as not to collide with helper functions in definitions list.
    Blockly.Arduino.functionNames_['%' + funcName] = code;
    return null;
};

function translateType(type) {
    switch (type) {
        case 'Number':
            return 'double';
        case 'String':
            return 'String';
        case 'Boolean':
            return 'boolean';
        case 'void':
            return 'void';
        default:
            throw new Error('Invalid Parameter Type');
    }

}

Blockly.Arduino['procedures_defnoreturn'] =
    Blockly.Arduino['procedures_defreturn'];

Blockly.Arduino['procedures_callreturn'] = function(block) {
    // Call a procedure with a return value.
    var funcName = Blockly.Arduino.variableDB_.getName(
        block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
    var args = [];
    for (var i = 0; i < block.arguments_.length; i++) {
        args[i] = Blockly.Arduino.valueToCode(block, 'ARG' + i,
                Blockly.Arduino.ORDER_COMMA) || 'null';
    }
    var code = funcName + '(' + args.join(', ') + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['procedures_callnoreturn'] = function(block) {
    // Call a procedure with no return value.
    var funcName = Blockly.Arduino.variableDB_.getName(
        block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
    var args = [];
    for (var i = 0; i < block.arguments_.length; i++) {
        args[i] = Blockly.Arduino.valueToCode(block, 'ARG' + i,
                Blockly.Arduino.ORDER_COMMA) || 'null';
    }

    return funcName + '(' + args.join(', ') + ');\n';

};

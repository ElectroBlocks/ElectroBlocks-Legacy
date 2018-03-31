'use strict';

goog.provide('Blockly.Arduino.debug');

goog.require('Blockly.Arduino');


Blockly.Arduino['debug'] = function(block) {

    Blockly.Arduino._serial_setup();

    var debugFunction  = '\n\nvoid debug(int blockNumber) { \n' +
                       '\t\tString stopDebug = ""; \n';


    debugFunction += createDebugVariable();

    debugFunction += '\t\tSerial.println("Debugging Block " + String(blockNumber) + " ");\n\n';

    debugFunction += '\t\twhile (stopDebug != "s") { \n'  +
                 '\t\t\tstopDebug = Serial.readStringUntil("s"); \n' +
                 '\t\t\tdelay(1000);  \n' +
             '\t\t}\n' ;

    debugFunction += '}\n';

    Blockly.Arduino.definitions_['debug_function'] = debugFunction;

    return 'debug(' + block.id + '); \n';
};

function createDebugVariable() {

    var blocks = Blockly.mainWorkspace.getAllBlocks();
    var debugString = '';
    var variableNames = [];
    var variableName = '';

    for (var i = 0; i < blocks.length; i += 1) {
        if (blocks[i].type === 'variables_create' || blocks[i].type === 'variables_create_global') {
             variableName = Blockly.Arduino.variableDB_.getName(blocks[i].getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
            debugString += '\t\tSerial.println("**(|)' + variableName + '_|_' + blocks[i].getFieldValue('DATA TYPE').toLowerCase() + '_|_" + String(' + variableName + ')); \n';

            variableNames.push(variableName);
        }

        if (blocks[i].type === 'variables_create_array') {
            variableName = Blockly.Arduino.variableDB_.getName(blocks[i].getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
            var size = Blockly.Arduino.valueToCode(blocks[i], 'SIZE',  Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
            debugString += '\t\tSerial.println("**(|)' + variableName + '_|_'
                +  'An Array of ' + blocks[i].getFieldValue('DATA TYPE').toLowerCase() + 's size => ' + size + '_|_" + String(' + variableName + ')); \n';
            variableNames.push(variableName);
        }
    }

    var allVariables = Blockly.Variables.allVariables(Blockly.mainWorkspace);

    for (i = 0; i < allVariables.length; i += 1) {
        var variableNameToTest = Blockly.Arduino.variableDB_.getName(allVariables[i], Blockly.Variables.NAME_TYPE);
        if (variableNames.indexOf(variableNameToTest) === -1) {
            debugString += '\t\tSerial.println("**(|)' + allVariables[i] + '_|_int_|_" + String(' + allVariables[i] + ')); \n';
        }
    }

    return debugString;
}
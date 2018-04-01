'use strict';

goog.provide('Blockly.Arduino.debug');

goog.require('Blockly.Arduino');

var VARIABLE_TYPES_TO_ARRAY = ['int', 'long', 'double', 'byte', 'String', 'bool'];

Blockly.Arduino['debug'] = function(block) {

    Blockly.Arduino._serial_setup();

    Blockly.Arduino.definitions_['double_to_string_debug'] = createDoubleToStringCFunc();

    for (var i = 0; i < VARIABLE_TYPES.length; i += 1) {
        Blockly.Arduino.definitions_['print_array_' + VARIABLE_TYPES_TO_ARRAY[i]] = createPrintArrayFuncInC(VARIABLE_TYPES_TO_ARRAY[i]) + '\n\n';
    }

    var debugFunction  = '\n\nvoid debug(int blockNumber) { \n' +
                       '\t\tString stopDebug = ""; \n';


    debugFunction += createDebugVariable();

    debugFunction += '\t\tSerial.println("DEBUG_BLOCK_" + String(blockNumber) + " ");\n\n';

    debugFunction += '\t\twhile (stopDebug != "s") { \n'  +
                 '\t\t\tstopDebug = Serial.readStringUntil(\'|\'); \n' +
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
             var dataType = blocks[i].getFieldValue('DATA TYPE').toLowerCase();
            debugString +=
                '\t\tSerial.println("**(|)' + variableName + '_|_' + dataType + '_|_" +';
            if (dataType == 'double') {
                debugString += 'double2string(' + variableName + ', 5));\n';
            } else {
                debugString += 'String(' + variableName + ')); \n';
            }

            variableNames.push(variableName);
        }

        if (blocks[i].type === 'variables_create_array') {
            variableName = Blockly.Arduino.variableDB_.getName(blocks[i].getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
            var size = Blockly.Arduino.valueToCode(blocks[i], 'SIZE',  Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
            debugString += '\t\tSerial.println("**(|)' + variableName + '_|_'
                +  'An Array of ' + blocks[i].getFieldValue('DATA TYPE').toLowerCase() + 's size => '
                + size + '_|_" +' + 'printArray'  + blocks[i].getFieldValue('DATA TYPE') + '(' + variableName + ')); \n';
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

function createPrintArrayFuncInC(type)
{
    var func ='String printArrayREPLATEWITHTYPE(REPLATEWITHTYPE arr[]) {' +
    '\t\tString returnValue = "";' +
    '\t\tfor (unsigned int i = 0; i < sizeof(arr); i += 1) {\n';
            if (type.toLowerCase() == 'double') {
                func += '\t\treturnValue +=  double2string(arr[i], 5);\n';
            }
            else if (type.toLowerCase() == 'bool') {
                func += '\t\treturnValue += arr[i] ? "TRUE" : "False"; \n'
            }
            else {
              func += '\t\treturnValue +=  String(arr[i]);\n';
            }

      func +=  '\t\tif (i < sizeof(arr) -1) {\n' +
           '\t\treturnValue += ", ";\n' +
        '\t\t}\n' +
    '\t\t}\n' +
    '\t\treturn returnValue;\n' +
    '\t}\n';

    return func.replace(/REPLATEWITHTYPE/g, type);
}

function createDoubleToStringCFunc() {
    return ' String double2string(double n, int ndec) {                         \n' +
           '\t\t String r = "";                                                 \n' +
           '\t\t int v = n;                                                     \n' +
           '\t\t r += v;     // whole number part                               \n' +
           '\t\t r += \'.\';   // decimal point                                   \n' +
           '\t\t int i;                                                         \n' +
           '\t\t for (i = 0; i < ndec; i++) {                                   \n' +
           '\t\t     // iterate through each decimal digit for 0..ndec          \n' +
           '\t\t     n -= v;                                                    \n' +
           '\t\t     n *= 10;                                                   \n' +
           '\t\t     v = n;                                                     \n' +
           '\t\t     r += v;                                                    \n' +
           '\t\t }                                                              \n' +
           '\t\t                                                                \n' +
           '\t\t return r;                                                      \n' +
           '}';

}


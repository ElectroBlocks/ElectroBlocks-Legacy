'use strict';

goog.provide('Blockly.Arduino.debug');

goog.require('Blockly.Arduino');

var VARIABLE_TYPES = ['double', 'String', 'bool'];

Blockly.Arduino['debug'] = function(block) {

    stepSerialBegin()
    Blockly.Arduino.functionNames_['double_to_string_debug'] = createDoubleToStringCFunc();

    for (var i = 0; i < VARIABLE_TYPES.length; i += 1) {
        Blockly.Arduino.functionNames_['print_array_' + VARIABLE_TYPES[i].replace(' ', '')] = createPrintArrayFuncInC(VARIABLE_TYPES[i].replace(' ', '')) + '\n\n';
    }

    var debugFunction  = '\n\nvoid debug(String blockNumber) { \n' +
        '\t\tString stopDebug = ""; \n';


    debugFunction += createDebugVariable();

    debugFunction += '\t\tSerial.println("DEBUG_BLOCK_" + String(blockNumber) + " ");\n\n';

    debugFunction += '\t\twhile (stopDebug != "s") { \n'  +
        '\t\t\tstopDebug = Serial.readStringUntil(\'|\'); \n' +
        '\t\t\tdelay(1000);  \n' +
        '\t\t}\n' ;

    debugFunction += '}\n';

    Blockly.Arduino.functionNames_['debug_function'] = debugFunction;


    return 'debug("' + block.id + '"); \n';
};

function createDebugVariable() {

    var debugString = '';

    var allVariables = Blockly.mainWorkspace.getAllVariables();

    for (var i = 0; i < allVariables.length; i += 1) {
        if (VARIABLE_TYPES.indexOf(allVariables[i].type) > -1) {
            debugString +=
                '\t\tSerial.println("**(|)' + allVariables[i].name + '_|_' + allVariables[i].type + '_|_" +';

            if (allVariables[i].type == 'double') {
                debugString += 'double2string(' + allVariables[i].name + ', 5));\n';
                continue;
            }

            debugString += 'String(' + allVariables[i].name + ')); \n';
            continue;
        }

        debugString += '\t\tSerial.println("**(|)' + allVariables[i].name + '_|_'
            +  'An Array of ' + allVariables[i].type + 's size => '  +
            getSizeOfArray(allVariables[i]) +    '_|_" + ' + 'printArray'
            + listTypeToArduinoBasicTypes(allVariables[i].type) +
            '(' + allVariables[i].name + ', ' + getSizeOfArray(allVariables[i]) + ')); \n';

    }

    return debugString;
}

function getSizeOfArray(variable) {
    var blocks = Blockly.mainWorkspace.getAllBlocks();
    for (var i = 0; i < blocks.length; i += 1) {
        var block = blocks[i];
        if (block.type != 'create_list_' +
            listTypeToBlocklyBasicTypes(variable.type).toLowerCase() + '_block') {
            continue;
        }

        var blockVariable = Blockly.mainWorkspace.getVariableById(block.getFieldValue('VAR'));

        if (blockVariable.getId() != variable.getId()) {
            continue;
        }

        return block.getFieldValue('SIZE');
    }
}

function listTypeToArduinoBasicTypes(type) {
    switch(type.toUpperCase()) {
        case 'LIST NUMBER':
            return 'double';
        case 'LIST STRING':
            return 'String';
        case 'LIST BOOLEAN':
            return 'boolean';
        default:
            return 'double';
    }
}

function listTypeToBlocklyBasicTypes(type) {
    switch(type.toUpperCase()) {
        case 'LIST NUMBER':
            return 'Number';
        case 'LIST STRING':
            return 'String';
        case 'LIST BOOLEAN':
            return 'Boolean';
        default:
            return 'Number';
    }
}

function createPrintArrayFuncInC(type)
{
    var func ='String printArrayREPLATEWITHTYPE(REPLATEWITHTYPE arr[], int sizeOfArray) {' +
        '\t\tString returnValue = "[";' +
        '\t\tfor (unsigned int i = 0; i < sizeOfArray; i += 1) {\n';
    if (type.toLowerCase() == 'double') {
        func += '\t\treturnValue +=  double2string(arr[i], 5);\n';
    }
    else if (type.toLowerCase() == 'bool') {
        func += '\t\treturnValue += arr[i] ? "TRUE" : "False"; \n'
    }
    else {
        func += '\t\treturnValue +=  String(arr[i]);\n';
    }

    func +=  '\t\tif (i < sizeOfArray -1) {\n' +
        '\t\treturnValue += ", ";\n' +
        '\t\t}\n' +
        '\t\t}\n' +
        '\t\t returnValue += "]";\n' +
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
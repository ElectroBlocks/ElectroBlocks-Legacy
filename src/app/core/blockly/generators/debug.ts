import { VARIABLE_TYPES } from '../types/variables';
import * as Blockly from 'blockly/core';
import { Block } from 'blockly';
import { stepSerialBegin } from './message';

Blockly.Arduino['debug_block'] = function(block) {
  stepSerialBegin();

  Blockly.Arduino.functionNames_[
    'double_to_string_debug'
  ] = createDoubleToStringCFunc();

  for (let i = 0; i < VARIABLE_TYPES.length; i += 1) {
    Blockly.Arduino.functionNames_[
      'print_array_' + VARIABLE_TYPES[i].replace(' ', '')
    ] = createPrintArrayFuncInC(VARIABLE_TYPES[i].replace(' ', '')) + '\n\n';
  }

  let debugFunction =
    '\n\nvoid debug(String blockNumber) { \n' + '\t\tString stopDebug = ""; \n';

  debugFunction += createDebugVariable();

  debugFunction +=
    '\t\tSerial.println("DEBUG_BLOCK_" + blockNumber + " ");\n\n';

  debugFunction +=
    '\t\twhile (stopDebug !== "s") { \n' +
    "\t\t\tstopDebug = Serial.readStringUntil('|'); \n" +
    '\t\t\tdelay(1000);  \n' +
    '\t\t}\n';

  debugFunction += '}\n';

  Blockly.Arduino.functionNames_['debug_function'] = debugFunction;

  return 'debug("' + block.id + '"); \n';
};

export function createDebugVariable() {
  let debugString = '';

  const allVariables = Blockly.mainWorkspace.getAllVariables();

  for (let i = 0; i < allVariables.length; i += 1) {
    if (VARIABLE_TYPES.indexOf(allVariables[i].type) > -1) {
      debugString +=
        '\t\tSerial.println("**(|)' +
        allVariables[i].name +
        '_|_' +
        allVariables[i].type +
        '_|_" +';

      if (allVariables[i].type === 'Number') {
        debugString += 'double2string(' + allVariables[i].name + ', 5));\n';
        continue;
      }

      debugString += 'String(' + allVariables[i].name + ')); \n';
      continue;
    }

    debugString +=
      '\t\tSerial.println("**(|)' +
      allVariables[i].name +
      '_|_' +
      'An Array of ' +
      allVariables[i].type +
      's size => ' +
      getArrayVariableSize(allVariables[i]) +
      '_|_" +' +
      'printArray' +
      allVariables[i].type.replace(' ', '') +
      '(' +
      allVariables[i].name +
      ',' +
      getArrayVariableSize(allVariables[i]) +
      ')); \n';
  }

  return debugString;
}

function getArrayVariableSize(variable) {
  const variableId = variable.getId();
  let blockType = '';
  if (variable.type === 'List String') {
    blockType = 'create_list_string_block';
  } else if (variable.type === 'List Number') {
    blockType = 'create_list_number_block';
  } else if (variable.type === 'List Boolean') {
    blockType = 'create_list_boolean_block';
  } else if (variable.type === 'List Colour') {
    blockType = 'create_list_colour_block';
  }

  const block = Blockly.mainWorkspace
    .getBlocksByType(blockType, true)
    .find((block) => block.getFieldValue('VAR') === variableId);

  if (!block) {
    return 1;
  }

  return block.getFieldValue('SIZE');
}

function createPrintArrayFuncInC(type) {
  let func =
    'String printArrayREPLATEWITHTYPE(REPLATEWITHTYPE arr[], int sizeOfArray) {' +
    '\t\tString returnValue = "[";' +
    '\t\tfor (unsigned int i = 0; i < sizeOfArray; i += 1) {\n';
  if (type.toLowerCase() === 'number') {
    func += '\t\treturnValue +=  double2string(arr[i], 5);\n';
  } else if (type.toLowerCase() === 'boolean') {
    func += '\t\treturnValue += arr[i] ? "TRUE" : "False"; \n';
  } else {
    func += '\t\treturnValue +=  String(arr[i]);\n';
  }

  func +=
    '\t\tif (i < sizeOfArray -1) {\n' +
    '\t\treturnValue += ", ";\n' +
    '\t\t}\n' +
    '\t\t}\n' +
    '\t\t returnValue += "]";\n' +
    '\t\treturn returnValue;\n' +
    '\t}\n';

  if (type === 'Number') {
    type = 'double';
  } else if (type === 'Boolean') {
    type = 'boolean';
  }
  return func.replace(/REPLATEWITHTYPE/g, type);
}

export function createDoubleToStringCFunc() {
  return (
    ' String double2string(double n, int ndec) {                         \n' +
    '\t\t String r = "";                                                 \n' +
    '\t\t int v = n;                                                     \n' +
    '\t\t r += v;     // whole number part                               \n' +
    "\t\t r += '.';   // decimal point                                   \n" +
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
    '}'
  );
}

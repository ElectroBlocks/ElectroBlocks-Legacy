import * as Blockly from 'blockly/core';
import { Block } from 'blockly';

Blockly.Arduino['math_number'] = function(block: Block) {
  // Numeric value.
  return [parseFloat(block.getFieldValue('NUM')), Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['math_arithmetic'] = function(block: Block) {
  // Basic arithmetic operators, and power.
  const OPERATORS = {
    ADD: [' + ', Blockly.Arduino.ORDER_ASSIGNMENT],
    MINUS: [' - ', Blockly.Arduino.ORDER_ASSIGNMENT],
    MULTIPLY: [' * ', Blockly.Arduino.ORDER_ASSIGNMENT],
    DIVIDE: [' / ', Blockly.Arduino.ORDER_ASSIGNMENT],
    POWER: [null, Blockly.Arduino.ORDER_ASSIGNMENT] // Handle power separately.
  };
  const tuple = OPERATORS[block.getFieldValue('OP')];
  const operator = tuple[0];
  const order = tuple[1];
  const argument0 = Blockly.Arduino.valueToCode(block, 'A', order) || '0';
  const argument1 = Blockly.Arduino.valueToCode(block, 'B', order) || '0';
  let code;
  // Power in Arduino requires a special case since it has no operator.
  if (!operator) {
    code = 'pow(' + argument0 + ', ' + argument1 + ')';
    return [code, Blockly.Arduino.ORDER_ASSIGNMENT];
  }
  code = argument0 + operator + argument1;
  return [code, order];
};

Blockly.Arduino['math_round'] = function(block: Block) {
  const operator = block.getFieldValue('OP');
  const arg =
    Blockly.Arduino.valueToCode(block, 'NUM', Blockly.Arduino.ORDER_NONE) ||
    '0';
  let code = '';
  switch (operator) {
    case 'ROUND':
      code = '(double)round(' + arg + ')';
      break;
    case 'ROUNDUP':
      code = '(double)ceil(' + arg + ')';
      break;
    case 'ROUNDDOWN':
      code = '(double)floor(' + arg + ')';
      break;
    default:
      throw Error('No option for this operator: ' + operator);
  }

  return [code, Blockly.Arduino.ORDER_UNARY_PREFIX];
};

Blockly.Arduino['math_modulo'] = function(block: Block) {
  const dividend =
    Blockly.Arduino.valueToCode(
      block,
      'DIVIDEND',
      Blockly.Arduino.ORDER_MODULUS
    ) || '0';
  const divisor =
    Blockly.Arduino.valueToCode(
      block,
      'DIVISOR',
      Blockly.Arduino.ORDER_MODULUS
    ) || '0';

  const code = '(double)(' + dividend + ' % ' + divisor + ')';

  return [code, Blockly.Arduino.ORDER_MODULUS];
};

Blockly.Arduino['math_random_int'] = function(block: Block) {
  const start =
    Blockly.Arduino.valueToCode(block, 'FROM', Blockly.Arduino.ORDER_MODULUS) ||
    0;

  const finish =
    Blockly.Arduino.valueToCode(block, 'TO', Blockly.Arduino.ORDER_MODULUS) ||
    1;

  let code = '';
  if (start > finish) {
    code = '(double)rand(' + finish + ', ' + start + ')';
  } else {
    code = '(double)rand(' + start + ', ' + finish + ')';
  }

  return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

Blockly.Arduino['string_to_number'] = function(block: Block) {
  Blockly.Arduino.functionNames_['parseDouble'] =
    '\ndouble parseDouble(String num) {\n' +
    '\t // Use num.toDouble() instead of this.  Doing this because of arduino is compiling on a linux server.  \n' +
    '\tchar str[40];\n' +
    '\tnum.toCharArray(str, num.length() + 1);\n' +
    '\treturn atof(str);\n' +
    '}\n';

  const string = Blockly.Arduino.valueToCode(
    block,
    'VALUE',
    Blockly.Arduino.ORDER_ATOMIC
  );

  return ['parseDouble(' + string + ')', Blockly.Arduino.ORDER_ATOMIC];
};

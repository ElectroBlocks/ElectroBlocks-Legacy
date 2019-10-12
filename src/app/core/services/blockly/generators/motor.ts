import * as Blockly from 'blockly/core';
import { Block } from 'blockly';

Blockly.Arduino['move_motor'] = function(block: Block) {
  var motorNumber = Blockly.Arduino.valueToCode(
    block,
    'MOTOR',
    Blockly.Arduino.ORDER_ATOMIC
  );

  var direction = block.getFieldValue('DIRECTION').toUpperCase();

  var speed = Blockly.Arduino.valueToCode(
    block,
    'SPEED',
    Blockly.Arduino.ORDER_ATOMIC
  );

  Blockly.Arduino.libraries_['include_motor_library'] =
    '#include <AFMotor.h>;\n';
  Blockly.Arduino.libraries_['include_motor_init_' + motorNumber] =
    'AF_DCMotor motor_' + motorNumber + '(' + motorNumber + ');\n';

  var code = 'motor_' + motorNumber + '.setSpeed(0);\n';
  code += 'motor_' + motorNumber + '.run("' + direction + '");\n';
  code += 'motor_' + motorNumber + '.setSpeed(' + speed + ');\n';

  return code;
};

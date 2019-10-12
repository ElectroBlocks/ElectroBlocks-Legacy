import * as Blockly from 'blockly/core';
import { Block } from 'blockly';

Blockly.Arduino['is_button_pressed'] = function(block: Block) {
  var pin = block.getFieldValue('PIN');

  Blockly.Arduino.setupCode_['btn_pin_' + pin] =
    '\tpinMode(' + pin + ', INPUT_PULLUP); \n';

  return ['(digitalRead(' + pin + ') == LOW)', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['digital_read'] = function(block: Block) {
  var pin = block.getFieldValue('PIN');

  Blockly.Arduino.setupCode_['digital_read' + pin] =
    '\tpinMode(' + pin + ', INPUT); \n';

  return ['digitalRead(' + pin + ')', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['digital_write'] = function(block: Block) {
  var pin = block.getFieldValue('PIN');

  var state = block.getFieldValue('STATE') == 'ON' ? 'HIGH' : 'LOW';

  return 'digitalWrite(' + pin + ', ' + state + '); \n';
};

Blockly.Arduino['analog_read'] = function(block: Block) {
  var pin = block.getFieldValue('PIN');

  return ['(double)analogRead(' + pin + ')', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['analog_write'] = function(block: Block) {
  var pin = block.getFieldValue('PIN');
  var numberToSend = Blockly.Arduino.valueToCode(
    block,
    'WRITE_VALUE',
    Blockly.Arduino.ORDER_ATOMIC
  );

  return 'analogWrite(' + pin + ', ' + numberToSend + '); \n';
};

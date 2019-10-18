import * as Blockly from 'blockly/core';
import { Block } from 'blockly';
import { selectedBoard } from '../types/pins';

export function stepSerialBegin() {
  Blockly.Arduino.setupCode_['serial_begin'] =
    '\tSerial.begin(' + selectedBoard().serial_baud_rate + '); \n';
}

Blockly.Arduino['message_setup'] = function() {
  stepSerialBegin();

  return '';
};

Blockly.Arduino['arduino_receive_message'] = function(block) {
  return [
    "Serial.readStringUntil('" + '|' + "')",
    Blockly.Arduino.ORDER_ATOMIC
  ];
};

Blockly.Arduino['arduino_has_message'] = function(block) {
  return ['(Serial.available() > 0)', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['arduino_send_message'] = function(block) {
  var message = Blockly.Arduino.valueToCode(
    block,
    'MESSAGE',
    Blockly.Arduino.ORDER_ATOMIC
  );

  return '\tSerial.println(' + message + ');\n';
};

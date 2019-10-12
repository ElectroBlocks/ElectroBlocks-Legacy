import * as Blockly from 'blockly/core';
import { Block } from 'blockly';
import { selectedBoard } from '../types/pins';

Blockly.Arduino['bluetooth_setup'] = function(block) {
  var rxPin = block.getFieldValue('RX');
  var txPin = block.getFieldValue('TX');
  Blockly.Arduino.libraries_['define_bluetooth'] =
    '#include <SoftwareSerial.h>;\nSoftwareSerial blueToothSerial(' +
    txPin +
    ', ' +
    rxPin +
    '); \n';

  Blockly.Arduino.setupCode_['bluetooth_setup'] =
    '\tblueToothSerial.begin(' +
    selectedBoard().serial_baud_rate +
    '); \n' +
    '\tdelay(1000); \n';

  return '';
};

Blockly.Arduino['bluetooth_get_message'] = function(block) {
  return ["blueToothSerial.readStringUntil('|')", Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['bluetooth_has_message'] = function(block) {
  // available() returns the number of bytes.  Because 0 will return false
  // we can return 0 as false and greater than 0 as true for the blocks.
  return ['(boolean)blueToothSerial.available()', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['bluetooth_send_message'] = function(block) {
  var message = Blockly.Arduino.valueToCode(
    block,
    'MESSAGE',
    Blockly.Arduino.ORDER_ATOMIC
  );

  return 'blueToothSerial.write(' + message + ');\n';
};

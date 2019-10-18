import * as Blockly from 'blockly/core';
import { Block } from 'blockly';

const tempPinContainer = { tempPin: 7 };

Blockly.Arduino['temp_setup'] = function(block: Block) {
  tempPinContainer.tempPin = parseInt(block.getFieldValue('PIN')) || 7;

  Blockly.Arduino.libraries_['temp_setup'] = '#include <dht.h>;\n dht DHT;\n';

  return '';
};

Blockly.Arduino['temp_read_temp_humidity'] = function() {
  return 'DHT.read11(' + tempPinContainer.tempPin + ');\n';
};

Blockly.Arduino['temp_get_temp'] = function() {
  return ['DHT.temperature', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['temp_get_humidity'] = function() {
  return ['DHT.humidity', Blockly.Arduino.ORDER_ATOMIC];
};

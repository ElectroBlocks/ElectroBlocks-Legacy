import * as Blockly from 'blockly/core';
import { Block } from 'blockly';
import { stepSerialBegin } from './message';

Blockly.Arduino['soil_sensor_setup'] = function(block: Block) {
  stepSerialBegin();
  const pin = block.getFieldValue('PIN') || 'A1';
  Blockly.Arduino.libraries_['define_water_sensor'] =
    '#include <HygrometerSensor.h>';
  Blockly.Arduino.libraries_['water_sensor_setup'] =
    'HygrometerSensor analog_rain_drop(HygrometerSensor::ANALOG, ' +
    pin +
    ');\n';

  Blockly.Arduino.setupCode_['water_sensor_setup'] =
    '\tif (!analog_rain_drop.setAnalogParameters(ANALOG_HUMIDITY_MIN, ANALOG_HUMIDITY_MAX, 800)) { \n' +
    '\t\tSerial.print("Error while setting Analog parameters\\n");\n' +
    '\t}\n' +
    '\tint min, max, is_raining; \n' +
    '\tanalog_rain_drop.getAnalogParameters(min, max, is_raining); \n' +
    '\tSerial.println("Minimum analog value: "); \n' +
    '\tSerial.print(min, DEC); \n' +
    '\tSerial.println("Maximum analog value: "); \n' +
    '\tSerial.print(max, DEC); \n' +
    "\tSerial.println(\"Value used as switch from 'dry' to is 'raining' : \"); \n" +
    '\tSerial.print(is_raining, DEC); \n';
  return '';
};

Blockly.Arduino['soil_humidity_value'] = function() {
  return ['analog_rain_drop.readHumidityValue()', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['soil_humidity_percentage'] = function() {
  return [
    'analog_rain_drop.readPercentageHumidity()',
    Blockly.Arduino.ORDER_ATOMIC
  ];
};

Blockly.Arduino['soil_is_raining'] = function() {
  return ['analog_rain_drop.isHumid()', Blockly.Arduino.ORDER_ATOMIC];
};

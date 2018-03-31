goog.provide('Blockly.Arduino.water_sensor');

goog.require('Blockly.Arduino');

Blockly.Arduino['water_sensor_setup'] = function (block) {
    Blockly.Arduino._serial_setup();
    var pin =  block.getFieldValue('PIN') || 'A1';
    Blockly.Arduino.definitions_['define_water_sensor'] = "#include <HygrometerSensor.h>";
    Blockly.Arduino.definitions_['water_sensor_setup'] = "HygrometerSensor analog_rain_drop(HygrometerSensor::ANALOG, " + pin + ");\n";

    Blockly.Arduino.setups_['water_sensor_setup'] = "if (!analog_rain_drop.setAnalogParameters(ANALOG_HUMIDITY_MIN, ANALOG_HUMIDITY_MAX, 800)) { \n" +
                "\tSerial.print(\"Error while setting Analog parameters\\n\");\n" +
        "}\n" +
        "int min, max, is_raining; \n"  +
        "analog_rain_drop.getAnalogParameters(min, max, is_raining); \n" +
        "Serial.print(\"Minimum analog value: \"); \n" +
        "Serial.print(min, DEC); \n" +
        "Serial.print(\"\\nMaximum analog value: \"); \n" +
        "Serial.print(max, DEC); \n"  +
        "Serial.print(\"\\nValue used as switch from \'dry\' to \'is raining\': \"); \n"  +
        "Serial.print(is_raining, DEC); \n"
    return '';
};

Blockly.Arduino['water_sensor_read_humidity_value'] = function () {
   return ['analog_rain_drop.readHumidityValue()', Blockly.Arduino.ORDER_ATOMIC]
};

Blockly.Arduino['water_sensor_read_percentage_humidity'] = function () {
    return ['analog_rain_drop.readPercentageHumidity()', Blockly.Arduino.ORDER_ATOMIC]
};

Blockly.Arduino['water_sensor_is_humid'] = function () {
    return ['analog_rain_drop.isHumid()', Blockly.Arduino.ORDER_ATOMIC];
};
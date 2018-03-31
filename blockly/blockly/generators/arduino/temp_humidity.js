goog.provide('Blockly.Arduino.temp_humidity');

goog.require('Blockly.Arduino');


var pin = 7;

Blockly.Arduino['temp_humidity_setup'] = function (block) {

    pin =  block.getFieldValue('PIN') || '7';

    Blockly.Arduino.definitions_['define_temp_humidity'] = "#include <dht.h> \n dht DHT;\n";

    return '';
};

Blockly.Arduino['temp_humidity_get_reading'] = function () {

    return "DHT.read11(" + pin + ");\n";
};


Blockly.Arduino['temp_humidity_humidity_percentage'] = function () {

    return ["DHT.temperature", Blockly.Arduino.ORDER_ATOMIC]
};



Blockly.Arduino['temp_humidity_temp_celsius'] = function () {

    return ["DHT.humidity", Blockly.Arduino.ORDER_ATOMIC]
};
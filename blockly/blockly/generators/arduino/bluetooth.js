'use strict';

goog.provide('Blockly.Arduino.bluetooth');

goog.require('Blockly.Arduino');


Blockly.Arduino['bluetooth_setup'] = function (block) {

    var rxPin = block.getFieldValue('RX');
    var txPin = block.getFieldValue('TX');
    Blockly.Arduino.definitions_['define_bluetooth'] =
        "#include <SoftwareSerial.h>\n SoftwareSerial blueToothSerial(" + txPin + ", " + rxPin  + "); \n";

    Blockly.Arduino.setups_['bluetooth_setup'] =
            'blueToothSerial.begin(' + 9600 + '); \n' +
            'delay(1000); \n';

    return '';

};

Blockly.Arduino['bluetooth_is_available'] = function (block) {
    return ['blueToothSerial.available()', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['bluetooth_read_until_string'] = function (block) {
    var stringValue =  Blockly.Arduino.valueToCode(block, 'STRING VALUE', Blockly.Arduino.ORDER_ATOMIC);
    var intoFunction = '';
    if (stringValue.indexOf('"') > - 1) {
        intoFunction = stringValue.replace(/"/g, "'");
    }
    else {
        intoFunction = stringValue + '[0]';
    }

    return ['blueToothSerial.readStringUntil(' + intoFunction + ')', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['bluetooth_write'] = function (block) {
    var stringValue =  Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_ATOMIC);

    return 'blueToothSerial.println(' + stringValue + '); \n\n';
};
'use strict';

goog.provide('Blockly.Arduino.bluetooth');

goog.require('Blockly.Arduino');


Blockly.Arduino['bluetooth_setup'] = function (block) {

    var rxPin = block.getFieldValue('RX');
    var txPin = block.getFieldValue('TX');
    var blueToothName =  Blockly.Arduino.valueToCode(block, 'NAME', Blockly.Arduino.ORDER_ATOMIC)
    var blueToothSecretPin =  Blockly.Arduino.valueToCode(block, 'PIN', Blockly.Arduino.ORDER_ATOMIC)

    Blockly.Arduino.definitions_['define_bluetooth'] =
        "#include <SoftwareSerial.h>\n SoftwareSerial blueToothSerial(" + rxPin + ", " +  txPin + "); \n";

    Blockly.Arduino.setups_['bluetooth_setup'] = 'blueToothSerial.begin(9600); \n' +
            'blueToothSerial.write("AT+NAME' + blueToothName.replace(/"/g, '') +  '"); \n' +
            'blueToothSerial.write("AT+PIN' + blueToothSecretPin +  '"); \n' +
            'blueToothSerial.write("AT+BAUD4"); \n' +
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
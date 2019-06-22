'use strict';

goog.provide('Blockly.Arduino.message');

goog.require('Blockly.Arduino');

function stepSerialBegin() {
    Blockly.Arduino.setupCode_['serial_begin'] = '\tSerial.begin(' + selectedBoard.serial_baud_rate + '); \n'
}

Blockly.Arduino['receive_message'] = function (block) {
    stepSerialBegin();
    return ['Serial.readStringUntil(\'' + '|' + '\')', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['has_message'] = function(block) {
    stepSerialBegin();
    return ['(Serial.available() > 0)', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['send_message'] = function(block) {
    stepSerialBegin();
    var message = Blockly.Arduino.valueToCode(block, 'MESSAGE', Blockly.Arduino.ORDER_ATOMIC);

    return '\tSerial.println(' + message + ');\n';
};

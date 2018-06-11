goog.provide('Blockly.Arduino.time');

goog.require('Blockly.Arduino');


Blockly.Arduino['time_millis'] = function () {
    return ['millis()', Blockly.Arduino.ORDER_ATOMIC];
};
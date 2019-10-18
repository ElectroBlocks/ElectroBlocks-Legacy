'use strict';

goog.provide('Blockly.Arduino.rfid');

goog.require('Blockly.Arduino');


function setupRFID() {
    Blockly.Arduino.libraries_['define_rfid'] = '#include "RFIDRdm630.h"\n';
    Blockly.Arduino.libraries_['setup_rfid'] = 'RFIDRdm630 reader = RFIDRdm630(6,7);\n';
};

Blockly.Arduino['rfid_scan'] = function () {
    setupRFID();
    return ['reader.isAvailable()', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['rfid_tag'] = function () {
    setupRFID();
    return ['reader.getTag().getTag()', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['rfid_card'] = function () {
    setupRFID();
    return ['reader.getTag().getCardNumber()', Blockly.Arduino.ORDER_ATOMIC];
};

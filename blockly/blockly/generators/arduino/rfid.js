goog.provide('Blockly.Arduino.rfid');

goog.require('Blockly.Arduino');


function setupRFID() {
    Blockly.Arduino.definitions_['define_rfid'] = '#include "RFIDRdm630.h"';
    Blockly.Arduino.definitions_['setup_rfid'] = 'RFIDRdm630 reader = RFIDRdm630(6,7);\n';
};

Blockly.Arduino['rfid_scanned_card'] = function () {
    setupRFID();
    return ['reader.isAvailable()', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['rfid_tag_number'] = function () {
    setupRFID();
    return ['reader.getTag().getTag()', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['rfid_card_number'] = function () {
    setupRFID();
    return ['reader.getTag().getCardNumber()', Blockly.Arduino.ORDER_ATOMIC];
};

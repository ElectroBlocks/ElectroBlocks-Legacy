goog.provide('Blockly.Arduino.led_matrix');

goog.require('Blockly.Arduino');

function setupLedMatrix() {
    Blockly.Arduino.definitions_['define_led_matrix'] = '#include <LedControlMS.h>\n';
    Blockly.Arduino.definitions_['led_matrix_setup'] = "LedControl lc=LedControl(12,11,10,1);\n";

    Blockly.Arduino.setups_['led_matrix'] = "lc.shutdown(0,false); \nlc.setIntensity(0,8);\nlc.clearDisplay(0);\n";
}

Blockly.Arduino['led_matrix_set_column'] = function (block) {
    setupLedMatrix();
    var columnNumber = Blockly.Arduino.valueToCode(block, 'Column Number', Blockly.Arduino.ORDER_ATOMIC);
    var byteValue = Blockly.Arduino.valueToCode(block, 'BYTE VALUE', Blockly.Arduino.ORDER_ATOMIC);

    return 'lc.setColumn(0,' + columnNumber + ', ' + byteValue + '); \n';
};

Blockly.Arduino['led_matrix_set_row'] = function (block) {
    setupLedMatrix();
    var rowNumber = Blockly.Arduino.valueToCode(block, 'Row Number', Blockly.Arduino.ORDER_ATOMIC);
    var byteValue = Blockly.Arduino.valueToCode(block, 'BYTE VALUE', Blockly.Arduino.ORDER_ATOMIC);

    return 'lc.setRow(0,' + rowNumber + ', ' + byteValue + '); \n';
};

Blockly.Arduino['led_matrix_set_led'] = function (block) {
    setupLedMatrix();
    var rowNumber = Blockly.Arduino.valueToCode(block, 'Row Number', Blockly.Arduino.ORDER_ATOMIC);
    var columnNumber = Blockly.Arduino.valueToCode(block, 'Column Number', Blockly.Arduino.ORDER_ATOMIC);
    var lightState = block.getFieldValue('LIGHT').toLowerCase();

    return 'lc.setLed(0, ' + rowNumber + ', ' + columnNumber + ', ' + lightState + '); \n';

};

Blockly.Arduino['led_matrix_clear'] = function () {
    setupLedMatrix();
    return 'lc.clearDisplay(0); \n';
};
goog.provide('Blockly.Arduino.ir_remote');

goog.require('Blockly.Arduino');


Blockly.Arduino['ir_remote_setup'] = function (block) {
    var pin =  block.getFieldValue('PIN') || 'A1';
    Blockly.Arduino.definitions_['define_ir_remote'] =
            "#include <IRremote.h> \nIRrecv irReceiver(" + pin +  ");\ndecode_results result;\n";

    Blockly.Arduino.setups_['setup_ir_remote'] = "irReceiver.enableIRIn(); \n";
    return '';
};

Blockly.Arduino['ir_remote_has_reading'] = function () {

    return ['irReceiver.decode(&result)', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['ir_remote_get_hex'] = function () {

    return ['String(result.value, HEX)', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['ir_remote_can_read_again'] = function () {
    return "irReceiver.resume();\n";
};


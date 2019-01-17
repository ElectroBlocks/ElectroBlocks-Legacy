'use strict';

goog.provide('Blockly.Arduino.inputoutput');

goog.require('Blockly.Arduino');

Blockly.Arduino['is_button_pressed'] = function (block) {

    var pin = block.getFieldValue('PIN');

    Blockly.Arduino.setupCode_['btn_pin_' + pin ] = '\tpinMode(' + pin + ', INPUT_PULLUP); \n';

    return ['(digitalRead(' + pin +') == LOW)', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['digital_read'] = function (block) {
    var pin = block.getFieldValue('PIN');

    Blockly.Arduino.setupCode_['digital_pin_' + pin ] = '\tpinMode(' + pin + ', OUTPUT); \n';

    return ['digitalRead(' + pin +')', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['digital_write'] = function(block) {
    var pin = block.getFieldValue('PIN');

    var state = block.getFieldValue('STATE') == 'ON' ? 'HIGH' : 'LOW';
    Blockly.Arduino.setupCode_['digital_pin_' + pin ] = '\tpinMode(' + pin + ', INPUT); \n';


    return 'digitalWrite(' + pin + ', ' + state + '); \n';
};

Blockly.Arduino['analog_read'] = function(block) {

    var pin = block.getFieldValue('PIN');

    return ['(double)analogRead(' + pin +')', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['analog_write'] = function(block) {
    var pin = block.getFieldValue('PIN');
    var numberToSend = Blockly.Arduino.valueToCode(block, 'WRITE_VALUE', Blockly.Arduino.ORDER_ATOMIC);

    return 'analogWrite(' + pin + ', ' + numberToSend + '); \n';
};

Blockly.Arduino['ultra_sonic_sensor_distance'] = function (block) {
    var echoPin = block.getFieldValue('ECHO');
    var trigPin = block.getFieldValue('TRIG');

    Blockly.Arduino.setupCode_['setup_input_' + echoPin] = '\tpinMode(' + echoPin + ', INPUT);\n';
    Blockly.Arduino.setupCode_['setup_input_' + trigPin] = '\tpinMode(' + trigPin + ', OUTPUT);\n';
    Blockly.Arduino.functionNames_['pulse_in_function'] =
        'double ultraSonicDistance(int trigPin, int echoPin) { \n' +
        '\tdigitalWrite(trigPin, LOW);\n' +
        '\tdelayMicroseconds(2); \n'  +
        '\tdigitalWrite(trigPin, HIGH); \n'  +
        '\tdelayMicroseconds(10); \n'  +
        '\tdigitalWrite(trigPin, LOW); \n' +
        '\tlong microseconds = pulseIn(echoPin, HIGH); \n' +
        '\treturn (double)(microseconds / 29 / 2); \n' +
        '} \n\n';

    return ['ultraSonicDistance(' + echoPin + ', ' + trigPin + ')', Blockly.Arduino.ORDER_ATOMIC];
};

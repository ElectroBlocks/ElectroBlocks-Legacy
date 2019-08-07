'use strict';

goog.provide('Blockly.Arduino.led');

goog.require('Blockly.Arduino');


Blockly.Arduino['led_switch'] = function(block) {
    var pin = block.getFieldValue('PIN');
    var state = block.getFieldValue('STATE');

    Blockly.Arduino.setupCode_['led_pin' + pin ] = '\tpinMode(' + pin + ', OUTPUT); \n';

    return 'digitalWrite(' + pin + ', ' + state + '); \n';
};

Blockly.Arduino['led_fade'] = function (block) {
    var pin = block.getFieldValue('PIN');
    var fadeNumber =
        Blockly.Arduino.valueToCode(block, 'FADE', Blockly.Arduino.ORDER_ATOMIC);

    Blockly.Arduino.setupCode_['led_pin' + pin ] = '\tpinMode(' + pin + ', OUTPUT); \n';

    return 'analogWrite(' + pin + ', ' + fadeNumber || 1 + '); \n';
};

Blockly.Arduino['setup_led_color'] = function (block) {

    const [redPin, greenPin, bluePin] = block.getFieldValue('WIRE').split('-');

    Blockly.Arduino.setupCode_['led_pin_' + redPin ] =
        `\tpinMode(${redPin}, OUTPUT); \n`;
    Blockly.Arduino.setupCode_['led_pin_' + greenPin ] =
        `\tpinMode(${greenPin}, OUTPUT); \n`;
    Blockly.Arduino.setupCode_['led_pin_' + bluePin] =
        `\tpinMode(${bluePin}, OUTPUT); \n`;

    Blockly.Arduino.libraries_['color_pin_blue'] =
        'int BLUE_PIN = ' + bluePin + ';\n';

    Blockly.Arduino.libraries_['color_pin_red'] =
        'int RED_PIN = ' + redPin + ';\n';

    Blockly.Arduino.libraries_['color_pin_green'] =
        'int GREEN_PIN = ' + greenPin + ';\n';

    Blockly.Arduino.functionNames_['_setLedColor'] = 'void _setLedColor(RGB color) {\n' +
        '\tanalogWrite(GREEN_PIN, color.green); \n' +
        '\tanalogWrite(BLUE_PIN, color.blue); \n' +
        '\tanalogWrite(RED_PIN, color.red); \n' +
        '}\n';

    return '';
};

Blockly.Arduino['set_color_led'] = function (block) {
    var color = Blockly.Arduino.valueToCode(
        block,
        'COLOUR',
        Blockly.Arduino.ORDER_ATOMIC
    );

    return '_setLedColor(' + color + ');\n';
};

'use strict';

goog.provide('Blockly.Arduino.colour');

goog.require('Blockly.Arduino');


Blockly.Arduino['colour_rgb']= function (block) {
    var red =  Blockly.Arduino.valueToCode(block, 'RED', Blockly.Arduino.ORDER_ATOMIC);
    var green =  Blockly.Arduino.valueToCode(block, 'GREEN', Blockly.Arduino.ORDER_ATOMIC);
    var blue =  Blockly.Arduino.valueToCode(block, 'BLUE', Blockly.Arduino.ORDER_ATOMIC);

    return ['"' + [red, green, blue].join('-') + '"', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['colour_picker']= function (block) {
    var hexColor = block.getFieldValue('COLOUR');

    return ['"' + hexToRgb(hexColor).join('-') + '"', Blockly.Arduino.ORDER_ATOMIC];
};


function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return [ parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] || [0,0,0];
}
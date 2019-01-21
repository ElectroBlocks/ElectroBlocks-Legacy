'use strict';

goog.provide('Blockly.Arduino.lcd_screen');

goog.require('Blockly.Arduino');

Blockly.Arduino['lcd_setup'] = function (block) {

    var numberOfRows = Blockly.Arduino.valueToCode(block, 'ROWS', Blockly.Arduino.ORDER_ATOMIC);
    var numberOfColumns = Blockly.Arduino.valueToCode(block, 'COLUMNS', Blockly.Arduino.ORDER_ATOMIC);
    var memoryAddressLCDType = block.getFieldValue('MEMORY_TYPE').toUpperCase();


    Blockly.Arduino.libraries_['define_wire'] = '#include <Wire.h>;\n';
    Blockly.Arduino.libraries_['define_liquid_crystal_i2c_big'] = '#include <LiquidCrystal_I2C.h>;\n';
    Blockly.Arduino.libraries_['liquid_crystal_ic2_lcd_object'] =
        'LiquidCrystal_I2C lcd(' + memoryAddressLCDType + ','+ numberOfRows + ',' + numberOfColumns + ');';

    Blockly.Arduino.setupCode_['liquid_crystal_ic2_lcd'] = '' +
        '\tlcd.init();\n'  + '\tlcd.backlight(); \n';

    return '';
};

Blockly.Arduino['lcd_screen_simple_print'] = function(block) {

    var textRow1 = Blockly.Arduino.valueToCode(block, 'ROW_1', Blockly.Arduino.ORDER_ATOMIC);
    var textRow2 = Blockly.Arduino.valueToCode(block, 'ROW_2', Blockly.Arduino.ORDER_ATOMIC);
    var textRow3 = Blockly.Arduino.valueToCode(block, 'ROW_3', Blockly.Arduino.ORDER_ATOMIC);
    var textRow4 = Blockly.Arduino.valueToCode(block, 'ROW_4', Blockly.Arduino.ORDER_ATOMIC);
    var delayMilliSeconds = Blockly.Arduino.valueToCode(block, 'DELAY', Blockly.Arduino.ORDER_ATOMIC);


    function printRow(row, textRow) {
        return  textRow !== '""' ? 'lcd.setCursor(0, ' + row + '); \n'  + 'lcd.print(' + textRow + '); \n' : '';
    }

    return 'lcd.clear(); \n'
        +  printRow(0, textRow1)
        +  printRow(1, textRow2)
        +  printRow(2, textRow3)
        +  printRow(3, textRow4)
        + 'delay(' + delayMilliSeconds + '); \n'
        + 'lcd.clear(); \n';

};

Blockly.Arduino['lcd_backlight'] = function(block) {

    return block.getFieldValue('BACKLIGHT').toUpperCase() === 'ON' ? '\tlcd.backlight();\n' : '\tlcd.noBacklight();\n';
};

Blockly.Arduino['lcd_screen_clear'] = function (block) {
    return '\tlcd.clear();\n';
};

Blockly.Arduino['lcd_screen_print'] = function (block) {
    var row = parseInt(Blockly.Arduino.valueToCode(block, 'ROW', Blockly.Arduino.ORDER_ATOMIC));
    var column = parseInt(Blockly.Arduino.valueToCode(block, 'COLUMN', Blockly.Arduino.ORDER_ATOMIC));
    var message = Blockly.Arduino.valueToCode(block, 'PRINT', Blockly.Arduino.ORDER_ATOMIC);

    column = column > 0 ? (column - 1) : 0;
    row = row > 0 ? (row - 1) : 0;

    return '\tlcd.setCursor(' + column + ', ' + row + ');\n' + '\tlcd.print(' + message + '); \n'
};

Blockly.Arduino['lcd_screen_blink'] = function (block) {
    var row = parseInt(Blockly.Arduino.valueToCode(block, 'ROW', Blockly.Arduino.ORDER_ATOMIC));
    var column = parseInt(Blockly.Arduino.valueToCode(block, 'COLUMN', Blockly.Arduino.ORDER_ATOMIC));
    var blink = block.getFieldValue('NAME').toUpperCase() === 'BLINK';


    column = column > 0 ? (column - 1) : 0;
    row = row > 0 ? (row - 1) : 0;

    var code = '\tlcd.setCursor(' + column + ', ' + row + ');\n';
    code += blink ? '\tlcd.blink();\n' : '\tlcd.noBlink();\n';

    return code;
};
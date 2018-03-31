goog.provide('Blockly.Arduino.liquid_crystal');

goog.require('Blockly.Arduino');

var numberOfRows = 4;
var numberOfColumns = 20;
var memoryAddressLCDType = '0x3F';

function setUpI2CLiquidCrystal() {
    Blockly.Arduino.definitions_['define_wire'] = '#include <Wire.h>\n';
    Blockly.Arduino.definitions_['define_liquid_crystal_i2c_big'] = '#include <LiquidCrystal_I2C.h>\n';
    Blockly.Arduino.definitions_['liquid_crystal_ic2_lcd_object'] = 
        'LiquidCrystal_I2C lcd(' + memoryAddressLCDType + ','+ numberOfRows + ',' + numberOfColumns + ');';

    Blockly.Arduino.setups_['liquid_crystal_ic2_lcd'] = 'lcd.init();\n'  + 'lcd.backlight(); \n';
}

Blockly.Arduino['liquid_crystal_ic2_lcd_setup'] = function(block) {
    numberOfRows = Blockly.Arduino.valueToCode(block, 'Number of Rows', Blockly.Arduino.ORDER_ATOMIC);
    numberOfColumns = Blockly.Arduino.valueToCode(block, 'Number of Columns', Blockly.Arduino.ORDER_ATOMIC);
    memoryAddressLCDType = this.getFieldValue('memory address lcd type').toUpperCase();
    setUpI2CLiquidCrystal();
    return '';
};

Blockly.Arduino['liquid_crystal_ic2_lcd'] = function(block) {

    setUpI2CLiquidCrystal();
    var textRow1 = Blockly.Arduino.valueToCode(block, 'Row 1', Blockly.Arduino.ORDER_ATOMIC);
    var textRow2 = Blockly.Arduino.valueToCode(block, 'Row 2', Blockly.Arduino.ORDER_ATOMIC);
    var textRow3 = Blockly.Arduino.valueToCode(block, 'Row 3', Blockly.Arduino.ORDER_ATOMIC);
    var textRow4 = Blockly.Arduino.valueToCode(block, 'Row 4', Blockly.Arduino.ORDER_ATOMIC);
    var delayMilliSeconds = Blockly.Arduino.valueToCode(block, 'Delay Time', Blockly.Arduino.ORDER_ATOMIC);


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

Blockly.Arduino['liquid_crystal_ic2_lcd_backlight'] = function() {

    setUpI2CLiquidCrystal();

    return this.getFieldValue('backlight').toUpperCase() === 'ON' ? 'lcd.backlight();\n' : 'lcd.noBacklight();\n';
};

Blockly.Arduino['liquid_crystal_ic2_lcd_clear'] = function () {
    setUpI2CLiquidCrystal();

    return 'lcd.clear();\n';
};

Blockly.Arduino['liquid_crystal_ic2_lcd_set_cursor'] = function (block) {
   setUpI2CLiquidCrystal();

    var row = Blockly.Arduino.valueToCode(block, 'Row', Blockly.Arduino.ORDER_ATOMIC);
    var column = Blockly.Arduino.valueToCode(block, 'Column', Blockly.Arduino.ORDER_ATOMIC);

    return 'lcd.setCursor(' + column +',' + row + '); \n';
};

Blockly.Arduino['liquid_crystal_ic2_lcd_print'] = function (block) {
    setUpI2CLiquidCrystal();

    var message = Blockly.Arduino.valueToCode(block, 'Print Message', Blockly.Arduino.ORDER_ATOMIC);

    return 'lcd.print(' + message + '); \n';
};

Blockly.Arduino['liquid_crystal_ic2_lcd_blink'] = function () {
    setUpI2CLiquidCrystal();

    return this.getFieldValue('blink').toUpperCase() === 'YES' ? 'lcd.blink();\n' : 'lcd.noBlink();\n';
};

Blockly.Arduino['liquid_crystal_ic2_lcd_scroll_right'] = function () {
    setUpI2CLiquidCrystal();

    return 'lcd.scrollDisplayRight(); \n';
};

Blockly.Arduino['liquid_crystal_ic2_lcd_scroll_left'] = function () {
    setUpI2CLiquidCrystal();

    return 'lcd.scrollDisplayLeft(); \n';
};
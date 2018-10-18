goog.provide('Blockly.Arduino.neo_pixel');

goog.require('Blockly.Arduino');


Blockly.Arduino['neo_pixel_setup'] = function (block) {

    var numberOfLeds = Blockly.Arduino.valueToCode(block, 'NUMBER OF LEDS', Blockly.Arduino.ORDER_ATOMIC);
    var pin =  block.getFieldValue('PIN') || 'A1';

    Blockly.Arduino.definitions_['define_neo_pixel'] = "#include <Adafruit_NeoPixel.h>\n #ifdef __AVR__ \n #include <avr/power.h> \n #endif";
    Blockly.Arduino.definitions_['neo_pixel_setup'] = "Adafruit_NeoPixel pixels = Adafruit_NeoPixel("
        + numberOfLeds + "," +  pin + ", NEO_GRB + NEO_KHZ800);\n\n";

    Blockly.Arduino.setups_['neo_pixel'] = "#if defined (__AVR_ATtiny85__) \nif (F_CPU == 16000000) clock_prescale_set(clock_div_1); \n#endif\npixels.begin();\n";

    return '';
};

Blockly.Arduino['neo_pixel_set_pixel_color'] = function (block) {
    var colors = Blockly
        .Arduino
        .valueToCode(block, 'COLOR', Blockly.Arduino.ORDER_ATOMIC)
        .replace(/"/g, '')
        .split('-');
    console.log(colors);
    var led = Blockly.Arduino.valueToCode(block, 'PIXEL', Blockly.Arduino.ORDER_ATOMIC);
    var red = !isNaN(parseInt(colors[0])) ? parseInt(colors[0]) : colors[0];
    var green = !isNaN(parseInt(colors[1])) ? parseInt(colors[1]) : colors[0];
    var blue = !isNaN(parseInt(colors[2])) ? parseInt(colors[2]) : colors[0];

    return 'pixels.setPixelColor(' + led + ', pixels.Color(' + red + ',' + green + ',' + blue + '));\n pixels.show(); \n';
};
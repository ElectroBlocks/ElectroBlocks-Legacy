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
    var red = Blockly.Arduino.valueToCode(block, 'RED', Blockly.Arduino.ORDER_ATOMIC);
    var blue = Blockly.Arduino.valueToCode(block, 'BLUE', Blockly.Arduino.ORDER_ATOMIC);
    var green = Blockly.Arduino.valueToCode(block, 'GREEN', Blockly.Arduino.ORDER_ATOMIC);
    var led = Blockly.Arduino.valueToCode(block, 'PIXEL', Blockly.Arduino.ORDER_ATOMIC);

    return 'pixels.setPixelColor(' + led + ', pixels.Color(' + red + ',' + green + ',' + blue + '));\n pixels.show(); \n';
};
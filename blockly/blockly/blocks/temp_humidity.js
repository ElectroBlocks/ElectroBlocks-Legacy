goog.provide('Blockly.Blocks.temp_humidity');

goog.require('Blockly.Blocks');


Blockly.Blocks['temp_humidity_setup'] =  {
    init: function () {
        this.setColour(230);
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("images/setup.jpg", 50, 50, "*"))
            .appendField("Sensor PIN (Place on top!!!) #")
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");

        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
    }
};

Blockly.Blocks['temp_humidity_get_reading'] = {
    init: function () {
        this.setColour(175);
        this.appendDummyInput()
            .appendField("Read Temp and humidity")
            .appendField(new Blockly.FieldImage("images/sensing.jpg", 50, 50, "*"))

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks['temp_humidity_humidity_percentage'] =  {
    init: function () {
        this.setColour(175);
        this.appendDummyInput()
            .appendField("Temp In Celsius")
            .appendField(new Blockly.FieldImage("images/celsius_temp.jpg", 50, 50, "*"))
        this.setOutput(true, 'Number');
    }
};

Blockly.Blocks['temp_humidity_temp_celsius'] = {
    init: function () {
        this.setColour(175);
        this.appendDummyInput()
            .appendField("Humidity Percentage")
            .appendField(new Blockly.FieldImage("images/humidity_percentage.jpg", 50, 50, "*"))
        this.setOutput(true, 'Number');
    }
};

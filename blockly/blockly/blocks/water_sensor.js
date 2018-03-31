goog.provide('Blockly.Blocks.water_sensor');

goog.require('Blockly.Blocks');

Blockly.Blocks['water_sensor_setup'] = {
    init: function () {
        this.setColour(235);
        this.appendDummyInput()
            .appendField("Setup water sensor")
            .appendField("AnalogWrite PIN#")
            .appendField(new Blockly.FieldImage("images/setup.jpg", 50, 50, "*"))
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");

    }
};

Blockly.Blocks['water_sensor_read_humidity_value'] = {
    init: function () {
        this.setColour(235);
        this.appendDummyInput()
            .appendField("Read Humidity Value:")
            .appendField(new Blockly.FieldImage("images/humidity_value.png", 50, 50, "*"))
        this.setOutput(true, 'Number');
    }
};

Blockly.Blocks['water_sensor_read_percentage_humidity'] = {
    init: function () {
        this.setColour(235);
        this.appendDummyInput()
            .appendField("Read Humidity Percentage:")
            .appendField(new Blockly.FieldImage("images/humidity_percentage.jpg", 50, 50, "*"))
        this.setOutput(true, 'Number');
    }
};

Blockly.Blocks['water_sensor_is_humid'] = {
    init: function () {
        this.setColour(235);
        this.appendDummyInput()
            .appendField("Is Raining?")
            .appendField(new Blockly.FieldImage("images/is_raining.png", 50, 50, "*"))
        this.setOutput(true, 'Boolean');
    }
};




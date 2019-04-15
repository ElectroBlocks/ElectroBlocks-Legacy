
'use strict';

goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.Blocks['soil_sensor_setup'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Setup Soil Sensor");
        this.appendDummyInput()
            .appendField("Analog Pin #")
            .appendField(new Blockly.FieldDropdown(profile.arduino_uno.analog), "PIN");
        this.setColour(150);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['soil_humidity_value'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("What is the humidity?")
            .appendField(new Blockly.FieldImage("images/humidity_value.png", 45, 45, "*"));
        this.setOutput(true, "Number");
        this.setColour(150);
        this.setTooltip("");
        this.setHelpUrl("");

        this.appendDummyInput()
            .appendField('Debug Mode Values')
            .setVisible(false);

        this.appendStatementInput('FRAME_VALUES')
            .setCheck('NUMBER_FRAME')
            .setVisible(false);
    },

    debugModeOn() {
        this.inputList[1].setVisible(true);
        this.inputList[2].setVisible(true);
        this.render();
    },

    debugModeOff() {
        this.inputList[1].setVisible(false);
        this.inputList[2].setVisible(false);
        this.render();
    },

    defaultDebugValue: 30

};

Blockly.Blocks['soil_humidity_percentage'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("What is the soils humidity percentage?")
            .appendField(new Blockly.FieldImage("images/humidity_percentage.jpg", 45, 45, "*"));
        this.setOutput(true, "Number");
        this.setColour(150);
        this.setTooltip("");
        this.setHelpUrl("");

        this.appendDummyInput()
            .appendField('Debug Mode Values')
            .setVisible(false);

        this.appendStatementInput('FRAME_VALUES')
            .setCheck('NUMBER_FRAME')
            .setVisible(false);
    },

    debugModeOn() {
        this.inputList[1].setVisible(true);
        this.inputList[2].setVisible(true);
        this.render();
    },

    debugModeOff() {
        this.inputList[1].setVisible(false);
        this.inputList[2].setVisible(false);
        this.render();
    },

    defaultDebugValue: 30

};

Blockly.Blocks['soil_is_raining'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Is it raining?")
            .appendField(new Blockly.FieldImage("images/is_raining.png", 45, 45, "*"));
        this.setOutput(true, "Boolean");
        this.setColour(150);
        this.setTooltip("");
        this.setHelpUrl("");

        this.appendDummyInput()
            .appendField('Debug Mode Values')
            .setVisible(false);

        this.appendStatementInput('FRAME_VALUES')
            .setCheck('BOOL_FRAME')
            .setVisible(false);
    },

    debugModeOn() {
        this.inputList[1].setVisible(true);
        this.inputList[2].setVisible(true);
        this.render();
    },

    debugModeOff() {
        this.inputList[1].setVisible(false);
        this.inputList[2].setVisible(false);
        this.render();
    },

    defaultDebugValue: false

};

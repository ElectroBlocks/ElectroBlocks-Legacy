/**
 * @fileoverview Colour blocks for Blockly.
 *
 * This file is scraped to extract a .json file of block definitions. The array
 * passed to defineBlocksWithJsonArray(..) must be strict JSON: double quotes
 * only, no outside references, no functions, no trailing commas, etc. The one
 * exception is end-of-line comments, which the scraper will remove.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.inputoutput');  // Deprecated
goog.provide('Blockly.Constants.InputOutput');  // deprecated, 2018 April 5

goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.Constants.InputOutput.HUE = 315;


Blockly.Blocks['is_button_pressed'] = {

    init: function () {
        this.appendDummyInput()
            .appendField("Is button connected to PIN# ")
            .appendField(new Blockly.FieldDropdown(profile.arduino_uno.digital), "PIN")
            .appendField(" pressed?")
            .appendField(new Blockly.FieldImage("images/button.png", 30, 30, "*"));
        this.setOutput(true, "Boolean");
        this.setColour(315);
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

    defaultDebugValue: true
};

Blockly.Blocks['digital_read'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Does PIN# ")
            .appendField(new Blockly.FieldDropdown(profile.arduino_uno.digital), "PIN")
            .appendField(" have electricity?")
            .appendField(new Blockly.FieldImage("images/digital_read.png", 30, 30, "*"));

        this.appendDummyInput()
            .appendField('Debug Mode Values')
            .setVisible(false);

        this.appendStatementInput('FRAME_VALUES')
            .setCheck('BOOL_FRAME')
            .setVisible(false);


        this.setOutput(true, "Boolean");
        this.setColour(315);
        this.setTooltip("");
        this.setHelpUrl("");
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

    defaultDebugValue: true

};

Blockly.Blocks['digital_write'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Turning PIN# ")
            .appendField(new Blockly.FieldDropdown(profile.arduino_uno.digital), "PIN")
            .appendField(" electricity ")
            .appendField(
                new Blockly.FieldDropdown([["ON", "ON"], ["OFF", "OFF"]]), "STATE")
            .appendField(".")
            .appendField(new Blockly.FieldImage("images/digital_write.png", 30, 30, "*"));

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(315);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['analog_read'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Read number from Analog PIN# ")
            .appendField(new Blockly.FieldDropdown(profile.arduino_uno.analog), "PIN")
            .appendField(new Blockly.FieldImage("images/analog-read.png", 30, 30, "*"));
        this.setOutput(true, "Number");
        this.setColour(315);
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

    defaultDebugValue: 32

};


Blockly.Blocks['analog_write'] = {
    init: function () {
        this.appendValueInput("WRITE_VALUE")
            .setCheck("Number")
            .appendField(" Send number");
        this.appendDummyInput()
            .appendField("to Analog PIN#")
            .appendField(new Blockly.FieldDropdown(profile.arduino_uno.digital), "PIN")
            .appendField(new Blockly.FieldImage("images/analog_wave.jpg", 30, 30, "*"));
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(315);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};


Blockly.Blocks['ultra_sonic_sensor_distance'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Ultrasonic Sensor ");
        this.appendDummyInput()
            .appendField("Measure the distance in centimeters (cm).");
        this.appendDummyInput()
            .appendField("TRIG PIN#")
            .appendField(new Blockly.FieldDropdown(profile.arduino_uno.digital), "TRIG")
            .appendField("ECHO PIN#")
            .appendField(new Blockly.FieldDropdown(profile.arduino_uno.digital), "ECHO");
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("images/sonar_wave.png", 250, 150, "*"));
        this.setOutput(true, "Number");
        this.setColour(315);
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
        this.inputList[4].setVisible(true);
        this.inputList[5].setVisible(true);
        this.render();
    },

    debugModeOff() {
        this.inputList[4].setVisible(false);
        this.inputList[5].setVisible(false);
        this.render();
    },

    defaultDebugValue: 10
};

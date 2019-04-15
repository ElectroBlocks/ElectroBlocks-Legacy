'use strict';

goog.provide('Blockly.Blocks.servo');  // Deprecated
goog.provide('Blockly.Constants.Servo');

goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.Blocks['servo_move'] = {
    init: function() {
        this.setColour(190);
        this.appendDummyInput()
            .appendField("Move Servo")
            .appendField(new Blockly.FieldImage("images/servo.jpg", 64, 64))
            .appendField("PIN#")
            .appendField(new Blockly.FieldDropdown(profile.arduino_uno.digital), "PIN")
        this.appendValueInput("DEGREE", 'Number')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Degree (0~180)");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('move between 0~180 degree');
    }
};

Blockly.Blocks['servo_move_adafruit_tico'] = {
    init: function() {
        this.setColour(242);
        this.appendDummyInput()
            .appendField("Servo Use with Neo Pixels")
            .appendField(new Blockly.FieldImage("images/servo.jpg", 64, 64))
            .appendField("PIN#")
            .appendField(new Blockly.FieldDropdown([["9","9"],["10","10"]]), "PIN")
        this.appendValueInput("DEGREE", 'Number')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Degree (0~180)");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('move between 0~180 degree');
    }
};

Blockly.Blocks['servo_read_degrees'] = {
    init: function() {
        this.setColour(190);
        this.appendDummyInput()
            .appendField("Servo ")
            .appendField(new Blockly.FieldImage("images/servo.jpg", 64, 64))
            .appendField("PIN#")
            .appendField(new Blockly.FieldDropdown(profile.arduino_uno.digital), "PIN");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Read Degrees")
        this.setOutput(true, 'Number');
        this.setTooltip('return that degree with the last servo move.');
        this.appendDummyInput()
            .appendField('Debug Mode Values')
            .setVisible(false);

        this.appendStatementInput('FRAME_VALUES')
            .setCheck('NUMBER_FRAME')
            .setVisible(false);
    },

    debugModeOn() {
        this.inputList[2].setVisible(true);
        this.inputList[3].setVisible(true);
        this.render();
    },

    debugModeOff() {
        this.inputList[2].setVisible(false);
        this.inputList[3].setVisible(false);
        this.render();
    },

    defaultDebugValue: 30

};

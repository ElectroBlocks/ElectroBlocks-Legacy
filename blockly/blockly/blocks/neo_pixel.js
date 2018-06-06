'use strict';

goog.provide('Blockly.Blocks.neo_pixel');

goog.require('Blockly.Blocks');


Blockly.Blocks['neo_pixel_setup'] = {
    init: function () {
        this.setColour(230);
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("images/setup.jpg", 50, 50, "*"))
            .appendField("Setup Neo Pixel - AnalogWrite PIN#")
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");

        this.appendValueInput("NUMBER OF LEDS")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Number of leds: ");

        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
    }
};

Blockly.Blocks['neo_pixel_set_pixel_color'] = {
    init: function () {
        this.setColour(230);
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("images/rgblight.jpg", 50, 50, "*"))

        this.appendValueInput("RED")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Red Color Value: ");

        this.appendValueInput("BLUE")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Blue Color Value: ");

        this.appendValueInput("GREEN")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Green Color Value: ");

        this.appendValueInput("PIXEL")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("LED to turn on: ");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);

    }
};
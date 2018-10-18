'use strict';

goog.provide('Blockly.Blocks.neo_pixel');

goog.require('Blockly.Blocks');


Blockly.Blocks['neo_pixel_setup'] = {
    init: function () {
        this.setColour(230);
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("images/setup.jpg", 50, 50, "*"))
            .appendField("Setup Neo Pixel - AnalogWrite PIN#")
            .appendField(new Blockly.FieldDropdown(profile.default.analog), "PIN");

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

        this.appendValueInput("COLOR")
            .setCheck("Colour")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Color: ");

        this.appendValueInput("PIXEL")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("LED (Start At 0): ");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);

    }
};
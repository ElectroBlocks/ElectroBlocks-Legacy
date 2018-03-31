'use strict';

goog.provide('Blockly.Blocks.ir_remote');

goog.require('Blockly.Blocks');


Blockly.Blocks['ir_remote_setup'] = {
    init: function () {
        this.setColour(290);
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("images/setup.jpg", 50, 50, "*"))
            .appendField("Setup IR Remote - AnalogWrite PIN#")
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");

    }
};


Blockly.Blocks['ir_remote_has_reading'] = {
    init: function () {
        this.setColour(290);
        this.appendDummyInput()
            .appendField("Has Reading")
            .appendField(new Blockly.FieldImage("images/sensing.jpg", 50, 50, "*"))
        this.setOutput(true, 'Boolean');
    }
};

Blockly.Blocks['ir_remote_can_read_again'] = {
    init: function () {
        this.setColour(290);
        this.appendDummyInput()
            .appendField("Can Read Again")
            .appendField(new Blockly.FieldImage("images/re_scan.png", 50, 50, "*"))

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks['ir_remote_get_hex'] = {
    init: function () {
        this.setColour(290);
        this.appendDummyInput()
            .appendField("Get Code From Button")
            .appendField(new Blockly.FieldImage("images/ir_sensor.jpg", 50, 50, "*"))
        this.setOutput(true, 'String');
    }
};
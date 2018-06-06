'use strict';

goog.provide('Blockly.Blocks.motor');

goog.require('Blockly.Blocks');


Blockly.Blocks['motor'] = {
    init: function () {

        this.appendDummyInput()
            .appendField("MOTORS")
            .appendField(new Blockly.FieldImage("images/dc-motor.jpg", 50, 50, "*"));

        this.setColour(232);
        this.appendDummyInput()
            .appendField('Direction ')
            .appendField(new Blockly.FieldDropdown([
                    ['Forward', 'FORWARD'],
                    ['Backward', 'BACKWARD']
                ]),
                'direction');

        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                    ['Motor 1', '1'],
                    ['Motor 2', '2']
                ]),
                'motor');

        this.appendValueInput("Speed")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Speed ");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);

    }
};



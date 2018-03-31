'use strict';

goog.provide('Blockly.Blocks.led_matrix');

goog.require('Blockly.Blocks');

Blockly.Blocks['led_matrix_set_column'] = {
    init: function () {

        this.appendDummyInput()
            .appendField('Set columns of leds')
            .appendField(new Blockly.FieldImage("images/column.png", 50, 50, "*"));


        this.appendValueInput("Column Number")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Column Number: ");

        this.appendValueInput("BYTE VALUE")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("BYTE: ");

        this.setColour(220);
        this.setTooltip("Set the row leds.");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks['led_matrix_clear'] = {
    init: function () {

        this.appendDummyInput()
            .appendField('Clear LED Matrix')
            .appendField(new Blockly.FieldImage("http://www.clker.com/cliparts/v/C/F/E/b/p/edit-clear-md.png", 50, 50, "*"));

        this.setColour(220);
        this.setTooltip("Clears the board.");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks['led_matrix_set_row'] = {
    init: function () {

        this.appendDummyInput()
            .appendField('Set row of leds')
            .appendField(new Blockly.FieldImage("images/row.png", 50, 50, "*"));


        this.appendValueInput("Row Number")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Row Number: ");

        this.appendValueInput("BYTE VALUE")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("BYTE: ");

        this.setColour(220);
        this.setTooltip("Set the column leds.");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks['led_matrix_set_led'] = {
    init: function () {

        this.appendDummyInput()
            .appendField('Set row / column of the led')
            .appendField(new Blockly.FieldImage("images/set_one_led_matrix.png", 50, 50, "*"));


        this.setColour(220);
        this.setTooltip("Set the column leds.");


        this.appendValueInput("Column Number")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Column Number: ");

        this.appendValueInput("Row Number")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Row Number: ");

        this.appendDummyInput()
            .appendField('ON / OFF')
            .appendField(new Blockly.FieldCheckbox('TRUE'), 'LIGHT');

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);

    }
};


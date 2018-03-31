'use strict';

goog.provide('Blockly.Blocks.json');

goog.require('Blockly.Blocks');

Blockly.Blocks['json_get_data'] = {
    init: function () {

        this.setColour(145);

        this.appendDummyInput()
            .appendField('Get Data From JSON String')
            .appendField(new Blockly.FieldImage("images/json.png", 50, 50, "*"))
            .appendField('Data Type: ')
            .appendField(new Blockly.FieldDropdown(VARIABLE_TYPES), 'DATA TYPE');

        this.appendValueInput("JSON STRING")
            .setCheck("String")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("JSON String: ");

        this.appendValueInput("KEY")
            .setCheck("String")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Where to get the data ");

        this.setOutput(true, null);
    }
};




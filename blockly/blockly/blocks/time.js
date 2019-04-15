
'use strict';


goog.provide('Blockly.Blocks.time');  // Deprecated
goog.provide('Blockly.Constants.Time');

goog.require('Blockly.Blocks');
goog.require('Blockly');


Blockly.Blocks['time_seconds'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Number of seconds code has been running.")
            .appendField(new Blockly.FieldImage("images/time.png", 45, 45, "*"));
        this.setOutput(true, "Number");
        this.setColour(345);
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

    defaultDebugValue: 3

};

Blockly.defineBlocksWithJsonArray([
    {
        "type": "delay_block",
        "message0": "Wait For  %1   seconds.",
        "args0": [
            {
                "type": "input_value",
                "name": "DELAY",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": 345,
        "tooltip": "",
        "helpUrl": ""
    }
]);


'use strict';

goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.Blocks['temp_setup'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Temperature / Humidity Sensor");
        this.appendDummyInput()
            .appendField("Pin #")
            .appendField(new Blockly.FieldDropdown(profile.arduino_uno.digital), "PIN");
        this.setColour(240);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['temp_get_temp'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Temperature in Celsius.")
            .appendField(new Blockly.FieldImage("images/celsius_temp.jpg", 25, 25, "*"));
        this.setOutput(true, "Number");
        this.setColour(240);
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

Blockly.Blocks['temp_get_humidity'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Humidity Percentage.")
            .appendField(new Blockly.FieldImage("images/humidity_percentage.jpg", 25, 25, "*"));
        this.setOutput(true, "Number");
        this.setColour(240);
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


Blockly.defineBlocksWithJsonArray([
    {
        "type": "temp_read_temp_humidity",
        "message0": "Read Temperature & Humidity %1",
        "args0": [
            {
                "type": "field_image",
                "src": "images/sensing.jpg",
                "width": 25,
                "height": 25,
                "alt": "*"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 240,
        "tooltip": "",
        "helpUrl": ""
    }
]);

'use strict';

goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.Blocks['ir_remote_setup'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Setup IR Remote");
        this.appendDummyInput()
            .appendField("Analog Pin #")
            .appendField(new Blockly.FieldDropdown(profile.arduino_uno.analog), "PIN");
        this.setColour(195);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['ir_remote_has_code_receive'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Is receiving code?")
            .appendField(new Blockly.FieldImage("images/sensing.jpg", 25, 25, "*"));
        this.setOutput(true, "Boolean");
        this.setColour(195);
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

Blockly.Blocks['ir_remote_get_code'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Get code received from IR Remote.")
            .appendField(new Blockly.FieldImage("images/ir_sensor.jpg", 25, 25, "*"));
        this.setOutput(true, "String");
        this.setColour(195);
        this.setTooltip("");
        this.setHelpUrl("");

        this.appendDummyInput()
            .appendField('Debug Mode Values')
            .setVisible(false);

        this.appendStatementInput('FRAME_VALUES')
            .setCheck('STRING_FRAME')
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

    defaultDebugValue: 'ir_code'

};

Blockly.defineBlocksWithJsonArray([
    {
        "type": "ir_remote_scan_again",
        "message0": "Scan Again %1",
        "args0": [
            {
                "type": "field_image",
                "src": "images/re_scan.png",
                "width": 40,
                "height": 40,
                "alt": "*"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 195,
        "tooltip": "",
        "helpUrl": ""
    }
]);

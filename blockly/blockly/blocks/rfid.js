'use strict';

goog.require('Blockly.Blocks');
goog.require('Blockly');


Blockly.Blocks['rfid_scan'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("RFID reader scanned card?")
            .appendField(new Blockly.FieldImage("images/sensing.jpg", 25, 25, "*"));
        this.setOutput(true, "Boolean");
        this.setColour(60);
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

    defaultDebugValue: false
};

Blockly.Blocks['rfid_tag'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("RFID Tag Number")
            .appendField(new Blockly.FieldImage("images/rfid.jpg", 25, 25, "*"));
        this.setOutput(true, "String");
        this.setColour(60);
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

    defaultDebugValue: 'rfid'
};

Blockly.Blocks['rfid_card'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("RFID Tag Card Number")
            .appendField(new Blockly.FieldImage("images/rfid.jpg", 25, 25, "*"));
        this.setOutput(true, "String");
        this.setColour(60);
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

    defaultDebugValue: 'rfid'
};

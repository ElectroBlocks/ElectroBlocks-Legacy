goog.provide('Blockly.Blocks.rfid');

goog.require('Blockly.Blocks');


Blockly.Blocks['rfid_scanned_card'] = {
    init: function () {
        this.setColour(245);
        this.appendDummyInput()
            .appendField("Has RFID Reader Scanned Card?")
            .appendField(new Blockly.FieldImage("images/sensing.jpg", 50, 50, "*"))
        this.setOutput(true, 'Boolean');
    }
};


Blockly.Blocks['rfid_tag_number'] = {
    init: function () {
        this.setColour(245);
        this.appendDummyInput()
            .appendField("RFID Tag Number")
            .appendField(new Blockly.FieldImage("images/rfid.jpg", 50, 50, "*"))
        this.setOutput(true, 'String');
    }
};

Blockly.Blocks['rfid_card_number'] = {
    init: function () {
        this.setColour(245);
        this.appendDummyInput()
            .appendField("RFID Card Number")
            .appendField(new Blockly.FieldImage("images/rfid.jpg", 50, 50, "*"))
        this.setOutput(true, 'String');
    }
};
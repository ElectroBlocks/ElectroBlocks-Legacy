goog.provide('Blockly.Blocks.bluetooth');

goog.require('Blockly.Blocks');


Blockly.Blocks['bluetooth_setup'] = {
    init: function () {

        this.setColour(195);

        this.appendDummyInput()
            .appendField("Setup Bluetooth ")

        this.appendDummyInput()
            .appendField('RX Pin')
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "RX")
            .appendField('TX Pin')
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "TX");

        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
    }
};

Blockly.Blocks['bluetooth_is_available'] = {
    init: function () {
        this.setColour(195);

        this.appendDummyInput()
            .appendField("Bluetooth Have Data? ");

        this.setOutput(true, 'Boolean');
    }
};

Blockly.Blocks['bluetooth_read_until_string'] = {
    init: function () {
        this.setColour(195);

        this.appendValueInput("STRING VALUE")
            .setCheck("String")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Read Until This String");


        this.setOutput(true, 'String');
    }
};

Blockly.Blocks['bluetooth_write'] = {
    init: function () {
        this.setColour(195);

        this.appendValueInput("DATA")
            .setCheck('String')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Bluetooth Send Data: ");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};
goog.provide('Blockly.Blocks.bluetooth');

goog.require('Blockly.Blocks');


Blockly.Blocks['bluetooth_setup'] = {
    init: function () {

        this.setColour(195);

        this.appendDummyInput()
            .appendField("Setup Bluetooth (Must use 9600 baud rate) ")
            .appendField(new Blockly.FieldImage("images/setup.jpg", 50, 50, "*"));

        this.appendValueInput("NAME")
            .setCheck("String")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Name (String Block Only No Variable): ");

        this.appendValueInput("PIN")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("PIN Code (4 digits): ");


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
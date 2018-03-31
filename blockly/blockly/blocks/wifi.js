goog.provide('Blockly.Blocks.wifi');

goog.require('Blockly.Blocks');


Blockly.Blocks['wifi_setup'] = {
    init: function () {
        this.setColour(210);

        this.appendDummyInput()
            .appendField("WIFI SETUP  \n")
            .appendField(new Blockly.FieldImage("images/setup.jpg", 50, 50, "*"))
            .appendField();

        this.appendValueInput("WIFI NAME")
            .setCheck("String")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("WIFI NETWORK NAME:");

        this.appendValueInput("WIFI PASSWORD")
            .setCheck("String")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("WIFI PASSWORD: ");

    }
};

Blockly.Blocks['wifi_request'] = {
    init: function () {
        this.setColour(210);
        this.appendDummyInput()
            .appendField('WEB REQUEST:  ');

        this.appendDummyInput()
            .appendField('HTTP Verb: ')
            .appendField(new Blockly.FieldDropdown([
                ['GET', 'GET'],
                ['POST', 'POST'],
                ['PUT', 'PUT']
            ]), 'HTTP VERB');

        this.appendDummyInput()
            .appendField('Content Type: ')
            .appendField(new Blockly.FieldDropdown([
                ['JSON', 'application/json'],
                ['FORM DATA', 'application/x-www-form-urlencoded']
            ]), 'CONTENT TYPE');

        this.appendValueInput("URL")
            .setCheck("String")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("URL: ");


        this.appendValueInput("REQUEST BODY")
            .setCheck("String")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("DATA FOR PUT & POST ONLY!!!");

        this.setOutput(true, 'String');
    }
};
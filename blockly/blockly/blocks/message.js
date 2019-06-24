goog.provide('Blockly.Blocks.message');  // Deprecated
goog.provide('Blockly.Constants.Message');

goog.require('Blockly.Blocks');
goog.require('Blockly');


Blockly.Blocks['receive_message'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Get Message")
            .appendField(new Blockly.FieldImage("images/mailing.png", 15, 15, "*"));
        this.setOutput(true, "String");
        this.setColour(30);
        this.setTooltip("");
        this.setHelpUrl("");

        this.appendDummyInput()
            .appendField('Fake Input Data')
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

    defaultDebugValue: 'Hello World'
};

Blockly.Blocks['has_message'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Is Arduino receiving a message?")
            .appendField(new Blockly.FieldImage("images/receiving_message.png", 15, 15, "*"));
        this.setOutput(true, "Boolean");
        this.setColour(30);
        this.setTooltip("");
        this.setHelpUrl("");

        this.appendDummyInput()
            .appendField('Fake Input Data')
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

Blockly.defineBlocksWithJsonArray([
    {
        "type": "send_message",
        "message0": "Arduino send message %1 %2",
        "args0": [
            {
                "type": "field_image",
                "src": "images/sent-mail.png",
                "width": 15,
                "height": 15,
                "alt": "*"
            },
            {
                "type": "input_value",
                "name": "MESSAGE",
                "check": "String"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 30,
        "tooltip": "",
        "helpUrl": ""
    }
]);



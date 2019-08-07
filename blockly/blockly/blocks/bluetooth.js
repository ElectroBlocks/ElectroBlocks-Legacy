
'use strict';

goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.Blocks['bluetooth_setup'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Bluetooth Setup");
        this.appendDummyInput()
            .appendField("RX")
            .appendField(new Blockly.FieldDropdown(profile.arduino_uno.digital), "RX")
            .appendField("TX")
            .appendField(new Blockly.FieldDropdown(profile.arduino_uno.digital), "TX");
        this.setColour(300);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.defineBlocksWithJsonArray([
    {
        "type": "bt_receive_message",
        "message0": "Bluetooth get message %1",
        "args0": [
            {
                "type": "field_image",
                "src": "images/mailing.png",
                "width": 15,
                "height": 15,
                "alt": "*"
            }
        ],
        "output": "String",
        "colour": 300,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "bt_has_message",
        "message0": "Bluetooth receiving a message? %1",
        "args0": [
            {
                "type": "field_image",
                "src": "images/receiving_message.png",
                "width": 15,
                "height": 15,
                "alt": "*"
            }
        ],
        "output": "Boolean",
        "colour": 300,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "bt_send_message",
        "message0": "Bluetooth send message %1 %2",
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
        "colour": 300,
        "tooltip": "",
        "helpUrl": ""
    }
]);

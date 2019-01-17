goog.provide('Blockly.Blocks.message');  // Deprecated
goog.provide('Blockly.Constants.Message');

goog.require('Blockly.Blocks');
goog.require('Blockly');


Blockly.defineBlocksWithJsonArray([
    {
        "type": "receive_message",
        "message0": "Arduino get message from computer %1",
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
        "colour": 30,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "has_message",
        "message0": "Is Arduino receiving a message from the computer? %1",
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
        "colour": 30,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "send_message",
        "message0": "Arduino send message to computer %1 %2",
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



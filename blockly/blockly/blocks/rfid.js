'use strict';

goog.require('Blockly.Blocks');
goog.require('Blockly');


Blockly.defineBlocksWithJsonArray([
    {
        "type": "rfid_scan",
        "message0": "RFID reader scanned card? %1",
        "args0": [
            {
                "type": "field_image",
                "src": "images/sensing.jpg",
                "width": 25,
                "height": 25,
                "alt": "*"
            }
        ],
        "output": "Boolean",
        "colour": 60,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "rfid_tag",
        "message0": "RFID Tag Number %1",
        "args0": [
            {
                "type": "field_image",
                "src": "images/rfid.jpg",
                "width": 25,
                "height": 25,
                "alt": "*"
            }
        ],
        "output": "String",
        "colour": 60,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "rfid_card",
        "message0": "RFID Tag Card Number %1",
        "args0": [
            {
                "type": "field_image",
                "src": "images/rfid.jpg",
                "width": 25,
                "height": 25,
                "alt": "*"
            }
        ],
        "output": "String",
        "colour": 60,
        "tooltip": "",
        "helpUrl": ""
    }
]);

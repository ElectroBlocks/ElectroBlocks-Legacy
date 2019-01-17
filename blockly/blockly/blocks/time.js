
'use strict';


goog.provide('Blockly.Blocks.time');  // Deprecated
goog.provide('Blockly.Constants.Time');

goog.require('Blockly.Blocks');
goog.require('Blockly');


Blockly.defineBlocksWithJsonArray([
    {
        "type": "time_seconds",
        "message0": "Number of seconds code has been running. %1",
        "args0": [
            {
                "type": "field_image",
                "src": "images/time.png",
                "width": 50,
                "height": 50,
                "alt": "*"
            }
        ],
        "output": "Number",
        "colour": 345,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "delay_block",
        "message0": "Wait For  %1   seconds.",
        "args0": [
            {
                "type": "input_value",
                "name": "DELAY",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": 345,
        "tooltip": "",
        "helpUrl": ""
    }
]);
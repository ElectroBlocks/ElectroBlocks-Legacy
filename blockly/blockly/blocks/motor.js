
'use strict';

goog.provide('Blockly.Blocks.motor');  // Deprecated
goog.provide('Blockly.Constants.Motor');

goog.require('Blockly.Blocks');
goog.require('Blockly');


Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
    {
        "type": "move_motor",
        "message0": "Move motor %1 %2 Which Motor %3 Direction %4 %5 Motor Speed %6",
        "args0": [
            {
                "type": "field_image",
                "src": "images/dc-motor.jpg",
                "width": 50,
                "height": 50,
                "alt": "*"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "MOTOR",
                "check": "Number",
                "align": "RIGHT"
            },
            {
                "type": "field_dropdown",
                "name": "DIRECTION",
                "options": [
                    [
                        "Forward",
                        "Forward"
                    ],
                    [
                        "Backward",
                        "Backward"
                    ]
                ]
            },
            {
                "type": "input_dummy",
                "align": "RIGHT"
            },
            {
                "type": "input_value",
                "name": "SPEED",
                "check": "Number",
                "align": "RIGHT"
            }
        ],
        "inputsInline": false,
        "previousStatement": null,
        "nextStatement": null,
        "colour": 15,
        "tooltip": "",
        "helpUrl": ""
    }
]);

'use strict';

goog.require('Blockly.Blocks');
goog.require('Blockly');



Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
    {
        "type": "lcd_setup",
        "lastDummyAlign0": "RIGHT",
        "message0": "LCD Screen => setup lcd screen %1 Memory Type %2 %3 Size %4",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "field_dropdown",
                "name": "MEMORY_TYPE",
                "options": [
                    [
                        "0x3F",
                        "0x3F"
                    ],
                    [
                        "0x27",
                        "0x27"
                    ]
                ]
            },
            {
                "type": "input_dummy",
                "align": "RIGHT"
            },
            {
                "type": "field_dropdown",
                "name": "SIZE",
                "options": [
                    [
                        "16 x 2",
                        "16 x 2"
                    ],
                    [
                        "20 x 4",
                        "20 x 4"
                    ]
                ]
            }
        ],
        "inputsInline": false,
        "colour": 285,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "lcd_screen_simple_print",
        "message0": "LCD Screen => Print  ->  Delay ->  Clear %1 Print on Row 1 %2 Print on Row 2 %3 Print on Row 3 %4 Print on Row 4 %5 Delay in milliseconds before clearing screen %6",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "ROW_1",
                "check": "String",
                "align": "RIGHT"
            },
            {
                "type": "input_value",
                "name": "ROW_2",
                "check": "String",
                "align": "RIGHT"
            },
            {
                "type": "input_value",
                "name": "ROW_3",
                "check": "String",
                "align": "RIGHT"
            },
            {
                "type": "input_value",
                "name": "ROW_4",
                "check": "String",
                "align": "RIGHT"
            },
            {
                "type": "input_value",
                "name": "DELAY",
                "check": "Number",
                "align": "RIGHT"
            }
        ],
        "inputsInline": false,
        "previousStatement": null,
        "nextStatement": null,
        "colour": 285,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "lcd_backlight",
        "lastDummyAlign0": "RIGHT",
        "message0": "LCD Screen =>  Backlight %1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "BACKLIGHT",
                "options": [
                    [
                        "ON",
                        "ON"
                    ],
                    [
                        "OFF",
                        "OFF"
                    ]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 285,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "lcd_scroll",
        "message0": "LCD Screen => Scroll %1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "DIR",
                "options": [
                    [
                        "RIGHT",
                        "RIGHT"
                    ],
                    [
                        "LEFT",
                        "LEFT"
                    ]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 285,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "lcd_screen_clear",
        "message0": "LCD Screen => Clear %1",
        "args0": [
            {
                "type": "field_image",
                "src": "http://www.clker.com/cliparts/v/C/F/E/b/p/edit-clear-md.png",
                "width": 30,
                "height": 30,
                "alt": "*"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 285,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "lcd_screen_print",
        "message0": "LCD Screen => Print  %1 %2 Row %3 Column %4 Message %5",
        "args0": [
            {
                "type": "field_image",
                "src": "http://images.clipartpanda.com/print-clipart-xcgoE9ddi.jpeg",
                "width": 40,
                "height": 40,
                "alt": "*"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "ROW",
                "check": "Number",
                "align": "RIGHT"
            },
            {
                "type": "input_value",
                "name": "COLUMN",
                "check": "Number",
                "align": "RIGHT"
            },
            {
                "type": "input_value",
                "name": "PRINT",
                "check": "String",
                "align": "RIGHT"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 285,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "lcd_screen_blink",
        "message0": "LCD Screen => Blink %1 %2 %3 ROW %4 COLUMN %5",
        "args0": [
            {
                "type": "field_image",
                "src": "images/blink.png",
                "width": 30,
                "height": 30,
                "alt": "*"
            },
            {
                "type": "field_dropdown",
                "name": "NAME",
                "options": [
                    [
                        "BLINK",
                        "BLINK"
                    ],
                    [
                        "OFF",
                        "OFF"
                    ]
                ]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "ROW",
                "check": "Number",
                "align": "RIGHT"
            },
            {
                "type": "input_value",
                "name": "COLUMN",
                "check": "Number",
                "align": "RIGHT"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 285,
        "tooltip": "",
        "helpUrl": ""
    }
]);

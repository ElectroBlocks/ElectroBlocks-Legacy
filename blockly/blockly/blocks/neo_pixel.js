
'use strict';

goog.provide('Blockly.Blocks.neo_pixel');  // Deprecated
goog.provide('Blockly.Constants.NeoPixel');

goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.Blocks['neo_pixel_setup'] = {
    init: function() {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Neo Pixel Setup");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Analog Data Pin#")
            .appendField(new Blockly.FieldDropdown(profile.arduino_uno.analog), "PIN");
        this.appendValueInput("NUMBER_LEDS")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Number of LEDS");
        this.setInputsInline(false);
        this.setColour(0);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};


Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
    {
        "type": "neo_pixel_set_color",
        "message0": "Set NeoPixel Color %1 %2 %3 Which Led? %4 What Color %5",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "field_image",
                "src": "images/rgblight.jpg",
                "width": 50,
                "height": 50,
                "alt": "*"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "POSITION",
                "check": "Number",
                "align": "RIGHT"
            },
            {
                "type": "input_value",
                "name": "COLOR",
                "check": "Colour",
                "align": "RIGHT"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 0,
        "tooltip": "",
        "helpUrl": ""
    }

]);
'use strict';

goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.Blocks['ir_remote_setup'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Setup Soil Sensor");
        this.appendDummyInput()
            .appendField("Analog Pin #")
            .appendField(new Blockly.FieldDropdown(profile.arduino_uno.analog), "PIN");
        this.setColour(195);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.defineBlocksWithJsonArray([
    {
        "type": "ir_remote_has_code_receive",
        "message0": "Is receiving code? %1",
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
        "colour": 195,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "ir_remote_get_code",
        "message0": "Get last code received from IR Remote. %1",
        "args0": [
            {
                "type": "field_image",
                "src": "images/ir_sensor.jpg",
                "width": 25,
                "height": 25,
                "alt": "*"
            }
        ],
        "output": "String",
        "colour": 195,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "ir_remote_scan_again",
        "message0": "Scan Again %1",
        "args0": [
            {
                "type": "field_image",
                "src": "images/re_scan.png",
                "width": 40,
                "height": 40,
                "alt": "*"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 195,
        "tooltip": "",
        "helpUrl": ""
    }
]);

'use strict';

goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.Blocks['temp_setup'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Temperature / Humidity Sensor");
        this.appendDummyInput()
            .appendField("Pin #")
            .appendField(new Blockly.FieldDropdown(profile.arduino_uno.digital), "PIN");
        this.setColour(240);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.defineBlocksWithJsonArray([
    {
        "type": "temp_read_temp_humidity",
        "message0": "Read Temperature & Humidity %1",
        "args0": [
            {
                "type": "field_image",
                "src": "images/sensing.jpg",
                "width": 25,
                "height": 25,
                "alt": "*"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 240,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "temp_get_temp",
        "message0": "Temperature in Celsius. %1",
        "args0": [
            {
                "type": "field_image",
                "src": "images/celsius_temp.jpg",
                "width": 25,
                "height": 25,
                "alt": "*"
            }
        ],
        "output": "Number",
        "colour": 240,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "temp_get_humidity",
        "message0": "Humidity Percentage. %1",
        "args0": [
            {
                "type": "field_image",
                "src": "images/humidity_percentage.jpg",
                "width": 25,
                "height": 25,
                "alt": "*"
            }
        ],
        "output": "Number",
        "colour": 240,
        "tooltip": "",
        "helpUrl": ""
    }
]);
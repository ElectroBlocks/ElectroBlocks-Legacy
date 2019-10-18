
'use strict';

goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.Blocks['soil_sensor_setup'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Setup Soil Sensor");
        this.appendDummyInput()
            .appendField("Analog Pin #")
            .appendField(new Blockly.FieldDropdown(profile.arduino_uno.analog), "PIN");
        this.setColour(150);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.defineBlocksWithJsonArray([
    {
        "type": "soil_humidity_percentage",
        "message0": "What is the soils humidity percentage? %1",
        "args0": [
            {
                "type": "field_image",
                "src": "images/humidity_percentage.jpg",
                "width": 45,
                "height": 45,
                "alt": "*"
            }
        ],
        "output": "Number",
        "colour": 150,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "soil_humidity_value",
        "message0": "What is the soils humidity? %1",
        "args0": [
            {
                "type": "field_image",
                "src": "images/humidity_value.png",
                "width": 45,
                "height": 45,
                "alt": "*"
            }
        ],
        "output": "Number",
        "colour": 150,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "soil_is_raining",
        "message0": "Is it raining? %1",
        "args0": [
            {
                "type": "field_image",
                "src": "images/is_raining.png",
                "width": 45,
                "height": 45,
                "alt": "*"
            }
        ],
        "output": "Boolean",
        "colour": 150,
        "tooltip": "",
        "helpUrl": ""
    }
]);
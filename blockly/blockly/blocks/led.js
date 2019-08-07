'use strict';

Blockly.Blocks['led_switch'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Led")
            .appendField(new Blockly.FieldDropdown(profile.arduino_uno.digital), "PIN")
            .appendField("turn")
            .appendField(new Blockly.FieldDropdown([["ON","ON"], ["OFF","OFF"]]), "STATE")
            .appendField(new Blockly.FieldImage("https://www.gstatic.com/codesite/ph/images/star_on.gif", 15, 15, "*"));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(300);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['led_switch'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Led")
            .appendField(new Blockly.FieldDropdown(profile.arduino_uno.digital), "PIN")
            .appendField("turn")
            .appendField(new Blockly.FieldDropdown([["ON","ON"], ["OFF","OFF"]]), "STATE")
            .appendField(new Blockly.FieldImage("images/blocks/led/led_switch.png", 15, 15, "*"));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(300);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['led_fade'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Fade led")
            .appendField(new Blockly.FieldDropdown(profile.arduino_uno.pwm), "PIN")
            .appendField(new Blockly.FieldImage("images/blocks/led/led_fade.png", 15, 15, "*"));
        this.appendValueInput("FADE")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Light Intensity");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(300);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['setup_led_color'] = {
    init: function() {

        this.appendDummyInput()
            .appendField("Setup Led Color")
            .appendField(new Blockly.FieldImage("images/blocks/led/setup_led_color.png", 15, 15, "*"));

        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Picture Type: ")
            .appendField(new Blockly.FieldDropdown([
                ["Breadboard","BREADBOARD"],
                ["Built In","BUILT_IN"]
            ]), "PICTURE_TYPE");

        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Red Green Blue Wires: ")
            .appendField(new Blockly.FieldDropdown([
                ["6 - 5 - 3"   , "6-5-3"],
                ["11 - 10 - 9" , "11-10-9"]
            ]), "WIRE");

        this.setColour(300);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['set_color_led'] = {
    init: function() {


        this.appendValueInput("COLOUR")
            .setCheck("Colour")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Set Color Led")
            .appendField(new Blockly.FieldImage("images/blocks/led/set_color_led.png", 15, 15, "*"));

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(300);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

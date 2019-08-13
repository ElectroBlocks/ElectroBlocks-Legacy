
'use strict';

goog.require('Blockly.Blocks');
goog.require('Blockly');


Blockly.Blocks['lcd_screen_clear'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("images/blocks/lcd/lcd.png", 64, 50, "*"))
            .appendField("Clear Screen");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(285);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['lcd_screen_print'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("images/blocks/lcd/lcd.png", 64, 50, "*"))
            .appendField("Print");
        this.appendValueInput("ROW")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Row");
        this.appendValueInput("COLUMN")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Column");
        this.appendValueInput("PRINT")
            .setCheck("String")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Message");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(285);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['lcd_backlight'] = {
    init: function() {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldImage("images/blocks/lcd/lcd.png", 64, 40, "*"))
            .appendField("back light")
            .appendField(new Blockly.FieldDropdown([["ON","ON"], ["OFF","OFF"]]), "BACKLIGHT");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(285);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['lcd_screen_simple_print'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("images/blocks/lcd/lcd.png", 64, 50, "*"))
            .appendField("Print  ->  Delay ->  Clear");
        this.appendValueInput("ROW_1")
            .setCheck("String")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Print on Row 1");
        this.appendValueInput("ROW_2")
            .setCheck("String")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Print on Row 2");
        this.appendValueInput("ROW_3")
            .setCheck("String")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Print on Row 3");
        this.appendValueInput("ROW_4")
            .setCheck("String")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Print on Row 4");
        this.appendValueInput("DELAY")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Delay in milliseconds");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(285);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['lcd_setup'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("images/blocks/lcd/lcd.png", 64, 50, "*"))
            .appendField("Setup");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Memory Type")
            .appendField(new Blockly.FieldDropdown([["0x3F","0x3F"], ["0x27","0x27"]]), "MEMORY_TYPE");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Size")
            .appendField(new Blockly.FieldDropdown([["16 x 2","16 x 2"], ["20 x 4","20 x 4"]]), "SIZE");
        this.setInputsInline(false);
        this.setColour(285);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['lcd_scroll'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("images/blocks/lcd/lcd.png", 64, 50, "*"))
            .appendField("move everything 1 space")
            .appendField(new Blockly.FieldDropdown([["RIGHT","RIGHT"], ["LEFT","LEFT"]]), "DIR");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(285);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['lcd_screen_blink'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("images/blocks/lcd/lcd.png", 64, 50, "*"))
            .appendField(new Blockly.FieldDropdown([["Blink","BLINK"], ["No Blink","OFF"]]), "NAME")
            .appendField("one space");
        this.appendValueInput("COLUMN")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("ROW");
        this.appendValueInput("ROW")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("COLUMN");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(285);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

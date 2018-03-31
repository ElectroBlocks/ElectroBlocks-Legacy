'use strict';

goog.provide('Blockly.Blocks.liquid_crystal');

goog.require('Blockly.Blocks');


Blockly.Blocks['liquid_crystal_ic2_lcd_setup'] = {
    init: function () {

        this.appendDummyInput()
            .appendField("SETUP LCD Screen | ")
            .appendField("A4 -> SDA, A5 -> SCL ")
            .appendField(new Blockly.FieldImage("images/setup.jpg", 100, 100, "*"))
            .appendField('Memory Address / LCD Type')
            .appendField(new Blockly.FieldDropdown([
                    ['0x27', '0x27'],
                    ['0x3F', '0x3F']
                ]),
                'memory address lcd type');

        this.appendValueInput("Number of Rows")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("The number of rows.");

        this.appendValueInput("Number of Columns")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("The number of columns.");

        this.setColour(210);
        this.setTooltip("Setups the type of lcd screen, required :).");

        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
    }
};

Blockly.Blocks['liquid_crystal_ic2_lcd'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Simple LCD  \n")
            .appendField(new Blockly.FieldImage("https://images-na.ssl-images-amazon.com/images/I/51YdOkZkUuL.jpg", 100, 100, "*"));

        this.appendValueInput("Row 1")
            .setCheck("String")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Row One Text.");

        this.appendValueInput("Row 2")
            .setCheck("String")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Row Two Text.");

        this.appendValueInput("Row 3")
            .setCheck("String")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Row Three Text.");

        this.appendValueInput("Row 4")
            .setCheck("String")
            .setCheck()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Row Four Text.");


        this.appendValueInput("Delay Time")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("The number of milli seconds you want to delay.");


        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(210);
        this.setTooltip("Print Something to the lcd Screen.");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['liquid_crystal_ic2_lcd_backlight'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Big LCD - Back Light \n")
            .appendField(new Blockly.FieldImage("http://www.clker.com/cliparts/s/S/N/B/a/C/lightbulb-md.png", 50, 50, "*"));

        this.appendDummyInput()
            .appendField('Back Light ')
            .appendField(new Blockly.FieldDropdown([
                    ['On', 'ON'],
                    ['Off', 'OFF']
                ]),
                'backlight');
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(210);
        this.setTooltip("Turn on or off back light.");
        this.setHelpUrl("");
    }
};


Blockly.Blocks['liquid_crystal_ic2_lcd_clear'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Big LCD - Clear \n")
            .appendField(new Blockly.FieldImage("http://www.clker.com/cliparts/v/C/F/E/b/p/edit-clear-md.png", 50, 50, "*"));


        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(210);
        this.setTooltip("Clears everything off the screen.");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['liquid_crystal_ic2_lcd_set_cursor'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Big LCD - Set Position \n")
            .appendField(new Blockly.FieldImage("https://image.freepik.com/free-icon/move-action_318-30780.jpg", 50, 50, "*"));


        this.appendValueInput("Row")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("The row you want to print on.");

        this.appendValueInput("Column")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("The column you want to print on.");


        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(210);
        this.setTooltip("Moves the position to print the text.");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['liquid_crystal_ic2_lcd_print'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Big LCD - Print  \n")
            .appendField(new Blockly.FieldImage("http://images.clipartpanda.com/print-clipart-xcgoE9ddi.jpeg", 50, 50, "*"));


        this.appendValueInput("Print Message")
            .setCheck("String")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("What you want to say:");



        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(210);
        this.setTooltip("prints something onto the screen.");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['liquid_crystal_ic2_lcd_blink'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Big LCD - Blink \n")
            .appendField(new Blockly.FieldImage("images/blink.png", 50, 50, "*"));

        this.appendDummyInput()
            .appendField('Blink ')
            .appendField(new Blockly.FieldDropdown([
                    ['Yes', 'YES'],
                    ['No', 'NO']
                ]),
                'blink');
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(210);
        this.setTooltip("Blinks the place where the cursor is.");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['liquid_crystal_ic2_lcd_scroll_right'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Big LCD - Scroll Right \n")
            .appendField(new Blockly.FieldImage("images/scroll-right.jpg", 50, 50, "*"));

        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(210);
        this.setTooltip("Blinks the place where the cursor is.");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['liquid_crystal_ic2_lcd_scroll_left'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Big LCD - Scroll Left \n")
            .appendField(new Blockly.FieldImage("images/scroll-left.jpg", 50, 50, "*"));

        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(210);
        this.setTooltip("Blinks the place where the cursor is.");
        this.setHelpUrl("");
    }
};



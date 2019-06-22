
'use strict';

goog.provide('Blockly.Blocks.debug');  // Deprecated
goog.provide('Blockly.Constants.Debug');  // deprecated, 2018 April 5

goog.require('Blockly.Blocks');
goog.require('Blockly');


Blockly.Blocks['debug'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Debug \n")
            .appendField(new Blockly.FieldImage("images/debug.jpg", 100, 100, "*"));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(330);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};


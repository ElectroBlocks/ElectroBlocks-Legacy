
'use strict';

goog.provide('Blockly.Blocks.debug');

goog.require('Blockly.Blocks');

Blockly.Blocks['debug'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Debug Block \n")
            .appendField(new Blockly.FieldImage("http://www.publicdomainpictures.net/pictures/40000/velka/lady-bug-clip-art.jpg", 100, 100,"*"));


        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(210);
        this.setTooltip("Stop program and print all variables.");

    }
};

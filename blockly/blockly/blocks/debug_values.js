goog.require('Blockly.Blocks');
goog.require('Blockly');



Blockly.Blocks['debug_boolean'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("True / False Value")
            .appendField(new Blockly.FieldDropdown([["true","TRUE"], ["false","FALSE"]]), "FRAME_VALUE");
        this.setPreviousStatement(true, "BOOL_FRAME");
        this.setNextStatement(true, "BOOL_FRAME");
        this.setColour(330);
        this.setTooltip("");
        this.setHelpUrl("");
    },

    getFrameValue() {
        return this.getFieldValue('FRAME_VALUE') === 'TRUE';
    }
};

Blockly.Blocks['debug_text'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Text Value")
            .appendField(new Blockly.FieldTextInput("Say Something :)"), "FRAME_VALUE");
        this.setPreviousStatement(true, "TEXT_FRAME");
        this.setNextStatement(true, "TEXT_FRAME");
        this.setColour(330);
        this.setTooltip("");
        this.setHelpUrl("");
    },

    getFrameValue() {
        return this.getFieldValue('FRAME_VALUE');
    }
};



Blockly.Blocks['debug_number'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Number Value")
            .appendField(new Blockly.FieldNumber(0, 0), "FRAME_VALUE");
        this.setPreviousStatement(true, "NUMBER_FRAME");
        this.setNextStatement(true, "NUMBER_FRAME");
        this.setColour(330);
        this.setTooltip("");
        this.setHelpUrl("");
    },

    getFrameValue() {
        return this.getFieldValue('FRAME_VALUE');
    }
};


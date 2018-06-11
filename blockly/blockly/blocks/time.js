goog.provide('Blockly.Blocks.time');

goog.require('Blockly.Blocks');


Blockly.Blocks['time_millis'] = {
    init: function () {
        this.setColour(345);
        this.appendDummyInput()
            .appendField("millis")
            .appendField(new Blockly.FieldImage("images/time.png", 50, 50, "*"))
        this.setOutput(true, 'Number');
    }
};
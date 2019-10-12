import * as  Blockly  from 'blockly/core';
import { Block } from 'blockly';


Blockly.Arduino['arduino_start'] = function(block: Block) {
    var statementsSetup = Blockly.Arduino.statementToCode(block, 'setup');
    var statementsLoop = Blockly.Arduino.statementToCode(block, 'loop');

    var preSetupCode = '';

    for (var key in Blockly.Arduino.setupCode_) {
        preSetupCode += Blockly.Arduino.setupCode_[key] || '';
    }

    return '\n\n\nvoid setup() { \n' +
            preSetupCode +
            statementsSetup + '\n' +
        '}\n\n\nvoid loop() { \n' +
        statementsLoop + '\n' + 
        '}';
    
};
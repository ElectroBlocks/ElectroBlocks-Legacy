import * as Blockly from 'blockly/core';
import { Block } from 'blockly';

Blockly.Arduino['arduino_start'] = function(block: Block) {
  const statementsSetup = Blockly.Arduino.statementToCode(block, 'setup');
  const statementsLoop = Blockly.Arduino.statementToCode(block, 'loop');

  let preSetupCode = '';

  for (const key in Blockly.Arduino.setupCode_) {
    preSetupCode += Blockly.Arduino.setupCode_[key] || '';
  }

  return (
    '\nvoid setup() { \n' +
    preSetupCode +
    statementsSetup +
    '\n' +
    '}\n\n\nvoid loop() { \n' +
    statementsLoop +
    '\n' +
    '\tbluetoothMessageDEV = ""; \n' +
    '\tserialMessageDEV= ""; \n' +
    '}'
  );
};

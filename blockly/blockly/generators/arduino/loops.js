/**
 * Created by noahglaser on 1/10/19.
 */


Blockly.Arduino['controls_repeat_ext'] = function(block) {
    // Repeat n times.

    var repeats = Blockly.Arduino.valueToCode(block, 'TIMES',
                Blockly.Arduino.ORDER_ASSIGNMENT) || '0';

    var branch = Blockly.Arduino.statementToCode(block, 'DO');
    branch = Blockly.Arduino.addLoopTrap(branch, block.id);
    var code = '';
    var loopVar = Blockly.Arduino.variableDB_.getDistinctName(
        'loop_index', Blockly.Variables.NAME_TYPE);
    Blockly.Arduino.variablesInitCode_ += '\ndouble ' + loopVar + ' = 0;\n';
    code += 'for (' + loopVar + ' = 0; ' + loopVar + ' <= ' + repeats + '; ' +
        loopVar + ' += 1) {\n' +
        branch + '}\n';

    return code;
};

Blockly.Arduino['controls_for'] = function (block) {
    var loopIndexVariable =
        Blockly.mainWorkspace.getVariableById(block.getFieldValue('VAR')).name;

    var branch = Blockly.Arduino.statementToCode(block, 'DO');

    var startNumber = Blockly.Arduino.valueToCode(block, 'FROM',
            Blockly.Arduino.ORDER_ASSIGNMENT) || '0';


    var toNumber = Blockly.Arduino.valueToCode(block, 'TO',
            Blockly.Arduino.ORDER_ASSIGNMENT) || '0';

    var byNumber = Math.abs(parseInt(Blockly.Arduino.valueToCode(block, 'TO',
            Blockly.Arduino.ORDER_ASSIGNMENT)));

    byNumber = byNumber == 0 ? 1 : byNumber;

    var addingSub = startNumber < toNumber ? ' +' : ' -';
    var sign = startNumber < toNumber ? ' <= ' : ' >= ';

    return 'for (' + loopIndexVariable + ' = ' + startNumber + '; ' +
            loopIndexVariable + sign + toNumber + '; '
        + loopIndexVariable + addingSub + '= ' + byNumber + ') {\n' + branch + '}\n';


};

Blockly.Arduino['controls_whileUntil'] = function(block) {
    // Do while/until loop.
    var until = block.getFieldValue('MODE') == 'UNTIL';
    var argument0 = Blockly.Arduino.valueToCode(block, 'BOOL', Blockly.Arduino.ORDER_LOGICAL_AND) || 'false';
    var branch = Blockly.Arduino.statementToCode(block, 'DO');
    branch = Blockly.Arduino.addLoopTrap(branch, block.id);
    if (until) {
        argument0 = '!' + argument0;
    }
    return '\twhile (' + argument0 + ') {\n' + branch + '\t}\n';
};

Blockly.Arduino['controls_flow_statements'] = function(block) {
    // Flow statements: continue, break.
    switch (block.getFieldValue('FLOW')) {
        case 'BREAK':
            return 'break;\n';
        case 'CONTINUE':
            return 'continue;\n';
    }
    throw Error('Unknown flow statement.');
};
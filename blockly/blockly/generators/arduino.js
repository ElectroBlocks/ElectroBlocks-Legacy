'use strict';

goog.provide('Blockly.Arduino');

goog.require('Blockly.Generator');


/**
 * Arduino code generator.
 * @type !Blockly.Generator
 */
Blockly.Arduino = new Blockly.Generator('Arduino');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Blockly.Arduino.addReservedWords(
    // http://arduino.cc/en/Reference/HomePage
    'setup,loop,if,else,for,switch,case,while,' +
    'do,break,continue,return,goto,define,include,' +
    'HIGH,LOW,INPUT,OUTPUT,INPUT_PULLUP,true,false,' +
    'interger, constants,floating,point,void,bookean,char,' +
    'unsigned,byte,int,word,long,float,double,string,String,array,' +
    'static, volatile,const,sizeof,pinMode,digitalWrite,digitalRead,' +
    'analogReference,analogRead,analogWrite,tone,noTone,shiftOut,shitIn,' +
    'pulseIn,millis,micros,delay,delayMicroseconds,min,max,abs,constrain,' +
    'map,pow,sqrt,sin,cos,tan,randomSeed,random,lowByte,highByte,bitRead,' +
    'bitWrite,bitSet,bitClear,ultraSonicDistance,parseDouble,setNeoPixelColor,' +
    'bit,attachInterrupt,detachInterrupt,interrupts,noInterrupts','short','isBtnPressed'
);

/**
 * Order of operation ENUMs.
 *
 */
Blockly.Arduino.ORDER_ATOMIC = 0;         // 0 "" ...
Blockly.Arduino.ORDER_UNARY_POSTFIX = 1;  // expr++ expr-- () [] .
Blockly.Arduino.ORDER_UNARY_PREFIX = 2;   // -expr !expr ~expr ++expr --expr
Blockly.Arduino.ORDER_MULTIPLICATIVE = 3; // * / % ~/
Blockly.Arduino.ORDER_ADDITIVE = 4;       // + -
Blockly.Arduino.ORDER_LOGICAL_NOT = 4.4;  // !
Blockly.Arduino.ORDER_SHIFT = 5;          // << >>
Blockly.Arduino.ORDER_MODULUS = 5.3;        // %
Blockly.Arduino.ORDER_RELATIONAL = 6;     // is is! >= > <= <
Blockly.Arduino.ORDER_EQUALITY = 7;       // == != === !==
Blockly.Arduino.ORDER_BITWISE_AND = 8;    // &
Blockly.Arduino.ORDER_BITWISE_XOR = 9;    // ^
Blockly.Arduino.ORDER_BITWISE_OR = 10;    // |
Blockly.Arduino.ORDER_LOGICAL_AND = 11;   // &&
Blockly.Arduino.ORDER_LOGICAL_OR = 12;    // ||
Blockly.Arduino.ORDER_CONDITIONAL = 13;   // expr ? expr : expr
Blockly.Arduino.ORDER_ASSIGNMENT = 14;    // = *= /= ~/= %= += -= <<= >>= &= ^= |=
Blockly.Arduino.ORDER_COMMA = 18;      // ,
Blockly.Arduino.ORDER_NONE = 99;          // (...)


/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 */
Blockly.Arduino.init = function(workspace) {
    // Create a dictionary of definitions to be printed before the code.
    Blockly.Arduino.libraries_ = Object.create(null);

    // creates a list of code to be setup before the setup block
    Blockly.Arduino.setupCode_ = Object.create(null);


    // Create a dictionary mapping desired function names in definitions_
    // to actual function names (to avoid collisions with user functions).
    Blockly.Arduino.functionNames_ = Object.create(null);

    Blockly.Arduino.variablesInitCode_ = '';

    if (!Blockly.Arduino.variableDB_) {
        Blockly.Arduino.variableDB_ =
            new Blockly.Names(Blockly.Arduino.RESERVED_WORDS_);
    } else {
        Blockly.Arduino.variableDB_.reset();
    }

    Blockly.Arduino.variableDB_.setVariableMap(workspace.getVariableMap());

    // We don't have developer variables for now
    // // Add developer variables (not created or named by the user).
    // var devVarList = Blockly.Variables.allDeveloperVariables(workspace);
    // for (var i = 0; i < devVarList.length; i++) {
    //     defvars.push(Blockly.Arduino.variableDB_.getName(devVarList[i],
    //         Blockly.Names.DEVELOPER_VARIABLE_TYPE));
    // }


    var doubleVariables = workspace.getVariablesOfType('Number');
    var i = 0;
    var variableCode = '';
    for (i = 0; i < doubleVariables.length; i += 1) {
        variableCode += 'double ' + Blockly.Arduino.variableDB_.getName(doubleVariables[i].getId(), Blockly.Variables.NAME_TYPE) + ' = 0; \n\n';
    }

    var stringVariables = workspace.getVariablesOfType('String');
    for (i = 0; i < stringVariables.length; i += 1) {
        variableCode += 'String ' + Blockly.Arduino.variableDB_.getName(stringVariables[i].getId(), Blockly.Variables.NAME_TYPE) + ' = ""; \n\n';
    }

    var booleanVariables = workspace.getVariablesOfType('Boolean');
    for (i = 0; i < booleanVariables.length; i += 1) {
        variableCode += 'boolean ' + Blockly.Arduino.variableDB_.getName(booleanVariables[i].getId(), Blockly.Variables.NAME_TYPE) + ' = false; \n\n';
    }

    var colourVariables = workspace.getVariablesOfType('Colour');
    for (i = 0; i < colourVariables.length; i += 1) {
        variableCode += 'RGB ' + Blockly.Arduino.variableDB_.getName(colourVariables[i].getId(), Blockly.Variables.NAME_TYPE) + ' = {0, 0, 0}; \n\n';
    }

    Blockly.Arduino.variablesInitCode_ = variableCode;
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.Arduino.finish = function(code) {

    var libraryCode = '';
    var functionsCode = '';

    for (var key in Blockly.Arduino.libraries_) {
        libraryCode += Blockly.Arduino.libraries_[key] + '\n';
    }

    for (var key in Blockly.Arduino.functionNames_) {
        functionsCode += Blockly.Arduino.functionNames_[key] + '\n';
    }

    // Convert the definitions dictionary into a list.
    code = libraryCode + '\n' +
            'int simple_loop_variable = 0; \n' +
            'struct RGB { \n' +
        '\tint red;\n' +
        '\tint green;\n' +
        '\tint blue;\n' +
        '};\n' + Blockly.Arduino.variablesInitCode_ + '\n\n' +
        '\n' + functionsCode + '\n' + code;

    // Clean up temporary data.
    delete Blockly.Arduino.definitions_;
    delete Blockly.Arduino.functionNames_;
    delete Blockly.Arduino.variablesInitCode_;
    delete Blockly.Arduino.libraries_;
    Blockly.Arduino.variableDB_.reset();

    return code;
};


/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.  A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.Arduino.scrubNakedValue = function(line) {
    return line + ';\n';
};

/**
 * Encode a string as a properly escaped Arduino string, complete with
 * quotes.
 * @param {string} string Text to encode.
 * @return {string} Arduino string.
 * @private
 */
Blockly.Arduino.quote_ = function(string) {
    // Can't use goog.string.quote since Google's style guide recommends
    // JS string literals use single quotes.
    string = string.replace(/\\/g, '\\\\')
        .replace(/\n/g, '\\\n')
        .replace(/'/g, '\\\'');
    return '"' + string + '"';
};


/**
 * Common tasks for generating Arduino from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The Arduino code created for this block.
 * @return {string} Arduino code with comments and subsequent blocks added.
 * @private
 */
Blockly.Arduino.scrub_ = function(block, code) {
    var commentCode = '';
    // Only collect comments for blocks that aren't inline.
    if (!block.outputConnection || !block.outputConnection.targetConnection) {
        // Collect comment for this block.
        var comment = block.getCommentText();
        comment = Blockly.utils.wrap(comment, Blockly.Arduino.COMMENT_WRAP - 3);
        if (comment) {
            if (block.getProcedureDef) {
                // Use a comment block for function comments.
                commentCode += '/**\n' +
                    Blockly.Arduino.prefixLines(comment + '\n', ' * ') +
                    ' */\n';
            } else {
                commentCode += Blockly.Arduino.prefixLines(comment + '\n', '// ');
            }
        }
        // Collect comments for all value arguments.
        // Don't collect comments for nested statements.
        for (var i = 0; i < block.inputList.length; i++) {
            if (block.inputList[i].type == Blockly.INPUT_VALUE) {
                var childBlock = block.inputList[i].connection.targetBlock();
                if (childBlock) {
                    var comment = Blockly.Arduino.allNestedComments(childBlock);
                    if (comment) {
                        commentCode += Blockly.Arduino.prefixLines(comment, '// ');
                    }
                }
            }
        }
    }
    var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    var nextCode = Blockly.Arduino.blockToCode(nextBlock);
    return commentCode + code + nextCode;
};


/**
 * Arduino Board profiles
 *
 */
var profile = {
    arduino_uno: {
        description: "Arduino standard-compatible board",
        digital: [
            ["2", "2"],
            ["3", "3"],
            ["4", "4"],
            ["5", "5"],
            ["6", "6"],
            ["7", "7"],
            ["8", "8"],
            ["9", "9"],
            ["10", "10"],
            ["11", "11"],
            ["12", "12"],
            ["13", "13"],
            ["A0", "A0"],
            ["A1", "A1"],
            ["A2", "A2"],
            ["A3", "A3"],
            ["A4", "A4"],
            ["A5", "A5"]
        ],
        pwm: [
            ["3", "3"],
            ["5", "5"],
            ["6", "6"],
            ["9", "9"],
            ["10", "10"],
            ["11", "11"],
            ["A0", "A0"],
            ["A1", "A1"],
            ["A2", "A2"],
            ["A3", "A3"],
            ["A4", "A4"],
            ["A5", "A5"]
        ],
        analog: [
            ["A0", "A0"],
            ["A1", "A1"],
            ["A2", "A2"],
            ["A3", "A3"],
            ["A4", "A4"],
            ["A5", "A5"]
        ],
        serial_baud_rate: 9600,
        parseKey: '_*_'
    }
};

var selectedBoard = profile.arduino_uno;

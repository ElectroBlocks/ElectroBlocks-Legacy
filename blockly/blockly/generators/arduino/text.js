/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating Arduino for text blocks.
 * @author gasolin@gmail.com (Fred Lin)
 */
'use strict';

goog.provide('Blockly.Arduino.texts');

goog.require('Blockly.Arduino');


Blockly.Arduino.text = function() {
  // Text value.
  var code = Blockly.Arduino.quote_(this.getFieldValue('TEXT'));
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.text_join = function (block) {

    var result = '';
    for (var i = 0; i < block.inputList.length; i += 1) {

        if (block.getChildren()[i].type == 'text') {
            result += 'String("';
            result += Blockly.Arduino.valueToCode(block, block.inputList[i].name, Blockly.Arduino.ORDER_ATOMIC).replace(/"/g, '').toString();
            result += '")';
        }
        else {
            result += Blockly.Arduino.valueToCode(block, block.inputList[i].name, Blockly.Arduino.ORDER_ATOMIC).toString();
        }

        if (i < (block.inputList.length -1)) {
            result += ' + ';
        }
    }

    return [result, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.text_remove_char = function (block) {
    var stringVariable = Blockly.Arduino.valueToCode(block, 'String Variable', Blockly.Arduino.ORDER_ATOMIC);
    var index = Blockly.Arduino.valueToCode(block, 'INDEX', Blockly.Arduino.ORDER_ATOMIC);
    return stringVariable + '.remove(' + index + '); \n'
};

Blockly.Arduino.text_length = function (block) {
    var stringVariable = Blockly.Arduino.valueToCode(block, 'String Variable', Blockly.Arduino.ORDER_ATOMIC);

    return [stringVariable + '.length()', Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.text_value_to_string = function (block) {
    var toBeStringValue = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_ATOMIC);

    return [ 'String(' + toBeStringValue + ')', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.text_get_part_of_string = function (block) {

    var rawString = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_ATOMIC);
    var char = Blockly.Arduino.valueToCode(block, 'PARSING_CHAR', Blockly.Arduino.ORDER_ATOMIC).replace(/"/g, "'");
    var index = Blockly.Arduino.valueToCode(block, 'INDEX', Blockly.Arduino.ORDER_ATOMIC);

    Blockly.Arduino.definitions_['text_get_part_of_string'] =
        'String getParseValue(String data, char separator, int index) { \n' +
        '\tint found = 0;' +
        '\tint strIndex[] = {0, -1}; \n' +
        '\tint maxIndex = data.length()-1; \n' +
        '\tfor(int i=0; i<=maxIndex && found<=index; i++){   \n' +
        '\t    if(data.charAt(i)==separator || i==maxIndex){    \n' +
        '\t        found++;                      \n' +
        '\t        strIndex[0] = strIndex[1]+1;    \n' +
        '\t        strIndex[1] = (i == maxIndex) ? i+1 : i;    \n' +
        '\t    }                            \n' +
        '\t}                     \n' +
        '\treturn found>index ? data.substring(strIndex[0], strIndex[1]) : ""; \n' +
   ' }\n';



        return [ 'getParseValue(' + rawString + ', ' + char + ', ' +  index + ')', Blockly.Arduino.ORDER_ATOMIC];

};
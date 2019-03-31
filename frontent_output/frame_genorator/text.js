"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blockly_helper_1 = require("../frame/blockly_helper");
const text_block = (block, previousFrame) => {
    return block.getFieldValue('TEXT');
};
exports.text_block = text_block;
const text_join_block = (block, previousFrame) => {
    let inputLength = block.inputList.length;
    let returnString = '';
    for (let i = 0; i < inputLength; i += 1) {
        returnString += blockly_helper_1.getInputValue(block, 'ADD' + i, '', previousFrame);
    }
    return returnString;
};
exports.text_join_block = text_join_block;
const text_length_block = (block, previousFrame) => {
    return blockly_helper_1.getInputValue(block, 'VALUE', '', previousFrame).toString().length;
};
exports.text_length_block = text_length_block;
const text_isEmpty_block = (block, previousFrame) => {
    return blockly_helper_1.getInputValue(block, 'VALUE', '', previousFrame).toString().length == 0;
};
exports.text_isEmpty_block = text_isEmpty_block;
const number_to_string_block = (block, previousFrame) => {
    let number = blockly_helper_1.getInputValue(block, 'NUMBER', 0, previousFrame).toString();
    let precision = parseInt(block.getFieldValue('PRECISION'));
    return parseFloat(number).toFixed(precision).toString();
};
exports.number_to_string_block = number_to_string_block;
const parse_string_block_block = (block, previousFrame) => {
    const text = blockly_helper_1.getInputValue(block, 'VALUE', '', previousFrame).toString();
    const delimiter = block.getFieldValue('DELIMITER');
    const positionString = blockly_helper_1.getInputValue(block, 'POSITION', 0, previousFrame).toString();
    let position = parseInt(positionString);
    position = position >= 1 ? position - 1 : 0;
    let splitTextArray = text.split(delimiter);
    return splitTextArray[position] || '';
};
exports.parse_string_block_block = parse_string_block_block;
const text_changeCase_block = (block, previousFrame) => {
    const op = block.getFieldValue('CASE');
    const string = blockly_helper_1.getInputValue(block, 'TEXT', '', previousFrame).toString();
    return op == 'UPPERCASE' ? string.toUpperCase() : string.toLowerCase();
};
exports.text_changeCase_block = text_changeCase_block;
//# sourceMappingURL=text.js.map
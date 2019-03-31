"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blockly_helper_1 = require("../frame/blockly_helper");
const math_number_block = (block, previousFrame) => {
    return parseFloat(block.getFieldValue('NUM'));
};
exports.math_number_block = math_number_block;
const math_arithmetic_block = (block, previousFrame) => {
    let op = block.getFieldValue('OP');
    const aValue = blockly_helper_1.getInputValue(block, 'A', 1, previousFrame);
    const bValue = blockly_helper_1.getInputValue(block, 'B', 1, previousFrame);
    const numA = parseFloat(aValue.toString());
    const numB = parseFloat(bValue.toString());
    switch (op) {
        case 'ADD':
            return numA + numB;
        case 'MINUS':
            return numA - numB;
        case 'MULTIPLY':
            return numA * numB;
        case 'DIVIDE':
            const divider = numB <= 0 ? 1 : numB;
            return numA / divider;
        case 'POWER':
            return Math.pow(numA, numB);
    }
    throw Error('No Valid Math Operation Found');
};
exports.math_arithmetic_block = math_arithmetic_block;
const math_round_block = (block, previousFrame) => {
    const op = block.getFieldValue('OP');
    const numberString = blockly_helper_1.getInputValue(block, 'NUM', 1, previousFrame).toString();
    const number = parseFloat(numberString);
    switch (op) {
        case 'ROUND':
            return Math.round(number);
        case 'ROUNDUP':
            return Math.ceil(number);
        case 'ROUNDDOWN':
            return Math.floor(number);
    }
    throw Error('No Valid Math Operation Found');
};
exports.math_round_block = math_round_block;
const math_modulo_block = (block, previousFrame) => {
    let dividendValue = blockly_helper_1.getInputValue(block, 'DIVIDEND', 1, previousFrame).toString();
    let dividerValue = blockly_helper_1.getInputValue(block, 'DIVISOR', 1, previousFrame).toString();
    return parseInt(dividendValue) % parseInt(dividerValue);
};
exports.math_modulo_block = math_modulo_block;
const math_random_int_block = (block, previousFrame) => {
    const fromValue = blockly_helper_1.getInputValue(block, 'FROM', 1, previousFrame).toString();
    const toValue = blockly_helper_1.getInputValue(block, 'TO', 10, previousFrame).toString();
    return getRandomInt(parseInt(fromValue), parseInt(toValue));
};
exports.math_random_int_block = math_random_int_block;
const string_to_number_block = (block, previousFrame) => {
    let numValue = blockly_helper_1.getInputValue(block, 'VALUE', 0, previousFrame);
    return numValue.toString();
};
exports.string_to_number_block = string_to_number_block;
const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
exports.getRandomInt = getRandomInt;
//# sourceMappingURL=math.js.map
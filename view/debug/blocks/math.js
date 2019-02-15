/**
 *
 * @param block
 *
 * @return {Number}
 */
function math_number(block, previousFrame) {
    return parseFloat(block.getFieldValue('NUM'));
}

function math_arithmetic(block, previousFrame) {
    let op = block.getFieldValue('OP');

    let aValue = getInputValue(block, 'A', previousFrame, 1);
    let bValue = getInputValue(block, 'B', previousFrame, 1);

    switch (op) {
        case 'ADD':
           return aValue + bValue;
        case 'MINUS':
           return aValue - bValue;
        case 'MULTIPLY':
           return aValue * bValue;
        case 'DIVIDE':
            return aValue / bValue;
        case 'POWER':
            return Math.pow(aValue, bValue);
    }

    throw Error('No Valid Math Operation Found');
}

function math_round(block, previousFrame) {

    let op = block.getFieldValue('OP');
    let numValue = getInputValue(block, 'NUM', previousFrame, 1);

    switch (op) {
        case 'ROUND':
            return Math.round(numValue);
        case 'ROUNDUP':
            return Math.ceil(numValue);
        case 'ROUNDDOWN':
            return Math.floor(numValue);
    }

    throw Error('No Valid Math Operation Found');
}

function math_modulo(block, previousFrame) {

    let dividendValue = getInputValue(block, 'DIVIDEND', previousFrame, 1);

    let dividerValue = getInputValue(block, 'DIVISOR', previousFrame, 1);

    return parseInt(dividendValue) % parseInt(dividerValue);
}

function math_random_int(block, previousFrame) {

    let fromValue = getInputValue(block, 'FROM', previousFrame, 0);

    let toValue = getInputValue(block, 'TO', previousFrame);

    return getRandomInt(fromValue, toValue);
}

function string_to_number(block, previousFrame) {

    let numValue = getInputValue(block, 'VALUE', previousFrame, 0);

    return numValue.toString();
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

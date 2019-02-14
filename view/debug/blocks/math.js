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
    var op = block.getFieldValue('OP');
    var aBlock = block.getInput('A').connection.targetConnection.sourceBlock_;
    var bBlock = block.getInput('B').connection.targetConnection.sourceBlock_;

    var aValue = functionList[aBlock.type](aBlock, previousFrame);
    var bValue = functionList[bBlock.type](bBlock, previousFrame);

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
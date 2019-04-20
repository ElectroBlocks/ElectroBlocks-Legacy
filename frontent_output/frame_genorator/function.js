"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_1 = require("../frame/block");
const arduino_frame_1 = require("../arduino/arduino_frame");
const blockly_helper_1 = require("../frame/blockly_helper");
exports.procedures_callnoreturn_block = (block, frameLocation, previousFrame) => {
    let frames = [];
    let procedureCall = block.getProcedureCall();
    let functionDefinitionBlock = findFunctionDefinitionBlock(procedureCall);
    let callBlockFrame = previousFrame ?
        previousFrame.makeCopy(block.id) :
        arduino_frame_1.ArduinoFrame.makeEmptyFrame(block.id, frameLocation);
    frames.push(callBlockFrame);
    const definitionBlockFrame = new arduino_frame_1.ArduinoFrame(functionDefinitionBlock.id, callBlockFrame.variables, callBlockFrame.components, callBlockFrame.command, frameLocation);
    const procedureDefinition = mapProcedureDefinition(functionDefinitionBlock);
    const variableModels = procedureDefinition.variableModels;
    for (let i = 0; i < variableModels.length; i += 1) {
        let value = blockly_helper_1.getInputValue(block, 'ARG' + i, getVariableDefaultType(variableModels[i].type), previousFrame);
        definitionBlockFrame.variables[variableModels[i].name] = {
            name: variableModels[i].name,
            value,
            type: variableModels[i].type
        };
    }
    frames.push(definitionBlockFrame);
    let functionFrames = blockly_helper_1.generateFrameForInputStatement(functionDefinitionBlock, 'STACK', frameLocation, definitionBlockFrame);
    functionFrames.forEach(frame => frames.push(frame));
    return frames;
};
const getVariableDefaultType = (type) => {
    switch (type) {
        case 'Number':
            return 0;
        case 'String':
            return '';
        case 'Boolean':
            return true;
        case 'List String':
            return [''];
        case 'List Boolean':
            return [true];
        case 'List Number':
            return [0];
    }
    throw new Error('Unknown Type For Function Parameter');
};
const findFunctionDefinitionBlock = (functionName) => {
    let functionBlocks = block_1.get_blockly().mainWorkspace
        .getTopBlocks()
        .filter(block => block.type === 'procedures_defnoreturn')
        .filter(block => block.getProcedureDef()[0] == functionName);
    if (functionBlocks.length === 0) {
        throw new Error(`No block with that function name ${functionName} found.`);
    }
    return functionBlocks[0];
};
const mapProcedureDefinition = (block) => {
    let definition = block.getProcedureDef();
    const variableModels = definition[3];
    return {
        name: definition[0],
        variableModels
    };
};
//# sourceMappingURL=function.js.map

function procedures_callnoreturn_block(block, previousFrame) {

    let frames = [];

    let procedureCall = block.getProcedureCall();
    let functionDefinitionBlock = findFunctionDefinition(procedureCall);

    let callBlockFrame = createNewFrame(block, previousFrame);

    frames.push(callBlockFrame);

    let definitionBlockFrame = copyFrame(callBlockFrame);
    definitionBlockFrame.blockId = functionDefinitionBlock.id;

    const procedureDefinition = mapProcedureDefinition(functionDefinitionBlock);
    const variableModels = procedureDefinition.variableModels;

    for (let i = 0; i < variableModels.length; i += 1) {
       let value =  getInputValue(
            block,
            'ARG' + i,
            previousFrame,
            getVariableDefaultType(variableModels[i].type)
        );

       definitionBlockFrame.variables[variableModels[0].name] = {
           name: variableModels[0].name,
           value,
           type: variableModels[0].type
       };
    }

    frames.push(definitionBlockFrame);

    let functionFrames = generateFrameForInputStatement(
        functionDefinitionBlock,
        'STACK',
        copyFrame(definitionBlockFrame)
    );

    console.log(functionFrames);

    functionFrames.forEach(frame => frames.push(frame));

    return frames;

}

function getVariableDefaultType(type) {
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
}

function findFunctionDefinition(functionName) {
    let functionBlocks = Blockly.mainWorkspace
        .getTopBlocks()
        .filter(block => block.type === 'procedures_defnoreturn')
        .filter(block => block.getProcedureDef()[0] == functionName);

    if (functionBlocks.length === 0) {
        throw new Error('No function definition found');
    }

    return functionBlocks[0];
}

function mapProcedureDefinition(block) {
   let definition =  block.getProcedureDef();
   const variableModels = definition[3];

   return {
       name: definition[0],
       variableModels
   };
}

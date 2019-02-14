function variables_set_number(block, previousFrame = null) {

    var frame = previousFrame || newFrame();

    var variableName = Blockly.mainWorkspace.getVariableById(block.getFieldValue('VAR')).name;

    if (block.inputList.length == 0) {
        throw Error('Must have value attached to it');
    }

    var inputBlock = block.inputList[0].connection.targetConnection.sourceBlock_;

    frame.variables[variableName] =
        {
            value: functionList[inputBlock.type](inputBlock, previousFrame),
            type: 'Number',
            name: variableName
        };

    return frame;
}


function variables_get_number(block, previousFrame) {
   var variableName = Blockly.mainWorkspace.getVariableById(block.getFieldValue('VAR')).name;

   if (!previousFrame) {
       return 0;
   }

   return previousFrame.variables[variableName].value;
}






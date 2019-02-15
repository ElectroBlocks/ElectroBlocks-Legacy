function variables_set_number(block, previousFrame = null) {

    let frame = previousFrame || newFrame();

    let variableName = Blockly.mainWorkspace.getVariableById(block.getFieldValue('VAR')).name;

    let value = getInputValue(block, 'VALUE', previousFrame, 0);

    value = value || 0;

    frame.variables[variableName] =
        {
            value,
            type: 'Number',
            name: variableName
        };

    return frame;
}


function variables_get_number(block, previousFrame) {
   let variableName = Blockly.mainWorkspace.getVariableById(block.getFieldValue('VAR')).name;

   if (!previousFrame) {
       return 0;
   }

   return previousFrame.variables[variableName].value || 0;
}






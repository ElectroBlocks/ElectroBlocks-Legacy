import { Observable } from 'rxjs';
import { Block } from 'blockly';

export const forLoopChangeText = workspace => {
  workspace
    .getAllBlocks(true)
    .filter(block => block.type == 'controls_for')
    .forEach(forBlock => {
      
      const toNumber = getInputValue(forBlock, 'TO');
      const fromNumber = getInputValue(forBlock, 'FROM');

      const addText = toNumber > fromNumber ? 'by adding' : 'by subtracting';

      forBlock.inputList[2].fieldRow[0].setText(addText);
    });
};

// TODO replace with real function
const getInputValue = (block: Block, inputName: string) => {
   const inputBlock = block.getInputTargetBlock(inputName);

   if (!inputBlock) {
       return ;
   }

   return inputBlock.getFieldValue('NUM');
}

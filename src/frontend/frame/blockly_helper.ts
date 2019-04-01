import { Block } from './block';
import { Frame } from "./frame";
import { frameGeneratingBlocks, valueGeneratingBlocks } from './frame_list';


    /**
     * This will take a statement input where blocks are being stored and gather all the blocks
     * under it and generate frames based on those blocks
     *
     */
    const generateFrameForInputStatement = (
        block: Block,
        statement_name: string,
        previousFrame?: Frame
    ): Array<Frame> => {
        const blockList = blocksInsideInput(block, statement_name)
                            .filter(block => !block.disabled);

        return generateFrames(blockList, previousFrame);
    };

   /**
    * Gets the value of the block attached to it
    *
    */
   const getInputValue = (parentBlock: Block, inputName: string, noBlockAttachedDefaultValue: any, previousFrame?: Frame): number|string|boolean|Object|Array<number|string|boolean|Object> => {

       const block = parentBlock.getInput(inputName).connection.targetBlock();

        if (!block) {
            return noBlockAttachedDefaultValue;
        }

        // This means that the default value will be now come from the block definition
        // Not from the block attached to it.
        return valueGeneratingBlocks[block.type + '_block'](block, previousFrame);
    };

    /**
     * 
     */
    const blocksInsideInput = (containerBlock: Block, inputName: string): Block[] => {
        let blockList = [];
        let topBlock = containerBlock.getInputTargetBlock(inputName);

        if (!topBlock) {
            return [];
        }

        do {
            blockList.push(topBlock);

            if (!topBlock.nextConnection) {
                break;
            }

            topBlock = topBlock.nextConnection.targetBlock();
        } while(topBlock);

        return blockList;
    };

    /**
     * Generates Frames for each block in the list
     */
    const generateFrames = (blockList: Block[], previousFrame?: Frame) => {
        let frames = new Array<Frame>();

        for (let i = 0; i < blockList.length; i += 1) {

            let block = blockList[i];
            
            let currentFrames =
                frameGeneratingBlocks[block.type + '_block'](block, previousFrame);
            frames = frames.concat(currentFrames);
            previousFrame = frames[frames.length - 1];
        }

        return frames;
    };


export {
    generateFrameForInputStatement,
    getInputValue
}

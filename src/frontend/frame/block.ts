import { Variable } from './variable';

declare const Blockly: Blockly;

export interface Block {
    
    /**
     * Unique id for the block
     */
    id: string;

    /**
     * Whether the block is disabled
     */
    disabled: boolean;

    /**
     * Represents below the block
     */
    nextConnection?: Connection;

    /**
     * The type of blocks
     */
    type: string;


    getInput(inputName: string): { connection: Connection };

    /**
     * Returns the value from field
     * Field could an text, dropdown, variable etc
     * 
     * 
     * @param fieldName 
     */
    getFieldValue(fieldName: string): any

    /**
     * Gets the top block from block that has an input that stores other blocks.
     * 
     * 
     * @param statementName The name of the input where the blocks are stored
     */
    getInputTargetBlock(statementName: string): Block;

    getProcedureDef(): [string, string[], boolean, Variable[] ]

    getProcedureCall(): string;
}

export interface Connection {

    /**
     * Return the block that is connected to it
     */
    targetBlock(): Block;

    /**
     * Gets connect to the other block that it is connecting to 
     */
    targetConnection?: Connection;

    /**
     * Gets the source / from block
     */
    getSourceBlock(): Block;

}

export interface Blockly {
    readonly mainWorkspace: WorkSpace;
}

export interface WorkSpace {
    
     getVariableById: (variableId: string) => Variable; 

     getAllBlocks(): Block[];

    getTopBlocks(): Block[];
}

const getBlockly = (): Blockly => {
    return Blockly;
};

export {
    getBlockly
}


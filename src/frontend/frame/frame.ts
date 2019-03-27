import { Command } from "./command";

export interface Frame {


    /**
     * The command needed to execute if all the other frames have been executed
     */
    nextCommand(): Command;

    /**
     * The command needed get to the current state of the program
     */
    directFrameCommand(): Command[];

    /**
     * Makes a copy of the current frame
     */
    makeCopy(blockId: string): Frame;
}

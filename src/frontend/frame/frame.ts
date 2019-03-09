export interface Frame {


    /**
     * The command needed to execute if all the other frames have been executed
     */
    nextCommand(): string;

    /**
     * The command needed get to the current state of the program
     */
    directFrameCommand(): string;

    /**
     * Makes a copy of the current frame
     */
    makeCopy(): Frame;
}
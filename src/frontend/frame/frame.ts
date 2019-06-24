import { Command } from "./command";

export interface Frame {

    /**
     * The command needed to execute if all the other frames have been executed
     */
    nextCommand(): Command;

    /**
     * Makes a copy of the current frame
     */
    makeCopy(blockId: string, frameLocation: FrameLocation): Frame;
}

export interface FrameLocation {

    iteration: number;

    location: string;
}

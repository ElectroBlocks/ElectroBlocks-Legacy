export interface Frame {
  /**
   * Makes a copy of the current frame
   */
  makeCopy(
    blockId: string,
    frameLocation: FrameLocation,
    explanation: string
  ): Frame;
}

export interface FrameLocation {
  iteration: number;

  location: string;
}

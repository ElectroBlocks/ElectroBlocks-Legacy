import { blocksInsideInput } from './blockly_helper';
import { FrameLocation } from './frame';

class InputState {
  /**
   * A list of block called index by block id
   */
  private blockCalls: { [blockId: string]: BlockCall[] } = {};

  /**
   * Adds a block call to the list of block calls and returns the block
   */
  public addBlockCall(
    blockId: string,
    frameLocation: FrameLocation
  ): BlockCall {
    return { blockId, callNumber: 3, value: 'fake', frameLocation };
    // if (!this.blockCalls[blockId]) {
    // 	this.blockCalls[blockId] = [];
    // }

    // const callNumber = this.blockCalls[blockId].length + 1;

    // const value = getBlockValue(blockId, callNumber);

    // const blockCall = {
    // 	blockId,
    // 	callNumber,
    // 	value,
    // 	frameLocation
    // };

    // this.blockCalls[blockId].push(blockCall);

    // return blockCall;
  }

  /**
   * Gets the current call number for the block
   *
   *
   * @param blockId
   * @param frameLocation
   */
  callNumber(blockId: string, frameLocation: FrameLocation): number {
    return 1;
    // const blockCalls = this.blockCalls[blockId];
    // const callInfo = blockCalls.find(callInfo => callInfo.frameLocation == frameLocation);

    // return callInfo ? callInfo.callNumber : 1;
  }

  /**
   * Clears all the blocks this should only be called during the first part of generating frames.
   */
  clearBlockCalls(): void {
    this.blockCalls = {};
  }
}

// /**
//  * Returns the value of the block
//  */
// const getBlockValue = (blockId: string, callNumber: number) => {

// 	const block = get_blockly().mainWorkspace.getBlockById(blockId);

// 	const defaultValue =  block.defaultDebugValue;

// 	const debugBlocks = blocksInsideInput(block, 'FRAME_VALUES') as DebugValueBlock[];

// 	if (debugBlocks.length == 0 || !debugBlocks[callNumber - 1]) {
// 		return defaultValue;
// 	}

// 	return debugBlocks[callNumber - 1].getFrameValue();
// };

export interface BlockCall {
  blockId: string;

  callNumber: number;

  value: any;

  frameLocation: FrameLocation;
}

const inputState = new InputState();

export { inputState };

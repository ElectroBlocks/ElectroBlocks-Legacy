import { DebugValueBlock, get_blockly } from "./block";
import { blocksInsideInput } from "./blockly_helper";


class InputState {

	/**
	 * A list of block called index by block id
	 */
	private blockCalls: { [blockId: string] : BlockCall[] } = {};

	/**
	 * Adds a block call to the list of block calls and returns the block
	 */
	public addBlockCall(blockId: string): BlockCall {

		if (!this.blockCalls[blockId]) {
			this.blockCalls[blockId] = [];
		}

		const callNumber = this.blockCalls[blockId] ?
			this.blockCalls[blockId].length : 0;

		const value = getBlockValue(blockId, callNumber);

		const blockCall = {
			blockId,
			callNumber,
			value
		};

		this.blockCalls[blockId].push(blockCall);

		return blockCall;
	}
}

/**
 * Returns the value of the block  
 */
const getBlockValue = (blockId: string, callNumber: number) => {

	const block = get_blockly().mainWorkspace.getBlockById(blockId);

	const defaultValue =  block.defaultDebugValue;

	const debugBlocks = blocksInsideInput(block, 'FRAME_VALUES') as DebugValueBlock[];

	if (debugBlocks.length == 0) {
		return defaultValue;
	}

	if (debugBlocks[callNumber]) {
		return debugBlocks[callNumber].getFrameValue();
	}

	const newCallNumber = callNumber % debugBlocks.length;

	return debugBlocks[newCallNumber].getFrameValue();
};

export interface BlockCall {

	blockId: string;

	callNumber: number;

	value: any;
}

const inputState = new InputState();

export {
	inputState
};

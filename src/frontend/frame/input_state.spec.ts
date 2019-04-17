import 'jasmine';
import { inputState } from "./input_state";
import { Block, Blockly, DebugValueBlock } from "./block";
import * as blockly from "./block";
import * as blockHelper from "./blockly_helper";

describe('InputState', () => {

	let block: any|Block;

	let blocklyMock: any|Blockly;

	let debugBlocks: any[]|DebugValueBlock[] = [];

	beforeEach(() => {
		inputState.clearBlockCalls();

		block = {

		};
		blocklyMock = {
			mainWorkspace: {
				getBlockById: (blockId: string) => { }
			}
		};

		spyOn(blocklyMock.mainWorkspace, 'getBlockById')
			.withArgs('block_id').and
			.callFake(() => block);

		spyOn(blockHelper, 'blocksInsideInput')
			.withArgs(block, 'FRAME_VALUES').and
			.callFake(() => debugBlocks)

		spyOn(blockly, 'get_blockly').and.returnValue(blocklyMock);

	});

	it('should use the default value if no blocks are provided.', () => {

		block.defaultDebugValue = true;

		expect(inputState.addBlockCall('block_id')).toBeTruthy();
	});

	it ('should use frame value block associated with the call number', () => {

		debugBlocks.push({
			getFrameValue(){
				return 'Blue'
			}
		} as any);

		debugBlocks.push({
			getFrameValue(){
				return 'Red'
			}
		} as any);
		expect(inputState.addBlockCall('block_id').value).toBe('Blue');
		expect(inputState.addBlockCall('block_id').value).toBe('Red');
	});

	it ('should loop back around if there is not a block associated with call number', () => {
		debugBlocks.push({
			getFrameValue(){
				return 'Blue'
			}
		} as any);

		debugBlocks.push({
			getFrameValue(){
				return 'Red'
			}
		} as any);

		expect(inputState.addBlockCall('block_id').value).toBe('Blue');
		expect(inputState.addBlockCall('block_id').value).toBe('Red');
		expect(inputState.addBlockCall('block_id').value).toBe('Blue');
		expect(inputState.addBlockCall('block_id').value).toBe('Red');

	});
});

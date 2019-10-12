import 'jasmine';
import { inputState } from './input_state';
import * as blockly from 'blockly/core';
import * as blockHelper from './blockly_helper';

describe('InputState', () => {
  //   let block: any | Block;
  //   let blocklyMock: any | Blockly;
  //   let debugBlocks: any[] | DebugValueBlock[] = [];
  //   const frameLocation = { iteration: 1, location: 'loop' };
  //   beforeEach(() => {
  //     inputState.clearBlockCalls();
  //     block = {};
  //     blocklyMock = {
  //       mainWorkspace: {
  //         getBlockById: (blockId: string) => {}
  //       }
  //     };
  //     spyOn(blocklyMock.mainWorkspace, 'getBlockById')
  //       .withArgs('block_id')
  //       .and.callFake(() => block);
  //     spyOn(blockHelper, 'blocksInsideInput')
  //       .withArgs(block, 'FRAME_VALUES')
  //       .and.callFake(() => debugBlocks);
  //     spyOn(blockly, 'get_blockly').and.returnValue(blocklyMock);
  //   });
  //   it('should use the default value if no blocks are provided.', () => {
  //     block.defaultDebugValue = true;
  //     expect(inputState.addBlockCall('block_id', frameLocation)).toBeTruthy();
  //   });
  //   it('should use frame value block associated with the call number', () => {
  //     debugBlocks.push({
  //       getFrameValue() {
  //         return 'Blue';
  //       }
  //     } as any);
  //     debugBlocks.push({
  //       getFrameValue() {
  //         return 'Red';
  //       }
  //     } as any);
  //     expect(inputState.addBlockCall('block_id', frameLocation).value).toBe(
  //       'Blue'
  //     );
  //     expect(inputState.addBlockCall('block_id', frameLocation).value).toBe(
  //       'Red'
  //     );
  //   });
});

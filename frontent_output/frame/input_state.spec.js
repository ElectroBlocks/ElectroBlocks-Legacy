"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jasmine");
const input_state_1 = require("./input_state");
const blockly = require("./block");
const blockHelper = require("./blockly_helper");
describe('InputState', () => {
    let block;
    let blocklyMock;
    let debugBlocks = [];
    beforeEach(() => {
        input_state_1.inputState.clearBlockCalls();
        block = {};
        blocklyMock = {
            mainWorkspace: {
                getBlockById: (blockId) => { }
            }
        };
        spyOn(blocklyMock.mainWorkspace, 'getBlockById')
            .withArgs('block_id').and
            .callFake(() => block);
        spyOn(blockHelper, 'blocksInsideInput')
            .withArgs(block, 'FRAME_VALUES').and
            .callFake(() => debugBlocks);
        spyOn(blockly, 'get_blockly').and.returnValue(blocklyMock);
    });
    it('should use the default value if no blocks are provided.', () => {
        block.defaultDebugValue = true;
        expect(input_state_1.inputState.addBlockCall('block_id')).toBeTruthy();
    });
    it('should use frame value block associated with the call number', () => {
        debugBlocks.push({
            getFrameValue() {
                return 'Blue';
            }
        });
        debugBlocks.push({
            getFrameValue() {
                return 'Red';
            }
        });
        expect(input_state_1.inputState.addBlockCall('block_id').value).toBe('Blue');
        expect(input_state_1.inputState.addBlockCall('block_id').value).toBe('Red');
    });
    it('should loop back around if there is not a block associated with call number', () => {
        debugBlocks.push({
            getFrameValue() {
                return 'Blue';
            }
        });
        debugBlocks.push({
            getFrameValue() {
                return 'Red';
            }
        });
        expect(input_state_1.inputState.addBlockCall('block_id').value).toBe('Blue');
        expect(input_state_1.inputState.addBlockCall('block_id').value).toBe('Red');
        expect(input_state_1.inputState.addBlockCall('block_id').value).toBe('Blue');
        expect(input_state_1.inputState.addBlockCall('block_id').value).toBe('Red');
    });
});
//# sourceMappingURL=input_state.spec.js.map
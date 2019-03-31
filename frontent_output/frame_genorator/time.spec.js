"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jasmine");
const blockHelper = require("../frame/blockly_helper");
const time_1 = require("./time");
const command_1 = require("../frame/command");
describe('time', () => {
    let block;
    let getInputValueSpy;
    beforeEach(() => {
        block = {
            id: 'block_id',
            getFieldValue(fieldName) {
            }
        };
        getInputValueSpy = spyOn(blockHelper, 'getInputValue');
    });
    describe('delay_block_block', () => {
        it('should create a delay command in frame', () => {
            getInputValueSpy.withArgs(block, 'DELAY', 1, undefined)
                .and.returnValue(2.432343);
            const [frame] = time_1.delay_block_block(block);
            expect(frame.command instanceof command_1.TimeCommand).toBeTruthy();
            expect(frame.command.command).toBe("2432");
        });
    });
});
//# sourceMappingURL=time.spec.js.map
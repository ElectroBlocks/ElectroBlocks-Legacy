"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jasmine");
const arduino_frame_1 = require("../arduino/arduino_frame");
const command_1 = require("../frame/command");
const pass_through_block_1 = require("./pass_through_block");
describe('pass through frame generator', () => {
    const previousFrame = new arduino_frame_1.ArduinoFrame('block1', {
        fred: {
            name: 'fred',
            type: 'String',
            value: 'blue'
        },
    }, [], new command_1.EmptyCommand(), { location: 'loop', iteration: 1 });
    const block = {
        id: 'block_id'
    };
    it('should use the previous frame if defined', () => {
        const [frame] = pass_through_block_1.temp_get_temp_block(block, { iteration: 1, location: 'loop' }, previousFrame);
        expect(frame.variables['fred'].value).toBe('blue');
    });
    it('should use empty values if no frame is provided', () => {
        const [frame] = pass_through_block_1.ir_remote_scan_again_block(block, { iteration: 1, location: 'loop' });
        expect(frame.components).toEqual([]);
        expect(frame.variables).toEqual({});
    });
});
//# sourceMappingURL=pass_through_block.spec.js.map
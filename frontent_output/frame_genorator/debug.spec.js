"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jasmine");
const arduino_frame_1 = require("../arduino/arduino_frame");
const command_1 = require("../frame/command");
const debug_1 = require("./debug");
describe('debug', () => {
    const block = {
        id: 'blockId'
    };
    const previousFrame = new arduino_frame_1.ArduinoFrame('block1', {
        fred: {
            name: 'fred',
            type: 'String',
            value: 'blue'
        },
    }, [], new command_1.EmptyCommand(), { location: 'loop', iteration: 1 });
    it('should copy over the variables', () => {
        const frames = debug_1.debug_block(block, { location: 'loop', iteration: 1 }, previousFrame);
        expect(frames.length).toBe(1);
        const [frame] = frames;
        expect(frame.variables['fred'].value).toBe('blue');
    });
    it('should be able to work without previous frame', () => {
        const frames = debug_1.debug_block(block, { location: 'loop', iteration: 1 });
        expect(frames.length).toBe(1);
        const [frame] = frames;
        expect(frame.variables).toEqual({});
    });
});
//# sourceMappingURL=debug.spec.js.map
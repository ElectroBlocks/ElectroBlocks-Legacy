"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jasmine");
const arduino_frame_1 = require("../arduino/arduino_frame");
const command_1 = require("../frame/command");
const message_1 = require("./message");
describe('message', () => {
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
    it('should use the previous frame if available', () => {
        const frames = message_1.send_message_block(block, { location: 'loop', iteration: 1 }, previousFrame);
        expect(frames.length).toBe(1);
        const [frame] = frames;
        expect(frame.variables['fred'].value).toBe('blue');
    });
    it('should to an empty command frame if previous frame not available', () => {
        const frames = message_1.send_message_block(block, { location: 'loop', iteration: 1 });
        expect(frames.length).toBe(1);
        const [frame] = frames;
        expect(frame.variables).toEqual({});
    });
});
//# sourceMappingURL=message.spec.js.map
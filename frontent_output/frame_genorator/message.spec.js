"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jasmine");
const arduino_frame_1 = require("../arduino/arduino_frame");
const command_1 = require("../frame/command");
const message_1 = require("./message");
const blockHelperFunctions = require("../frame/blockly_helper");
describe('message', () => {
    const usbblock = {
        id: 'blockId',
        type: 'send_message'
    };
    const bluetoothSendMessageBlock = {
        id: 'blockId',
        type: 'bt_send_message'
    };
    let getInputValueSpy;
    const previousFrame = new arduino_frame_1.ArduinoFrame('block1', {
        fred: {
            name: 'fred',
            type: 'String',
            value: 'blue'
        },
    }, [], new command_1.EmptyCommand(), { location: 'loop', iteration: 1 });
    beforeEach(() => {
        getInputValueSpy = spyOn(blockHelperFunctions, 'getInputValue');
    });
    it('should use the previous frame if available', () => {
        getInputValueSpy.withArgs(usbblock, 'MESSAGE', '', previousFrame).and.returnValue('Hello World');
        const frames = message_1.send_message_block(usbblock, { location: 'loop', iteration: 1 }, previousFrame);
        expect(frames.length).toBe(1);
        const [frame] = frames;
        expect(frame.variables['fred'].value).toBe('blue');
        expect(frame.nextCommand().command).toBe('Hello World');
        expect(frame.nextCommand().type).toBe(command_1.COMMAND_TYPE.MESSAGE);
    });
    it('should to an empty command frame if previous frame not available', () => {
        getInputValueSpy.withArgs(usbblock, 'MESSAGE', '', undefined).and.returnValue('People Cool');
        const frames = message_1.send_message_block(usbblock, { location: 'loop', iteration: 1 });
        expect(frames.length).toBe(1);
        const [frame] = frames;
        expect(frame.variables).toEqual({});
        expect(frame.nextCommand().command).toBe('People Cool');
    });
    it('should be able to do bluetooth block as well', () => {
        getInputValueSpy.withArgs(bluetoothSendMessageBlock, 'MESSAGE', '', undefined).and.returnValue('Blue Cool');
        const [frame] = message_1.send_message_block(bluetoothSendMessageBlock, { location: 'loop', iteration: 1 });
        expect(frame.nextCommand().type).toBe(command_1.COMMAND_TYPE.BLUETOOTH_MESSAGE);
        expect(frame.nextCommand().command).toBe('Blue Cool');
    });
});
//# sourceMappingURL=message.spec.js.map
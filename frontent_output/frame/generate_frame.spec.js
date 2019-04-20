"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jasmine");
const input_state_1 = require("./input_state");
const blockHelper = require("./blockly_helper");
const blockly = require("./block");
const arduino_frame_1 = require("../arduino/arduino_frame");
const generate_frame_1 = require("./generate_frame");
describe('Generate Frames', () => {
    let blocklyMock;
    const frameLocation = { location: 'loop', iteration: 3 };
    beforeEach(() => {
        input_state_1.inputState.clearBlockCalls();
        blocklyMock = {
            mainWorkspace: {
                getTopBlocks() {
                    return [
                        {
                            type: 'arduino_start',
                            disabled: false,
                        },
                        {
                            type: 'procedures_defnoreturn',
                            disabled: false,
                        },
                        {
                            type: 'generate_fake',
                            disabled: true,
                        }
                    ];
                }
            }
        };
        spyOn(blockly, 'get_blockly').and.returnValue(blocklyMock);
    });
    it('should generate number of frames based on the number of times going through the loop', () => {
        const generateLoopSpy = spyOn(blockHelper, 'generateFrameForInputStatement');
        generateLoopSpy
            .withArgs({ type: 'arduino_start', 'disabled': false }, 'setup', { location: 'setup', iteration: 0 }, null).and
            .callFake(() => [arduino_frame_1.ArduinoFrame.makeEmptyFrame('block_id', frameLocation)]);
        generateLoopSpy
            .withArgs({ type: 'arduino_start', 'disabled': false }, 'loop', { location: 'loop', iteration: jasmine.any(Number) }, jasmine.anything()).and
            .callFake(() => [arduino_frame_1.ArduinoFrame.makeEmptyFrame('block_id', frameLocation), arduino_frame_1.ArduinoFrame.makeEmptyFrame('block_id', frameLocation)]);
        expect(generate_frame_1.generateListOfFrame(1).length).toBe(3);
        expect(generate_frame_1.generateListOfFrame(2).length).toBe(5);
    });
});
//# sourceMappingURL=generate_frame.spec.js.map
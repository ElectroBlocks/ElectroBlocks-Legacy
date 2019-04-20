"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jasmine");
const blockHelper = require("../frame/blockly_helper");
const variableHelper = require("./variables");
const arduino_frame_1 = require("../arduino/arduino_frame");
const loops_1 = require("./loops");
describe('loops', () => {
    let block;
    let blockSpy;
    const frameLocation = { location: 'loop', iteration: 3 };
    let getInputValueSpy;
    let generateFrameForInputStatementSpy;
    let getVariableNameSpy;
    beforeEach(() => {
        block = {
            id: 'loop_block',
            getFieldValue(fieldName) {
            }
        };
        blockSpy = spyOn(block, 'getFieldValue');
        getInputValueSpy = spyOn(blockHelper, 'getInputValue');
        generateFrameForInputStatementSpy = spyOn(blockHelper, 'generateFrameForInputStatement');
        getVariableNameSpy = spyOn(variableHelper, 'getVariableName');
    });
    describe('controls_repeat_ext_block', () => {
        it('should generate x number from frames', () => {
            getInputValueSpy.withArgs(block, 'TIMES', 1, undefined)
                .and.returnValue(2);
            generateFrameForInputStatementSpy.withArgs(block, 'DO', frameLocation, jasmine.any(arduino_frame_1.ArduinoFrame)).and.returnValue([arduino_frame_1.ArduinoFrame.makeEmptyFrame('block1', frameLocation), arduino_frame_1.ArduinoFrame.makeEmptyFrame('block2', frameLocation)]);
            const frames = loops_1.controls_repeat_ext_block(block, frameLocation);
            expect(frames.length).toBe(6);
            expect(frames[0].blockId).toBe('loop_block');
            expect(frames[1].blockId).toBe('block1');
            expect(frames[2].blockId).toBe('block2');
            expect(frames[3].blockId).toBe('loop_block');
            expect(frames[4].blockId).toBe('block1');
            expect(frames[5].blockId).toBe('block2');
        });
        it('should not generate any if times is 0 or less', () => {
            getInputValueSpy.withArgs(block, 'TIMES', 1, undefined)
                .and.returnValue(0);
            const frames = loops_1.controls_repeat_ext_block(block, frameLocation);
            expect(frames.length).toBe(1);
        });
    });
    describe('controls_for_block', () => {
        it('should be able to to go forwards', () => {
            getInputValueSpy.withArgs(block, 'FROM', 1, undefined)
                .and.returnValue(1);
            getInputValueSpy.withArgs(block, 'TO', 1, undefined)
                .and.returnValue(3);
            getInputValueSpy.withArgs(block, 'BY', 1, undefined)
                .and.returnValue(1);
            getVariableNameSpy.withArgs(block).and.returnValue('indexVariable');
            generateFrameForInputStatementSpy.withArgs(block, 'DO', frameLocation, jasmine.any(arduino_frame_1.ArduinoFrame))
                .and.callFake((block, inputStatement, frameLocation, previousFrame) => {
                return [previousFrame.makeCopy('block1'), previousFrame.makeCopy('block2')];
            });
            const frames = loops_1.controls_for_block(block, frameLocation);
            expect(frames.length).toBe(9);
            expect(frames[0].variables['indexVariable'].value).toBe(1);
            expect(frames[0].blockId).toBe('loop_block');
            expect(frames[1].variables['indexVariable'].value).toBe(1);
            expect(frames[1].blockId).toBe('block1');
            expect(frames[2].variables['indexVariable'].value).toBe(1);
            expect(frames[2].blockId).toBe('block2');
            expect(frames[3].variables['indexVariable'].value).toBe(2);
            expect(frames[3].blockId).toBe('loop_block');
            expect(frames[4].variables['indexVariable'].value).toBe(2);
            expect(frames[4].blockId).toBe('block1');
            expect(frames[5].variables['indexVariable'].value).toBe(2);
            expect(frames[5].blockId).toBe('block2');
            expect(frames[6].variables['indexVariable'].value).toBe(3);
            expect(frames[6].blockId).toBe('loop_block');
            expect(frames[7].variables['indexVariable'].value).toBe(3);
            expect(frames[7].blockId).toBe('block1');
            expect(frames[8].variables['indexVariable'].value).toBe(3);
            expect(frames[8].blockId).toBe('block2');
        });
        it('it should be able to go backwards', () => {
            getInputValueSpy.withArgs(block, 'FROM', 1, undefined)
                .and.returnValue(3);
            getInputValueSpy.withArgs(block, 'TO', 1, undefined)
                .and.returnValue(1);
            getInputValueSpy.withArgs(block, 'BY', 1, undefined)
                .and.returnValue(1);
            getVariableNameSpy.withArgs(block).and.returnValue('indexVariable');
            generateFrameForInputStatementSpy.withArgs(block, 'DO', frameLocation, jasmine.any(arduino_frame_1.ArduinoFrame))
                .and.callFake((block, inputStatement, frameLocation, previousFrame) => {
                return [previousFrame.makeCopy('block1'), previousFrame.makeCopy('block2')];
            });
            const frames = loops_1.controls_for_block(block, frameLocation);
            expect(frames.length).toBe(9);
            expect(frames[0].variables['indexVariable'].value).toBe(3);
            expect(frames[0].blockId).toBe('loop_block');
            expect(frames[1].variables['indexVariable'].value).toBe(3);
            expect(frames[1].blockId).toBe('block1');
            expect(frames[2].variables['indexVariable'].value).toBe(3);
            expect(frames[2].blockId).toBe('block2');
            expect(frames[3].variables['indexVariable'].value).toBe(2);
            expect(frames[3].blockId).toBe('loop_block');
            expect(frames[4].variables['indexVariable'].value).toBe(2);
            expect(frames[4].blockId).toBe('block1');
            expect(frames[5].variables['indexVariable'].value).toBe(2);
            expect(frames[5].blockId).toBe('block2');
            expect(frames[6].variables['indexVariable'].value).toBe(1);
            expect(frames[6].blockId).toBe('loop_block');
            expect(frames[7].variables['indexVariable'].value).toBe(1);
            expect(frames[7].blockId).toBe('block1');
            expect(frames[8].variables['indexVariable'].value).toBe(1);
            expect(frames[8].blockId).toBe('block2');
        });
        it('should be able to change change by', () => {
            getInputValueSpy.withArgs(block, 'FROM', 1, undefined)
                .and.returnValue(1);
            getInputValueSpy.withArgs(block, 'TO', 1, undefined)
                .and.returnValue(5);
            getInputValueSpy.withArgs(block, 'BY', 1, undefined)
                .and.returnValue(2);
            getVariableNameSpy.withArgs(block).and.returnValue('indexVariable');
            generateFrameForInputStatementSpy
                .withArgs(block, 'DO', frameLocation, jasmine.any(arduino_frame_1.ArduinoFrame))
                .and.callFake((block, inputStatement, frameLocation, previousFrame) => {
                return [previousFrame.makeCopy('block1'), previousFrame.makeCopy('block2')];
            });
            const frames = loops_1.controls_for_block(block, frameLocation);
            expect(frames.length).toBe(9);
            expect(frames[0].variables['indexVariable'].value).toBe(1);
            expect(frames[0].blockId).toBe('loop_block');
            expect(frames[1].variables['indexVariable'].value).toBe(1);
            expect(frames[1].blockId).toBe('block1');
            expect(frames[2].variables['indexVariable'].value).toBe(1);
            expect(frames[2].blockId).toBe('block2');
            expect(frames[3].variables['indexVariable'].value).toBe(3);
            expect(frames[3].blockId).toBe('loop_block');
            expect(frames[4].variables['indexVariable'].value).toBe(3);
            expect(frames[4].blockId).toBe('block1');
            expect(frames[5].variables['indexVariable'].value).toBe(3);
            expect(frames[5].blockId).toBe('block2');
            expect(frames[6].variables['indexVariable'].value).toBe(5);
            expect(frames[6].blockId).toBe('loop_block');
            expect(frames[7].variables['indexVariable'].value).toBe(5);
            expect(frames[7].blockId).toBe('block1');
            expect(frames[8].variables['indexVariable'].value).toBe(5);
            expect(frames[8].blockId).toBe('block2');
        });
    });
});
//# sourceMappingURL=loops.spec.js.map
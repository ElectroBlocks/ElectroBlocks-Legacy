"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jasmine");
const frame_list_1 = require("./frame_list");
const arduino_frame_1 = require("../arduino/arduino_frame");
const empty_component_1 = require("../arduino/empty_component");
const blockly_helper_1 = require("./blockly_helper");
describe('generateFrameForInputStatement', () => {
    it('should generate a list of frames from a input that contains blocks', () => {
        frame_list_1.frameGeneratingBlocks['fake_generate_block'] = (block, previousFrame) => {
            return [new arduino_frame_1.ArduinoFrame('block_id', {}, [], new empty_component_1.EmptyComponent())];
        };
        frame_list_1.frameGeneratingBlocks['fake_generate_2_block'] = (block, previousFrame) => {
            return [
                new arduino_frame_1.ArduinoFrame('block_id', {}, [], new empty_component_1.EmptyComponent()),
                new arduino_frame_1.ArduinoFrame('block_id', {}, [], new empty_component_1.EmptyComponent()),
            ];
        };
        const block3 = {
            type: 'fake_generate',
            disabled: true,
        };
        const block2 = {
            type: 'fake_generate_2',
            disabled: false,
            nextConnection: {
                targetBlock() {
                    return block3;
                }
            }
        };
        const block1 = {
            type: 'fake_generate',
            disabled: false,
            nextConnection: {
                targetBlock() {
                    return block2;
                }
            }
        };
        const topBlock = {
            type: 'fake_generate',
            disabled: false,
            nextConnection: {
                targetBlock() {
                    return block1;
                }
            }
        };
        const containerBlock = {
            getInputTargetBlock(statementName) {
                return topBlock;
            }
        };
        const frames = blockly_helper_1.generateFrameForInputStatement(containerBlock, 'start', null);
        expect(frames.length).toBe(4);
        expect(frames[0]).toEqual(jasmine.any(arduino_frame_1.ArduinoFrame));
        expect(frames[1]).toEqual(jasmine.any(arduino_frame_1.ArduinoFrame));
        expect(frames[2]).toEqual(jasmine.any(arduino_frame_1.ArduinoFrame));
        expect(frames[3]).toEqual(jasmine.any(arduino_frame_1.ArduinoFrame));
    });
    it('should get the input value from a block', () => {
        frame_list_1.valueGeneratingBlocks['number_block'] = (block, previousFrame) => 4;
        const targetBlockContainingValue = {
            type: 'number'
        };
        const parentBlock = {
            getInput(inputName) {
                return {
                    connection: {
                        getSourceBlock() {
                            return parentBlock;
                        },
                        targetBlock() {
                            return targetBlockContainingValue;
                        }
                    }
                };
            }
        };
        expect(blockly_helper_1.getInputValue(parentBlock, 'VALUE', 0)).toBe(4);
    });
    it('should use default value if no blocks are attached', () => {
        const parentBlock = {
            getInput(inputName) {
                return {
                    connection: {
                        getSourceBlock() {
                            return parentBlock;
                        },
                        targetBlock() {
                            return null;
                        }
                    }
                };
            }
        };
        expect(blockly_helper_1.getInputValue(parentBlock, 'VALUE', 0)).toBe(0);
    });
});
//# sourceMappingURL=blockly_helper.spec.js.map
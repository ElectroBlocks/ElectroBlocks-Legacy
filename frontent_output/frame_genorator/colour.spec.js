"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arduino_frame_1 = require("../arduino/arduino_frame");
const blockHelperFunctions = require("../frame/blockly_helper");
const colour_1 = require("./colour");
const command_1 = require("../frame/command");
describe('Color Blocks', () => {
    const frameLocation = { location: 'loop', iteration: 3 };
    let block;
    let previousFrame;
    let getInputValueSpy;
    let getFieldValueSpy;
    beforeEach(() => {
        previousFrame =
            new arduino_frame_1.ArduinoFrame('block_id', {}, [], new command_1.EmptyCommand(), frameLocation);
        getInputValueSpy = spyOn(blockHelperFunctions, 'getInputValue');
        block = {
            getFieldValue(fieldName) {
            }
        };
        getFieldValueSpy = spyOn(block, 'getFieldValue');
    });
    describe('colour_picker_block', () => {
        it('should take hex value from the color picker and change to rgb object', () => {
            getFieldValueSpy.withArgs('COLOUR').and.returnValue('#1751AA');
            expect(colour_1.colour_picker_block(block)).toEqual({
                red: 23,
                green: 81,
                blue: 170
            });
        });
    });
    describe('colour_random_block', () => {
        it('should create a random colour value', () => {
            const color = colour_1.colour_random_block(block);
            expect(color.green).toBeLessThanOrEqual(255);
            expect(color.green).toBeGreaterThanOrEqual(0);
            expect(color.red).toBeLessThanOrEqual(255);
            expect(color.red).toBeGreaterThanOrEqual(0);
            expect(color.blue).toBeLessThanOrEqual(255);
            expect(color.blue).toBeGreaterThanOrEqual(0);
        });
    });
    describe('colour_rgb_block', () => {
        it('should get the rgb number values and parse into an object', () => {
            getInputValueSpy.withArgs(block, 'RED', 0, undefined).and.returnValue(90);
            getInputValueSpy.withArgs(block, 'BLUE', 0, undefined).and.returnValue(0);
            getInputValueSpy.withArgs(block, 'GREEN', 0, undefined).and.returnValue(150);
            const color = colour_1.colour_rgb_block(block);
            expect(color.red).toBe(90);
            expect(color.green).toBe(150);
            expect(color.blue).toBe(0);
        });
    });
});
//# sourceMappingURL=colour.spec.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jasmine");
const led_matrix_1 = require("./led_matrix");
const blockHelper = require("../frame/blockly_helper");
describe('led matrix', () => {
    const inputListBigBlock = [
        {
            fieldRow: [
                {
                    name: 'label',
                    state_: true
                }
            ]
        },
    ];
    for (let i = 0; i < 8; i += 1) {
        const fieldRow = [];
        for (let j = 0; j < 8; j += 1) {
            fieldRow.push({
                name: `${i},${j}`,
                state_: i % 2 === 0
            });
        }
        inputListBigBlock.push({
            fieldRow: fieldRow
        });
    }
    let bigBlock = {
        id: 'bigBlock',
        inputList: inputListBigBlock
    };
    let simpleBlock = {
        id: 'simpleblock',
        getFieldValue(fieldName) {
        }
    };
    it('should be able to draw a pattern with the big block and then set one led with individual block', () => {
        let command = '';
        for (let i = 0; i < 8; i += 1) {
            for (let j = 0; j < 8; j += 1) {
                command += `M-LC-${i}:${j}:${i % 2 == 0 ? 'ON' : 'OFF'}|`;
            }
        }
        const [frame] = led_matrix_1.led_matrix_make_draw_block(bigBlock, { iteration: 1, location: 'loop' });
        expect(frame.nextCommand().command).toBe(command);
        const getFieldValueSimpleBlockSpy = spyOn(simpleBlock, 'getFieldValue');
        const getInputValueSpy = spyOn(blockHelper, 'getInputValue');
        getInputValueSpy.withArgs(simpleBlock, 'ROW', 1, frame).and.returnValue(1);
        getInputValueSpy.withArgs(simpleBlock, 'COLUMN', 1, frame).and.returnValue(1);
        getFieldValueSimpleBlockSpy.withArgs('STATE').and.returnValue('OFF');
        const [frame2] = led_matrix_1.led_matrix_turn_one_on_off_block(simpleBlock, { iteration: 1, location: 'loop' }, frame);
        const tinyCommands = command.split('|');
        tinyCommands[0] = 'M-LC-0:0:OFF';
        command = tinyCommands.join('|');
        expect(frame2.nextCommand().command).toBe(command);
    });
});
//# sourceMappingURL=led_matrix.spec.js.map
import 'jasmine';
import { Block } from 'blockly';
import {
  led_matrix_make_draw_block,
  led_matrix_turn_one_on_off_block
} from './led_matrix';
import * as blockHelper from '../frame/blockly_helper';
import { LedMatrixState } from '../arduino/state/led_matrix.state';

describe('led matrix', () => {
  const inputListBigBlock = [
    {
      fieldRow: [
        {
          name: 'label',
          getValueBoolean() {
            return true;
          }
        }
      ]
    }
  ];

  for (let i = 1; i <= 8; i += 1) {
    const fieldRow = [];
    for (let j = 1; j <= 8; j += 1) {
      fieldRow.push({
        name: `${i},${j}`,
        getValueBoolean() {
          return i % 2 === 0;
        }
      });
    }
    inputListBigBlock.push({
      fieldRow: fieldRow
    });
  }

  const bigBlock: any | Block = {
    id: 'bigBlock',
    inputList: inputListBigBlock
  };

  const simpleBlock: any | Block = {
    id: 'simpleblock',
    getFieldValue(fieldName: string): any {}
  };

  it('should be able to draw a pattern with the big block and then set one led with individual block', () => {
    const [frame] = led_matrix_make_draw_block(bigBlock, {
      iteration: 1,
      location: 'loop'
    });

    const ledMatrixState1 = frame.state.components.find(
      component => component instanceof LedMatrixState
    ) as LedMatrixState;

    for (let i = 1; i <= 8; i += 1) {
      for (let j = 1; j <= 8; j += 1) {
        const led = ledMatrixState1.leds.find(
          led => led.row == i && led.col == j
        );
        expect(led.isOn).toBe(i % 2 == 0);
      }
    }

    const getFieldValueSimpleBlockSpy = spyOn(simpleBlock, 'getFieldValue');
    const getInputValueSpy = spyOn(blockHelper, 'getInputValue');

    getInputValueSpy
      .withArgs(
        simpleBlock,
        'ROW',
        1,
        { iteration: 1, location: 'loop' },
        frame
      )
      .and.returnValue(1);
    getInputValueSpy
      .withArgs(
        simpleBlock,
        'COLUMN',
        1,
        { iteration: 1, location: 'loop' },
        frame
      )
      .and.returnValue(1);
    getFieldValueSimpleBlockSpy.withArgs('STATE').and.returnValue('OFF');

    const [frame2] = led_matrix_turn_one_on_off_block(
      simpleBlock,
      { iteration: 1, location: 'loop' },
      frame
    );
    const ledMatrixState2 = frame2.state.components.find(
      component => component instanceof LedMatrixState
    ) as LedMatrixState;

    for (let i = 1; i <= 8; i += 1) {
      for (let j = 1; j <= 8; j += 1) {
        const led = ledMatrixState2.leds.find(
          led => led.row == i && led.col == j
        );

        if (i == 1 && j == 1) {
          expect(led.isOn).toBeFalsy(); // This is the change we are testing
          continue;
        }

        expect(led.isOn).toBe(i % 2 == 0);
      }
    }
  });
});

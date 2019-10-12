import 'jasmine';
import { Block } from 'blockly';
import * as blockHelper from "../frame/blockly_helper";
import { delay_block_block } from "./time";

describe('time', () => {

	const frameLocation = { location: 'loop', iteration: 3 };

	let block: any|Block;

	let getInputValueSpy: jasmine.Spy;

	beforeEach(() => {
		block =  {
			id: 'block_id',
			getFieldValue( fieldName: string ): any {
			}
		};

		getInputValueSpy = spyOn(blockHelper, 'getInputValue');

	});
	describe('delay_block_block', () => {

		it ('should create a delay arduino.command in frame', () => {
			getInputValueSpy.withArgs( block, 'DELAY', 1, frameLocation, undefined )
				.and.returnValue( 2.432343 );

			const [ frame ] = delay_block_block( block, frameLocation );

			expect( frame.state.delay ).toBe( 2.432343 * 1000 );
		});
	});

});

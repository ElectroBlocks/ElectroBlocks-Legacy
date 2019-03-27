import 'jasmine';
import { Block } from "../frame/block";
import * as blockHelper from "../frame/blockly_helper";
import { delay_block_block } from "./time";
import { TimeCommand } from "../frame/command";

describe('time', () => {

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

		it ('should create a delay command in frame', () => {
			getInputValueSpy.withArgs( block, 'DELAY', 1, undefined )
				.and.returnValue( 2.432343 );

			const [ frame ] = delay_block_block( block );

			expect( frame.command instanceof TimeCommand ).toBeTruthy();
			expect( frame.command.command ).toBe( "2432" );
		});
	});

});
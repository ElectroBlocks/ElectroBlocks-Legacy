import 'jasmine';
import * as blockHelper from '../frame/blockly_helper';
import { Block, mainWorkspace } from 'blockly';
import * as Blockly from 'blockly/core';
import { Variable } from "../frame/variable";
import { procedures_callnoreturn_block } from "./function";
import { ArduinoFrame } from "../arduino/arduino_frame";


describe( 'functions', () => {

	const frameLocation = { location: 'loop', iteration: 3 };

	describe( 'procedures_callnoreturn_block', () => {
		it( 'should generate frames for a custom block', () => {

			const functionDefinitionBlock: any | Block = {
				type: 'procedures_defnoreturn',
				id: 'asdfasdfasdfas',
				getProcedureDef(): [ string, string[], boolean, Variable[] ] {
					return [ 'func_name', [], false, [
						{
							type: 'Number',
							name: 'var1',
							value: 3
						},
						{
							type: 'String',
							name: 'var2',
							value: 'hello'
						}

					] ]
				}
			};

			const block2: any | Block = {
				type: 'anotherblock'
			};

			const blocklyMock: any | Blockly = {
				mainWorkspace: {
					getTopBlocks: () => {
						return [
							functionDefinitionBlock,
							block2
						]
					}
				}
			};

			const functionCallBlock: any | Block = {
				id: 'fadssdf',

				getProcedureCall() {
					return 'func_name';
				}
			};

			Blockly.mainWorkspace = blocklyMock.mainWorkspace;

			const getInputValueSpy = spyOn( blockHelper, 'getInputValue' );
			getInputValueSpy.withArgs( functionCallBlock, 'ARG0', 0 , frameLocation, undefined )
				.and.returnValue( 34 );

			getInputValueSpy.withArgs( functionCallBlock, 'ARG1', '', frameLocation, undefined )
				.and.returnValue( 'Hello World' );

			spyOn( blockHelper, 'generateFrameForInputStatement' )
				.withArgs( functionDefinitionBlock, 'STACK', frameLocation,  jasmine.any( ArduinoFrame ) )
				.and.returnValue( [ ArduinoFrame.makeEmptyFrame( 'block_23', frameLocation ), ArduinoFrame.makeEmptyFrame( 'block_23423', frameLocation ) ] );

			const frames = procedures_callnoreturn_block( functionCallBlock, frameLocation );
			// Testing the number of frames is right.
			expect( frames.length ).toBe( 4 );

			const definitionFrameBlock = frames[1];
			// Testing that values get assigned to the definition block
			expect(definitionFrameBlock.state.variables['var1'].type).toBe('Number');
			expect(definitionFrameBlock.state.variables['var1'].name).toBe('var1');
			expect(definitionFrameBlock.state.variables['var1'].value).toBe(34);

			expect(definitionFrameBlock.state.variables['var2'].value).toBe('Hello World');
			expect(definitionFrameBlock.state.variables['var2'].name).toBe('var2');
			expect(definitionFrameBlock.state.variables['var2'].type).toBe('String');
		} );
	} );
} );

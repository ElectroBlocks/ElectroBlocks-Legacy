import 'jasmine';
import { Block, Blockly, } from "../frame/block";
import * as blockHelperFunctions from '../frame/blockly_helper';
import * as blockly from '../frame/block';
import {
	variables_get_colour_block,
	variables_get_number_block,
	variables_get_string_block,
	variables_set_boolean_block,
	variables_set_colour_block,
	variables_set_number_block,
	variables_set_string_block
} from "./variables";
import { ArduinoFrame } from "../arduino/arduino_frame";
import { EmptyCommand } from "../frame/command";

describe('Variables Frame Generators', () => {


	let block: any|Block;

	let blocklyMock: any|Blockly;

	beforeEach(() => {
		blocklyMock = {
			mainWorkspace: {
				getVariableById: () => { }
			}
		};

		block =  {
			id: 'block_id',
			getFieldValue( fieldName: string ): any {
			}
		};
	});

	const mockSetVariable =
		(type: string, variableName: string, defaultValue: any, value: any) => {
			spyOn(blockly, 'getBlockly').and.returnValue(blocklyMock);

			spyOn(block, 'getFieldValue').withArgs('VAR')
				.and.returnValue('variable_id');

			spyOn(blockHelperFunctions, 'getInputValue')
				.withArgs(block, 'VALUE', defaultValue, jasmine.any(ArduinoFrame))
				.and.returnValue(value);

			spyOn(blocklyMock.mainWorkspace, 'getVariableById')
				.withArgs('variable_id')
				.and.returnValue({
				type,
				name: variableName
			});
		};

	const mockGetVariable = (type: string, variableName: string) => {

		spyOn(blockly, 'getBlockly').and.returnValue(blocklyMock);

		spyOn(block, 'getFieldValue').withArgs('VAR')
			.and.returnValue('variable_id');

		spyOn(blocklyMock.mainWorkspace, 'getVariableById')
			.withArgs('variable_id')
			.and.returnValue({
			type,
			name: variableName
		});
	};

	describe('variables_set_number_block', () => {
		it ('Set number variable value and name in frame.', () => {

			mockSetVariable(
				'Number',
				'variable_name',
				0,
				32
			);

			let [frame] = variables_set_number_block(block);

			expect(frame.blockId).toBe(block.id);
			expect(frame.variables['variable_name'].name).toBe('variable_name');
			expect(frame.variables['variable_name'].value).toBe(32);
			expect(frame.variables['variable_name'].type).toBe('Number');
		});
	});

	describe('variables_set_string_block', () => {
		it ('Set string variable value and name in frame.', () => {

			mockSetVariable(
				'String',
				'variable_name',
				'',
				'Hello World'
			);

			let [frame] = variables_set_string_block(block);

			expect(frame.blockId).toBe(block.id);
			expect(frame.variables['variable_name'].name).toBe('variable_name');
			expect(frame.variables['variable_name'].value).toBe('Hello World');
			expect(frame.variables['variable_name'].type).toBe('String');
		});
	});

	describe('variables_set_boolean_block', () => {
		it ('Set boolean variable value and name in frame.', () => {

			mockSetVariable(
				'Boolean',
				'variable_name',
				true,
				true
			);

			let [frame] = variables_set_boolean_block(block);

			expect(frame.blockId).toBe(block.id);
			expect(frame.variables['variable_name'].name).toBe('variable_name');
			expect(frame.variables['variable_name'].value).toBe(true);
			expect(frame.variables['variable_name'].type).toBe('Boolean');
		});
	});

	describe('variables_set_boolean_block', () => {
		it ('Set boolean variable to false.', () => {

			mockSetVariable(
				'Boolean',
				'variable_name',
				true,
				false
			);

			let [frame] = variables_set_boolean_block(block);

			expect(frame.blockId).toBe(block.id);
			expect(frame.variables['variable_name'].name).toBe('variable_name');
			expect(frame.variables['variable_name'].value).toBe(false);
			expect(frame.variables['variable_name'].type).toBe('Boolean');
		});
	});

	describe('variables_set_colour_block', () => {
		it ('Set color variable value and name in frame.', () => {

			mockSetVariable(
				'Colour',
				'variable_name',
				{red: 0, green:0, blue: 0 },
				{red: 20, green: 0, blue: 30 }
			);

			let [frame] = variables_set_colour_block(block);

			expect(frame.blockId).toBe(block.id);
			expect(frame.variables['variable_name'].name).toBe('variable_name');
			expect(frame.variables['variable_name'].value)
				.toEqual({red: 20, green: 0, blue: 30});
			expect(frame.variables['variable_name'].type).toBe('Colour');
		});
	});


	describe('variables_get_colour_block', () => {
		it('get the color variable from the previous frame', () => {
			let previousFrame = new ArduinoFrame(
				'block_id',
				{'variable_name':
						{
							name: 'variable_name',
							type: 'Colour',
							value: {red: 30, green: 30, blue: 20}
						}
				},
				[],
				new EmptyCommand()
			);

			mockGetVariable('Colour', 'variable_name');

			expect(variables_get_colour_block(block, previousFrame))
				.toEqual({red: 30, green: 30, blue: 20});

		});
	});


	describe('variables_get_number_block', () => {
		it('get the number variable from the previous frame', () => {
			let previousFrame = new ArduinoFrame(
				'block_id',
				{'variable_name':
						{
							name: 'variable_name',
							type: 'Number',
							value: 33
						}
				},
				[],
				new EmptyCommand()
			);

			mockGetVariable('colour', 'variable_name');

			expect(variables_get_number_block(block, previousFrame)).toBe(33);
		});
	});

	describe('variables_get_string_block', () => {
		it('get the string variable from the previous frame', () => {
			let previousFrame = new ArduinoFrame(
				'block_id',
				{'variable_name':
						{
							name: 'variable_name',
							type: 'String',
							value: 'Hello World'
						}
				},
				[],
				new EmptyCommand()
			);

			mockGetVariable('colour', 'variable_name');

			expect(variables_get_string_block(block, previousFrame))
				.toBe('Hello World');

		});
	});

	describe('variables_get_string_block', () => {
		it('get the boolean variable from the previous frame', () => {
			let previousFrame = new ArduinoFrame(
				'block_id',
				{'variable_name':
						{
							name: 'variable_name',
							type: 'Boolean',
							value: false
						}
				},
				[],
				new EmptyCommand()
			);

			mockGetVariable('Boolean', 'variable_name');

			expect(variables_get_string_block(block, previousFrame)).toBe(false);
		});
	});

	describe('variables_set_colour_block', () => {
		it ('should use the default value if no block is attached', () => {
			mockSetVariable(
				'Colour',
				'variable_name',
				{red: 0, green:0, blue: 0 },
				null
			);

			let [frame] = variables_set_colour_block(block);

			expect(frame.blockId).toBe(block.id);
			expect(frame.variables['variable_name'].name).toBe('variable_name');
			expect(frame.variables['variable_name'].value)
				.toEqual({red: 0, green:0, blue: 0 });
			expect(frame.variables['variable_name'].type).toBe('Colour');
		});
	});

});

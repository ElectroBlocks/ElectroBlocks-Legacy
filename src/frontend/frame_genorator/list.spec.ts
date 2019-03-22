import {
	create_list_boolean_block_block, create_list_colour_block_block,
	create_list_number_block_block,
	create_list_string_block_block
} from "./list";
import * as blockly from "../frame/block";
import { Block, Blockly } from "../frame/block";
import { Variable } from "../frame/variable";
import { ArduinoFrame } from "../arduino/arduino_frame";
import { ARDUINO_UNO_PINS, Pin, PIN_TYPE } from "../arduino/pin";
import { EmptyComponent } from "../arduino/empty_component";

describe('list generators', () => {

	let block: any|Block;

	let blocklyMock: any|Blockly;

	let fakeVariable: any|Variable = {
		'name': 'number list',
		'value': [],
		'type': 'Number List'
	};

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

		spyOn(blocklyMock.mainWorkspace, 'getVariableById')
			.withArgs('variable_id').and
			.callFake(() => fakeVariable);

		spyOn(block, 'getFieldValue')
			.withArgs('VAR')
			.and.returnValue('variable_id');

		spyOn(blockly, 'getBlockly').and.returnValue(blocklyMock);

	});

	describe('create_list_number_block_block', () => {
		it('should create an array variable in the frame that is blank', () => {

			fakeVariable = {
				type: 'Number List',
				value: [],
				name: 'numberList'
			};

			const [frame] = create_list_number_block_block(block);

			expect(frame.variables['numberList'].value).toEqual([]);
			expect(frame.variables['numberList'].name).toBe('numberList');
			expect(frame.variables['numberList'].type).toBe('Number List');
		});

		it ('should copy over variables and components', () => {

			const pinComponent = new Pin(ARDUINO_UNO_PINS.PIN_1, PIN_TYPE.DIGITAL, 1);

			const previousFrame = new ArduinoFrame('block23', {
				'bill': {
					type: 'Number',
					name: 'bill',
					value: 32
				}},
				[pinComponent],
				new EmptyComponent()
			);

			fakeVariable = {
				type: 'Number List',
				value: [],
				name: 'numberList'
			};

			const [frame] = create_list_number_block_block(block, previousFrame);

			expect(frame.variables['numberList'].value).toEqual([]);
			expect(frame.variables['numberList'].name).toBe('numberList');
			expect(frame.variables['numberList'].type).toBe('Number List');

			expect(frame.variables['bill'].type).toBe('Number');
			expect(frame.variables['bill'].value).toBe(32);
			expect(frame.variables['bill'].name).toBe('bill')

			expect(frame.components[0]).toBe(pinComponent);
		});
	});

	describe('create_list_string_block_block', () => {

		it ('create_list_string_block_block', () => {
			fakeVariable = {
				type: 'String List',
				value: [],
				name: 'stringList'
			};

			const [frame] = create_list_string_block_block(block);

			expect(frame.variables['stringList'].value).toEqual([]);
			expect(frame.variables['stringList'].name).toBe('stringList');
			expect(frame.variables['stringList'].type).toBe('String List');
		});

	});

	describe('create_list_boolean_block_block', () => {

		it ('create_list_boolean_block_block', () => {
			fakeVariable = {
				type: 'Boolean List',
				value: [],
				name: 'booleanList'
			};

			const [frame] = create_list_boolean_block_block(block);

			expect(frame.variables['booleanList'].value).toEqual([]);
			expect(frame.variables['booleanList'].name).toBe('booleanList');
			expect(frame.variables['booleanList'].type).toBe('Boolean List');
		});

	});

	describe('create_list_colour_block_block', () => {

		it ('create_list_colour_block_block', () => {
			fakeVariable = {
				type: 'Colour List',
				value: [],
				name: 'color_list'
			};

			const [frame] = create_list_colour_block_block(block);

			expect(frame.variables['color_list'].value).toEqual([]);
			expect(frame.variables['color_list'].name).toBe('color_list');
			expect(frame.variables['color_list'].type).toBe('Colour List');
		});

	});
});

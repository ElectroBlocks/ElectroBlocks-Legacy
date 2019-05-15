import 'jasmine';
import { Block } from "../frame/block";
import * as blockHelper from "../frame/blockly_helper";
import { servo_move_block } from "./servo";

describe('servo block frame', () => {

	let block1: any|Block;

	let block2: any|Block;


	let getInputValueSpy: any|jasmine.Spy;


	let getFieldValueSpyBlock1: any|jasmine.Spy;
	let getFieldValueSpyBlock2: any|jasmine.Spy;

	beforeEach(() => {
		block1 = {
			getFieldValue( fieldName: string ): any {
			},
			id: 'block1'
		};

		block2 = {
			getFieldValue( fieldName: string ): any {
			},
			id: 'block2'
		};


		getInputValueSpy = spyOn( blockHelper, 'getInputValue' );
		getFieldValueSpyBlock1 = spyOn(block1, 'getFieldValue');
		getFieldValueSpyBlock2 = spyOn(block2, 'getFieldValue');
	});

	it ('should not duplicate servos', () => {
		getFieldValueSpyBlock1.withArgs('PIN').and.returnValue(4);
		getInputValueSpy.withArgs(block1, 'DEGREE', 0, undefined).and.returnValue(30);

		const [arduinoFrame] = servo_move_block(block1, { location: 'loop', iteration: 1 });

		getFieldValueSpyBlock2.withArgs('PIN').and.returnValue(4);
		getInputValueSpy.withArgs(block2, 'DEGREE', 0, arduinoFrame).and.returnValue(120);

		const [lastArduinoFrame] = servo_move_block(block2, { location: 'loop', iteration: 1 }, arduinoFrame);

		expect(lastArduinoFrame.components.length).toBe(1);
		expect(lastArduinoFrame.command.command).toBe('M-S-4:120|');
	});

	it ('should generate 2 servos components if the pins are different', () =>{
		getFieldValueSpyBlock1.withArgs('PIN').and.returnValue(4);
		getInputValueSpy.withArgs(block1, 'DEGREE', 0, undefined).and.returnValue(30);

		const [arduinoFrame] = servo_move_block(block1, { location: 'loop', iteration: 1 });

		getFieldValueSpyBlock2.withArgs('PIN').and.returnValue(6);
		getInputValueSpy.withArgs(block2, 'DEGREE', 0, arduinoFrame).and.returnValue(120);

		const [lastArduinoFrame] = servo_move_block(block2, { location: 'loop', iteration: 1 }, arduinoFrame);

		expect(lastArduinoFrame.components.length).toBe(2);
		expect(lastArduinoFrame.command.command).toBe('M-S-6:120|');

	});

});

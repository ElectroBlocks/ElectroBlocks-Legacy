import 'jasmine';
import { Block } from "../frame/block";
import * as blockHelper from "../frame/blockly_helper";
import { move_motor_block } from "./motor";

describe('motor', () => {

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

	it ('should not duplicate motor', () => {
		getFieldValueSpyBlock1.withArgs('DIRECTION').and.returnValue('FORWARD');
		getInputValueSpy.withArgs(block1, 'MOTOR', 1, { location: 'loop', iteration: 1 }, undefined).and.returnValue(1);
		getInputValueSpy.withArgs(block1, 'SPEED', 10,{ location: 'loop', iteration: 1 }, undefined).and.returnValue(40);

		const [arduinoFrame] = move_motor_block(block1, { location: 'loop', iteration: 1 });

		getFieldValueSpyBlock2.withArgs('DIRECTION').and.returnValue('BACKWARD');
		getInputValueSpy.withArgs(block2, 'MOTOR', 1,{ location: 'loop', iteration: 1 }, arduinoFrame).and.returnValue(1);
		getInputValueSpy.withArgs(block2, 'SPEED', 10,{ location: 'loop', iteration: 1 }, arduinoFrame).and.returnValue(140);

		const [lastArduinoFrame] = move_motor_block(block2, { location: 'loop', iteration: 1 }, arduinoFrame);

		expect(lastArduinoFrame.components.length).toBe(1);
		expect(lastArduinoFrame.command.command).toBe('M-MT-1:BACKWARD:140|');
	});

	it ('should not have 2 motors if the motors are different numbers', () => {
		getFieldValueSpyBlock1.withArgs('DIRECTION').and.returnValue('FORWARD');
		getInputValueSpy.withArgs(block1, 'MOTOR', 1,{ location: 'loop', iteration: 1 }, undefined).and.returnValue(2);
		getInputValueSpy.withArgs(block1, 'SPEED', 10,{ location: 'loop', iteration: 1 }, undefined).and.returnValue(40);

		const [arduinoFrame] = move_motor_block(block1, { location: 'loop', iteration: 1 });

		getFieldValueSpyBlock2.withArgs('DIRECTION').and.returnValue('BACKWARD');
		getInputValueSpy.withArgs(block2, 'MOTOR', 1, { location: 'loop', iteration: 1 }, arduinoFrame).and.returnValue(6);
		getInputValueSpy.withArgs(block2, 'SPEED', 10, { location: 'loop', iteration: 1 }, arduinoFrame).and.returnValue(140);

		const [lastArduinoFrame] = move_motor_block(block2, { location: 'loop', iteration: 1 }, arduinoFrame);

		expect(lastArduinoFrame.components.length).toBe(2);
		expect(lastArduinoFrame.command.command).toBe('M-MT-1:BACKWARD:140|');
	});


});

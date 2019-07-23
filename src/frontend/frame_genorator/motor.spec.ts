import 'jasmine';
import { Block } from "../frame/block";
import * as blockHelper from "../frame/blockly_helper";
import { move_motor_block } from "./motor";
import { MOTOR_DIRECTION, MotorState } from "../arduino/state/motor.state";

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

		expect(lastArduinoFrame.state.components.length).toBe(1);

		const motorState = lastArduinoFrame.state.components[0] as MotorState;
		expect(motorState.motorNumber).toBe(1);
		expect(motorState.direction).toBe(MOTOR_DIRECTION.BACKWARD);
		expect(motorState.speed).toBe(140)
	});

	it ('should not have 2 motors if the motors are different numbers', () => {
		getFieldValueSpyBlock1.withArgs('DIRECTION').and.returnValue('FORWARD');
		getInputValueSpy.withArgs(block1, 'MOTOR', 1,{ location: 'loop', iteration: 1 }, undefined).and.returnValue(2);
		getInputValueSpy.withArgs(block1, 'SPEED', 10,{ location: 'loop', iteration: 1 }, undefined).and.returnValue(40);

		const [arduinoFrame] = move_motor_block(block1, { location: 'loop', iteration: 1 });

		getFieldValueSpyBlock2.withArgs('DIRECTION').and.returnValue('BACKWARD');
		getInputValueSpy.withArgs(block2, 'MOTOR', 1, { location: 'loop', iteration: 1 }, arduinoFrame).and.returnValue(4);
		getInputValueSpy.withArgs(block2, 'SPEED', 10, { location: 'loop', iteration: 1 }, arduinoFrame).and.returnValue(140);

		const [lastArduinoFrame] = move_motor_block(block2, { location: 'loop', iteration: 1 }, arduinoFrame);

		const motorState1 = lastArduinoFrame.state.components[0] as MotorState;
		const motorState2 = lastArduinoFrame.state.components[1] as MotorState;

		expect(lastArduinoFrame.state.components.length).toBe(2);
		expect(motorState1.speed).toBe(40);
		expect(motorState1.motorNumber).toBe(2);
		expect(motorState1.direction).toBe(MOTOR_DIRECTION.FORWARD);

		expect(motorState2.speed).toBe(140);
		expect(motorState2.motorNumber).toBe(4);
		expect(motorState2.direction).toBe(MOTOR_DIRECTION.BACKWARD);

	});


});

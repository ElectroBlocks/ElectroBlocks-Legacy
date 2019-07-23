import 'jasmine';
import { Block } from "../frame/block";
import * as blockHelper from "../frame/blockly_helper";
import { servo_move_block } from "./servo";
import { ServoState } from "../arduino/state/servo.state";
import { ARDUINO_UNO_PINS, stringToPin } from "../arduino/arduino_frame";

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
		getInputValueSpy.withArgs(block1, 'DEGREE', 0, { location: 'loop', iteration: 1 }, undefined).and.returnValue(30);

		const [arduinoFrame] = servo_move_block(block1, { location: 'loop', iteration: 1 });

		getFieldValueSpyBlock2.withArgs('PIN').and.returnValue(4);
		getInputValueSpy.withArgs(block2, 'DEGREE', 0, { location: 'loop', iteration: 1 }, arduinoFrame).and.returnValue(120);

		const [lastArduinoFrame] = servo_move_block(block2, { location: 'loop', iteration: 1 }, arduinoFrame);


		const servoState = lastArduinoFrame.state.components
			.filter(servo => servo instanceof ServoState)
			.find((servo: ServoState) => servo.pin == stringToPin('4')) as ServoState;

		expect(lastArduinoFrame.state.components.length).toBe(1);
		expect(servoState.pin).toBe(ARDUINO_UNO_PINS.PIN_4);
		expect(servoState.degree).toBe(120);
	});

	it ('should generate 2 servos components if the pins are different', () =>{
		getFieldValueSpyBlock1.withArgs('PIN').and.returnValue(4);
		getInputValueSpy.withArgs(block1, 'DEGREE', 0, { location: 'loop', iteration: 1 }, undefined).and.returnValue(30);

		const [arduinoFrame] = servo_move_block(block1, { location: 'loop', iteration: 1 });

		getFieldValueSpyBlock2.withArgs('PIN').and.returnValue(6);
		getInputValueSpy.withArgs(block2, 'DEGREE', 0, { location: 'loop', iteration: 1 }, arduinoFrame).and.returnValue(120);

		const [lastArduinoFrame] = servo_move_block(block2, { location: 'loop', iteration: 1 }, arduinoFrame);

		expect(lastArduinoFrame.state.components.length).toBe(2);

		const servoState1 = lastArduinoFrame.state.components
			.filter(servo => servo instanceof ServoState)
			.find((servo: ServoState) => servo.pin == stringToPin('4')) as ServoState;

		const servoState2 = lastArduinoFrame.state.components
			.filter(servo => servo instanceof ServoState)
			.find((servo: ServoState) => servo.pin == stringToPin('6')) as ServoState;


		expect(servoState1.pin).toBe(ARDUINO_UNO_PINS.PIN_4);
		expect(servoState1.degree).toBe(30);


		expect(servoState2.pin).toBe(ARDUINO_UNO_PINS.PIN_6);
		expect(servoState2.degree).toBe(120);


	});

});

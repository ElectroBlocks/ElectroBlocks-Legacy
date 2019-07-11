import 'jasmine';
import { Motor, MOTOR_DIRECTION } from "./motor";
import { COMMAND_TYPE } from "../frame/command";

describe('Motor', () => {

	const motor1 = new Motor(1, MOTOR_DIRECTION.BACKWARD, 20);
	const motor2 = new Motor(3, MOTOR_DIRECTION.FORWARD, 120);

	it ('should be not have an empty setup arduino.command', () => {
		expect(motor1.setupCommandUSB().type).toEqual(COMMAND_TYPE.EMPTY);
		expect(motor2.setupCommandUSB().type).toEqual(COMMAND_TYPE.EMPTY);
	});

	it ('should have a usb arduino.command', () => {
		expect(motor1.usbCommand().command).toEqual('M-MT-1:BACKWARD:20|');
		expect(motor2.usbCommand().command).toEqual('M-MT-3:FORWARD:120|');

		expect(motor1.setupCommandUSB().type).toEqual(COMMAND_TYPE.EMPTY);
		expect(motor2.setupCommandUSB().type).toEqual(COMMAND_TYPE.EMPTY);
	});

});

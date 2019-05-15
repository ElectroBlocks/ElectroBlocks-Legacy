import { Block } from "../frame/block";
import { FrameLocation } from "../frame/frame";
import { ArduinoFrame } from "../arduino/arduino_frame";
import { getInputValue } from "../frame/blockly_helper";
import { Motor, MOTOR_DIRECTION } from "../arduino/motor";
import { USB } from "../arduino/usb";

export const move_motor_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame) : ArduinoFrame[] => {

	let motorNumber = parseInt(getInputValue(block, 'MOTOR', 1, previousFrame).toString());

	if (motorNumber < 0 || motorNumber > 4) {
		motorNumber = 1;
	}

	const direction = block.getFieldValue('DIRECTION') as MOTOR_DIRECTION;

	const speed = parseInt(getInputValue(block, 'SPEED', 10, previousFrame).toString());

	let components: USB[] = previousFrame ? previousFrame.components : [];

	components = components.filter(component =>
		!(component instanceof Motor && component.motorNumber == motorNumber));

	const motor = new Motor(motorNumber as 1|2|3|4, direction, speed);

	components.push(motor);

	const variables = previousFrame ? previousFrame.variables : {};

	return [new ArduinoFrame(block.id, variables, components, motor.usbCommand(), frameLocation)]
};

import { Block } from "../frame/block";
import { ArduinoFrame } from "../arduino/arduino_frame";
import { stringToPin } from "../arduino/pin";
import { Servo } from "../arduino/servo";
import { getInputValue } from "../frame/blockly_helper";
import { FrameLocation } from "../frame/frame";
import { USB } from "../arduino/usb";


export const servo_move_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame) : ArduinoFrame[] => {

	const pin = block.getFieldValue('PIN').toString();

	const angle = parseInt(getInputValue(
		block,
		'DEGREE',
		0,
		previousFrame).toString());

	let components: USB[] = previousFrame ? previousFrame.components : [];

	components = components.filter(component =>
		!(component instanceof Servo && component.pin == stringToPin(pin)));

	const servo = new Servo(stringToPin(pin), angle);

	components.push(servo);

	const variables = previousFrame ? previousFrame.variables : {};

	return [new ArduinoFrame(block.id, variables, components, servo.usbCommand(), frameLocation)]
};

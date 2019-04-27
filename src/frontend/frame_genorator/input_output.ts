import { Block } from "../frame/block";
import { ArduinoFrame } from "../arduino/arduino_frame";
import { Pin, PIN_TYPE, stringToPin } from "../arduino/pin";
import { FrameLocation } from "../frame/frame";
import { getInputValue } from "../frame/blockly_helper";

export const digital_write_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame): ArduinoFrame[] => {

	const pin = block.getFieldValue('PIN');
	const state = block.getFieldValue('STATE') == 'ON' ? 1 : 0;

	return generatePinFrame(block, frameLocation, pin, state, PIN_TYPE.DIGITAL, previousFrame);
};

export const analog_write_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame): ArduinoFrame[] => {
	const pin = block.getFieldValue('PIN');
	const state = parseInt(getInputValue(
		block,
		'WRITE_VALUE',
		0,
		previousFrame) as string
	);

	return generatePinFrame(block, frameLocation, pin, state, PIN_TYPE.ANALOG, previousFrame);

};

const generatePinFrame = (block: Block, frameLocation: FrameLocation, pin: string, state: number, pinType: PIN_TYPE,  previousFrame?: ArduinoFrame) => {
	let components = previousFrame ? previousFrame.components : [];

	components = components.filter(component =>
		!(component instanceof Pin && component.pinNumber == stringToPin(pin)));

	const pinComponent = new Pin(stringToPin(pin), pinType, state);

	components.push(pinComponent);

	const variables = previousFrame ?  previousFrame.variables: {};

	return [new ArduinoFrame(block.id, variables, components, pinComponent.usbCommand(), frameLocation)];
};

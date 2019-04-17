import { Block } from "../frame/block";
import { ArduinoFrame } from "../arduino/arduino_frame";
import { Pin, PIN_TYPE, stringToPin } from "../arduino/pin";
import { inputState } from "../frame/input_state";

export const digital_write_block = (block: Block, previousFrame?: ArduinoFrame): ArduinoFrame[] => {

	const pin = block.getFieldValue('PIN');
	const state = block.getFieldValue('STATE') == 'ON' ? '1' : '0';

	let components = previousFrame ? previousFrame.components : [];

	const pinComponent = new Pin(stringToPin(pin), PIN_TYPE.DIGITAL, parseInt(state));

	components.push(pinComponent);

	const variables = previousFrame ?  previousFrame.variables: {};


	return [new ArduinoFrame(block.id, variables, components, pinComponent.usbCommand())];
};

export const is_button_pressed_block = (block: Block, previousFrame?: ArduinoFrame): boolean => {
	return inputState.addBlockCall(block.id).value;
};

export const digital_read_block = (block: Block, previousFrame?: ArduinoFrame): boolean => {
	return inputState.addBlockCall(block.id).value;
};

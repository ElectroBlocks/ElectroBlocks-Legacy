import { Block } from "../frame/block";
import { ArduinoFrame } from "../arduino/arduino_frame";
import { Pin, PIN_TYPE, stringToPin } from "../arduino/pin";
import { FrameLocation } from "../frame/frame";

export const digital_write_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame): ArduinoFrame[] => {

	const pin = block.getFieldValue('PIN');
	const state = block.getFieldValue('STATE') == 'ON' ? '1' : '0';

	let components = previousFrame ? previousFrame.components : [];

	const pinComponent = new Pin(stringToPin(pin), PIN_TYPE.DIGITAL, parseInt(state));

	components.push(pinComponent);

	const variables = previousFrame ?  previousFrame.variables: {};


	return [new ArduinoFrame(block.id, variables, components, pinComponent.usbCommand(), frameLocation)];
};


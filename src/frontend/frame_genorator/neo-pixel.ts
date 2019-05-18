import { Block } from "../frame/block";
import { FrameLocation } from "../frame/frame";
import { ArduinoFrame } from "../arduino/arduino_frame";
import { getInputValue } from "../frame/blockly_helper";
import { USB } from "../arduino/usb";
import { Servo } from "../arduino/servo";
import { stringToPin } from "../arduino/pin";
import { NeoPixelStrip } from "../arduino/neo_pixels";
import { EmptyCommand } from "../frame/command";


export const neo_pixel_setup_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame) : ArduinoFrame[] => {

	const pin = block.getFieldValue('PIN').toString();

	const numberOfPixels = parseInt(getInputValue(
		block,
		'NUMBER_LEDS',
		0,
		previousFrame).toString());

	const neoPixelStrip = new NeoPixelStrip(stringToPin(pin), numberOfPixels);


	const variables = previousFrame ? previousFrame.variables : {};

	const components: USB[] = previousFrame ? previousFrame.components : [];
	components.push(neoPixelStrip);

	return [new ArduinoFrame(block.id, variables, components, new EmptyCommand(), frameLocation)]

};



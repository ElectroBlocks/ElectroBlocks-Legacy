import { Block } from "../frame/block";
import { FrameLocation } from "../frame/frame";
import { ArduinoFrame } from "../arduino/arduino_frame";
import { getInputValue } from "../frame/blockly_helper";
import { USB } from "../arduino/usb";
import { stringToPin } from "../arduino/pin";
import { NeoPixelStrip, NeoPixel } from "../arduino/neo_pixels";
import { EmptyCommand } from "../frame/command";
import { Color } from "./colour";


export const neo_pixel_setup_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame) : ArduinoFrame[] => {

	const pin = block.getFieldValue('PIN').toString();

	const numberOfPixels = parseInt(getInputValue(
		block,
		'NUMBER_LEDS',
		30,
		previousFrame).toString());

	const neoPixelStrip = new NeoPixelStrip(stringToPin(pin), numberOfPixels);


	const variables = previousFrame ? previousFrame.variables : {};

	const components: USB[] = previousFrame ? previousFrame.components : [];
	components.push(neoPixelStrip);

	return [new ArduinoFrame(block.id, variables, components, new EmptyCommand(), frameLocation)]

};


export const neo_pixel_set_color_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame) : ArduinoFrame[] => {

	const color = getInputValue(
		block,
		'COLOR',
		{ red: 33, green: 0, blue: 0 },
		previousFrame) as Color;
	
	const position = parseInt(getInputValue(
		block,
		'POSITION',
		1,
		previousFrame).toString());

	const neoPixelStrip = previousFrame.components.find(usb => usb instanceof NeoPixelStrip) as NeoPixelStrip;

	neoPixelStrip.setLed(new NeoPixel(color, position));

	return [
		new ArduinoFrame(block.id, previousFrame.variables, previousFrame.components, neoPixelStrip.usbCommand(), frameLocation)
	];
};

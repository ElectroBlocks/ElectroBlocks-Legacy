import { Block } from "../frame/block";
import { ArduinoFrame, stringToPin } from "../arduino/arduino_frame";
import { PIN_TYPE } from "../arduino/state/pin.state";
import { FrameLocation } from "../frame/frame";
import { getInputValue } from "../frame/blockly_helper";
import { PinState } from "../arduino/state/pin.state";
import { ArduinoState } from "../arduino/state/arduino.state";
import { ActionType } from "../frame/action.type";

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
		frameLocation,
		previousFrame) as string
	);

	return generatePinFrame(block, frameLocation, pin, state, PIN_TYPE.ANALOG, previousFrame);

};

const generatePinFrame = (block: Block, frameLocation: FrameLocation, pin: string, state: number, pinType: PIN_TYPE,  previousFrame?: ArduinoFrame) => {
	const arduinoState = previousFrame ? previousFrame.copyState() : ArduinoState.makeEmptyState();

	const pinState = arduinoState.components.find(component =>
		component instanceof PinState && component.pin == stringToPin(pin));

	if (pinState instanceof PinState) {
		const index = arduinoState.components.indexOf(pinState);
		arduinoState.components[index] = new PinState(stringToPin(pin), pinType, state);
	} else {
		arduinoState.components.push(new PinState(stringToPin(pin), pinType, state));
	}

	const actionType = pinType == PIN_TYPE.ANALOG ? ActionType.ANALOG_PIN_WRITE  : ActionType.DIGITAL_PIN_WRITE;

	return [new ArduinoFrame(block.id, arduinoState, frameLocation, actionType)];
};

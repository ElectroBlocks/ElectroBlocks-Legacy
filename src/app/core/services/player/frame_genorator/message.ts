import { Block } from 'blockly';
import { FrameLocation } from "../frame/frame";
import { ArduinoFrame } from "../arduino/arduino_frame";
import { getInputValue } from "../frame/blockly_helper";
import { ArduinoState } from "../arduino/state/arduino.state";
import { BluetoothState } from "../arduino/state/bluetooth.state";

export const send_message_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame):ArduinoFrame[] => {

	const isBluetooth = block.type === 'bt_send_message';

	const message = getInputValue(block, 'MESSAGE', '',frameLocation, previousFrame).toString();

	const state = previousFrame ? previousFrame.copyState() : ArduinoState.makeEmptyState();

	if (isBluetooth) {

		const bluetooth = state.components.find(c => c instanceof BluetoothState) as BluetoothState;

		const componentIndex = state.components.findIndex(c => c instanceof BluetoothState);


		state.components[componentIndex] = new BluetoothState(bluetooth.rxPin, bluetooth.txPin, '', message);

		return [
			new ArduinoFrame(block.id, state, frameLocation)
		];
	}

	const updatedState = new ArduinoState(state.components, state.variables, false, message);

	return [
		new ArduinoFrame(
			block.id,updatedState, frameLocation
		)];
};

export const bt_send_message_block = send_message_block;

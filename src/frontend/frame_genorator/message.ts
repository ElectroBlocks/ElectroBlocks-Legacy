import { Block } from "../frame/block";
import { FrameLocation } from "../frame/frame";
import { ArduinoFrame } from "../arduino/arduino_frame";
import { BluetoothCommand, MessageCommand } from "../frame/command";
import { getInputValue } from "../frame/blockly_helper";

export const send_message_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame):ArduinoFrame[] => {

	const isBluetooth = block.type === 'bt_send_message';

	const message = getInputValue(block, 'MESSAGE', '',frameLocation, previousFrame).toString();

	const command = isBluetooth ? new BluetoothCommand(message) :
		new MessageCommand(message);

	if (previousFrame) {
		return [
			new ArduinoFrame(block.id, previousFrame.variables, previousFrame.components, command, frameLocation)
		];
	}

	return [
		new ArduinoFrame(
			block.id,{}, [], command, frameLocation
		)];
};

export const bt_send_message_block = send_message_block;

import { Block } from 'blockly';
import { FrameLocation } from '../frame/frame';
import { ArduinoFrame } from '../arduino/arduino_frame';
import { ArduinoState } from '../arduino/state/arduino.state';

export const debug_block = (block: Block,
                            frameLocation: FrameLocation,
                            previousFrame?: ArduinoFrame): ArduinoFrame[] => {

	const state = previousFrame ? previousFrame.copyState() :  ArduinoState.makeEmptyState();

	return [ new ArduinoFrame(block.id, state, frameLocation) ];
};

import 'jasmine';
import { ArduinoFrame } from "../arduino/arduino_frame";
import { EmptyCommand } from "../frame/command";
import { ir_remote_scan_again_block, temp_get_temp_block } from "./pass_through_block";
import { Block } from "../frame/block";
import { ArduinoState } from "../arduino/state/arduino.state";

describe('pass through frame generator', () => {

	const previousFrame = new ArduinoFrame('block1', ArduinoState.makeEmptyState(),
		{ location: 'loop', iteration: 1 }
	);

	const block: any|Block = {
		id: 'block_id'
	};

	it ('should use the previous frame if defined', () => {

		const [frame] = temp_get_temp_block(block, {iteration: 1, location: 'loop'}, previousFrame);

		expect(frame.state.variables['fred'].value).toBe('blue');
	});

	it ('should use empty values if no frame is provided', () => {
		const [frame] = ir_remote_scan_again_block(block, {iteration: 1, location: 'loop'});

		expect(frame.state.components).toEqual([]);
		expect(frame.state.variables).toEqual({});

	});


});

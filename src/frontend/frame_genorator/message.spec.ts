import 'jasmine';
import { Block } from "../frame/block";
import { ArduinoFrame } from "../arduino/arduino_frame";
import { EmptyCommand } from "../frame/command";
import { send_message_block } from "./message";

describe('message', () => {

	const block: any|Block = {
		id: 'blockId'
	};

	const previousFrame = new ArduinoFrame('block1', {
		fred: {
			name: 'fred',
			type: 'String',
			value: 'blue'
		},
	},
		[],
		new EmptyCommand(),
		{ location: 'loop', iteration: 1 }
	);

	it ('should use the previous frame if available', () => {
		const frames = send_message_block(block, { location: 'loop', iteration: 1 }, previousFrame);

		expect(frames.length).toBe(1);
		const [frame] = frames;

		expect(frame.variables['fred'].value).toBe('blue');
	});

	it ('should to an empty command frame if previous frame not available', () => {
		const frames = send_message_block(block, { location: 'loop', iteration: 1 });

		expect(frames.length).toBe(1);
		const [frame] = frames;

		expect(frame.variables).toEqual({});
	});

});

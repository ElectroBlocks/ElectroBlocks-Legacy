import 'jasmine';
import { Block } from "../frame/block";
import { ArduinoFrame } from "../arduino/arduino_frame";
import { EmptyCommand } from "../frame/command";
import { debug_block } from "./debug";


describe('debug', () => {

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


	it('should copy over the variables', () => {
		const frames = debug_block(block, { location: 'loop', iteration: 1 }, previousFrame);

		expect(frames.length).toBe(1);
		const [frame] = frames;

		expect(frame.variables['fred'].value).toBe('blue');

	});

	it('should be able to work without previous frame', () => {
		const frames = debug_block(block, { location: 'loop', iteration: 1 });

		expect(frames.length).toBe(1);
		const [frame] = frames;

		expect(frame.variables).toEqual({});

	});

});

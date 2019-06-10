import 'jasmine';
import { FramePlayer } from "./frame_player";
import { ExecuteSilentFrame } from "./frame_execute";
import { ArduinoFrame } from "../arduino/arduino_frame";
import { EmptyCommand } from "./command";
import * as  BluebirdPromise   from 'bluebird';
import { tap } from "rxjs/operators";

describe('Frame Player', () => {


	beforeEach(() => {


		jasmine.clock().install();
		spyOn(BluebirdPromise, 'delay').and.callFake((time: number) => {
			setTimeout(() => {
				console.log('inside callback');
			}, time);
		});

	});

	afterEach(() => {
		jasmine.clock().uninstall();
	});


	it ('it should be able to load a bunch of frames and at the start be at 0 frame', () => {

		const framePlayer = new FramePlayer(new ExecuteSilentFrame());

		const frame1 = new ArduinoFrame('b1', {}, [], new EmptyCommand(), {
		location: 'pre-setup', iteration: 0
	});

	framePlayer.setFrames([
		frame1,
		new ArduinoFrame('b1', {}, [], new EmptyCommand(), {
			location: 'setup', iteration: 0
		}),
		new ArduinoFrame('b1', {}, [], new EmptyCommand(), {
			location: 'loop', iteration: 0
		}),
		new ArduinoFrame('b1', {}, [], new EmptyCommand(), {
			location: 'loop', iteration: 1
		}),
	]);

	expect(framePlayer['currentFrame']).toBe(0);
	expect(framePlayer['currentFrameLocation']).toEqual({ iteration: 0, location: 'pre-setup' });

	});

	it ('should be able to call all the frames', async () => {
		const framePlayer = new FramePlayer(new ExecuteSilentFrame());

		framePlayer.setFrames([
			new ArduinoFrame('b1', {}, [], new EmptyCommand(), {
				location: 'setup', iteration: 0
			}),
			new ArduinoFrame('b1', {}, [], new EmptyCommand(), {
				location: 'loop', iteration: 0
			}),
			new ArduinoFrame('b1', {}, [], new EmptyCommand(), {
				location: 'loop', iteration: 1
			}),
		]);
		let numberOfFramesExecuted = 0;


		framePlayer.changeFrame$.pipe(
				tap(() => numberOfFramesExecuted += 1)
			)
			.subscribe();
		await framePlayer.play();

		expect(numberOfFramesExecuted).toBe(3);
	});

});

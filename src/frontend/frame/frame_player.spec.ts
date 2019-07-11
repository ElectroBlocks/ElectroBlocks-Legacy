import 'jasmine';
import { FramePlayer } from "./frame_player";
import { ExecuteSilentFrame } from "./frame_execute";
import { ArduinoFrame } from "../arduino/arduino_frame";
import * as  BluebirdPromise   from 'bluebird';
import { filter, tap } from "rxjs/operators";
import { ArduinoState } from "../arduino/state/arduino.state";

describe('Frame Player', () => {


	const frames = [new ArduinoFrame('b1', ArduinoState.makeEmptyState(), {
		location: 'setup', iteration: 0
	}),
		new ArduinoFrame('b1', ArduinoState.makeEmptyState(), {
			location: 'loop', iteration: 0
		}),
		new ArduinoFrame('b1', ArduinoState.makeEmptyState(), {
			location: 'loop', iteration: 1
		})];

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


	it ('it should be able to load a bunch of frames and at the start be at 0 frame', async () => {

		const framePlayer = new FramePlayer(new ExecuteSilentFrame());

		const frame1 = new ArduinoFrame('b1', ArduinoState.makeEmptyState(), {
		location: 'pre-setup', iteration: 0
	});

	await framePlayer.setFrames([
		frame1,
		new ArduinoFrame('b1', ArduinoState.makeEmptyState(), {
			location: 'setup', iteration: 0
		}),
		new ArduinoFrame('b1', ArduinoState.makeEmptyState(), {
			location: 'loop', iteration: 0
		}),
		new ArduinoFrame('b1', ArduinoState.makeEmptyState(), {
			location: 'loop', iteration: 1
		}),
	]);

	expect(framePlayer['currentFrame']).toBe(0);

	});

	it ('should be able to call all the frames', async () => {
		const framePlayer = new FramePlayer(new ExecuteSilentFrame());

		await framePlayer.setFrames(frames);
		let numberOfFramesExecuted = 0;

		framePlayer.changeFrame$.pipe(
				tap(() => numberOfFramesExecuted += 1)
			)
			.subscribe();
		await framePlayer.play();

		expect(numberOfFramesExecuted).toBe(3);
		expect(framePlayer['currentFrame']).toBe(2);
		expect(framePlayer.isPlaying()).toBeFalsy();
	});

	it ('stop should be able to stop the player from continuing', async () => {
		const framePlayer = new FramePlayer(new ExecuteSilentFrame());
		await framePlayer.setFrames(frames);
		let numberOfFramesExecuted = 0;

		framePlayer.changeFrame$.pipe(
			tap(() => numberOfFramesExecuted += 1),
			filter(() => numberOfFramesExecuted == 2),
			tap(() => framePlayer.stop())
		).subscribe();

		await framePlayer.play();

		expect(numberOfFramesExecuted).toBe(2);
	});

	it('should be able to go forward if frames are still available', async () => {
		const framePlayer = new FramePlayer(new ExecuteSilentFrame());
		await framePlayer.setFrames(frames);
		let numberOfFramesExecuted = 0;

		const sub =framePlayer.changeFrame$.pipe(
			tap(() => numberOfFramesExecuted += 1),
			filter(() => numberOfFramesExecuted == 2),
			tap(async () => {
				await framePlayer.stop();
				sub.unsubscribe();
			})
		).subscribe();

		await framePlayer.play();
		expect(framePlayer['currentFrame']).toBe(1);

		await framePlayer.next();
		expect(framePlayer['currentFrame']).toBe(2);
	});

	it('should be able to go backward if not at frame 0', async () => {
		const framePlayer = new FramePlayer(new ExecuteSilentFrame());
		await framePlayer.setFrames(frames);
		let numberOfFramesExecuted = 0;

		const sub =framePlayer.changeFrame$.pipe(
			tap(() => numberOfFramesExecuted += 1),
			filter(() => numberOfFramesExecuted == 2),
			tap(async () => {
				await framePlayer.stop();
				sub.unsubscribe();
			})
		).subscribe();

		await framePlayer.play();
		expect(framePlayer['currentFrame']).toBe(1);

		await framePlayer.previous();
		expect(framePlayer['currentFrame']).toBe(0);

	});

	it ('if on last frame and next is ran it should run the last frame', async () => {
		const framePlayer = new FramePlayer(new ExecuteSilentFrame());
		await framePlayer.setFrames(frames);
		expect(framePlayer['currentFrame']).toBe(0);
		expect(framePlayer.isPlaying()).toBeFalsy();

		await framePlayer.next();
		expect(framePlayer['currentFrame']).toBe(1);
		expect(framePlayer.isPlaying()).toBeFalsy();

		await framePlayer.next();
		expect(framePlayer['currentFrame']).toBe(2);
		expect(framePlayer.isPlaying()).toBeFalsy();

		await framePlayer.next();
		expect(framePlayer['currentFrame']).toBe(2);
		expect(framePlayer.isPlaying()).toBeFalsy();

		await framePlayer.next();
		expect(framePlayer['currentFrame']).toBe(2);
		expect(framePlayer.isPlaying()).toBeFalsy();

	});

	it ('if on the first frame and previous is ran the 0th frame should run', async () => {
		const framePlayer = new FramePlayer(new ExecuteSilentFrame());
		await framePlayer.setFrames(frames);

		await framePlayer.skipToFrame(2);
		expect(framePlayer['currentFrame']).toBe(2);
		expect(framePlayer.isPlaying()).toBeFalsy();

		await framePlayer.previous();
		expect(framePlayer['currentFrame']).toBe(1);
		expect(framePlayer.isPlaying()).toBeFalsy();

		await framePlayer.previous();
		expect(framePlayer['currentFrame']).toBe(0);
		expect(framePlayer.isPlaying()).toBeFalsy();

		await framePlayer.previous();

		expect(framePlayer['currentFrame']).toBe(0);
		expect(framePlayer.isPlaying()).toBeFalsy();

		await framePlayer.previous();
		expect(framePlayer['currentFrame']).toBe(0);
		expect(framePlayer.isPlaying()).toBeFalsy();
	});
});

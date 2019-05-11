import 'jasmine';
import { ExecuteDebugFrame, FramePlayer } from "./frame_player";
import { ArduinoFrame } from "../arduino/arduino_frame";
import { EmptyCommand } from "./command";
import * as blockly from "./block";
import { Block } from "./block";
import { Blockly } from "./block";

describe( 'player', () => {

	let framePlayer: FramePlayer;

	let block: any|Block;

	let blocklyMock: any|Blockly;

	let selectSpy: jasmine.Spy;

	const frames = [
		ArduinoFrame.makeEmptyFrame('a3234', { location: 'loop', iteration: 1 }),
		new ArduinoFrame('342343', {
				'name': {
					name: 'name',
					value: 'blue',
					type: 'String'
				}
			},
			[],
			new EmptyCommand(),
			{ location: 'loop', iteration: 1 }
		),
		new ArduinoFrame('342343', {
				'name': {
					name: 'name',
					value: 'blue',
					type: 'String'
				}
			},
			[],
			new EmptyCommand(),
			{ location: 'loop', iteration: 2 }
		),
		new ArduinoFrame('342343', {
				'name': {
					name: 'name',
					value: 'bill',
					type: 'String'
				}
			},
			[],
			new EmptyCommand(),
			{ location: 'loop', iteration: 2 }
		),
	];

	beforeEach(() => {
		framePlayer = new FramePlayer(new ExecuteDebugFrame());
		framePlayer.setFrames(frames);
		jasmine.clock().install();

		blocklyMock = {
			mainWorkspace: {
				getBlockById: (blockId: string) => { }
			}
		};

		block = {
			select(): void {
			}
		};

		spyOn(blocklyMock.mainWorkspace, 'getBlockById')
			.withArgs(jasmine.anything()).and
			.callFake(() => block);

		selectSpy = spyOn(block, 'select').and.returnValue(undefined);

		spyOn(blockly, 'get_blockly').and.returnValue(blocklyMock);

	});

	afterEach(() => {
		jasmine.clock().uninstall();
	});

		it( 'should be able to play through a series of frames', () => {

			const variableInfoOutputted:  Array<{}> = [];
			const frameActual: Array<{frameNumber: number, frame: ArduinoFrame}> = [];
			const frameNumberOutput: number[] = [];

			framePlayer.frame$.subscribe(frame => frameActual.push(frame));
			framePlayer.variables$
				.subscribe(variable => variableInfoOutputted.push(variable))
			framePlayer.frameNumber$
				.subscribe(frameNumber => frameNumberOutput.push(frameNumber))
			expect(framePlayer.isPlaying()).toBeFalsy();

			framePlayer.play(true);
			expect(framePlayer.isPlaying()).toBeTruthy();
			expect(framePlayer.onLastFrame()).toBeFalsy();

			jasmine.clock().tick(3000);

			// The reason this happens is because we subscribe after setFrames
			// So it will call next when 0 has been set
			expect([0,0,1,2,3]).toEqual(frameNumberOutput);

			// This happens because of a bahaviour subject
			expect(variableInfoOutputted).toEqual([
				{},
				{},
				{
					'name': {
						name: 'name',
						value: 'blue',
						type: 'String'
					}
				},
				{
					'name': {
						name: 'name',
						value: 'blue',
						type: 'String'
					}
				},
				{
					'name': {
						name: 'name',
						value: 'bill',
						type: 'String'
					}
				}
			]);

			expect(frames)
				.toEqual(frameActual.map(frameInfo => frameInfo.frame));
			expect(selectSpy).toHaveBeenCalledTimes(4);
			expect(framePlayer.isPlaying()).toBeTruthy();
			expect(framePlayer.onLastFrame()).toBeTruthy();

		});



		it ('should be able to move forward if it\s not at the end of the frames set', () => {

			const frameNumbers: number[] = [];

			framePlayer.frameNumber$.subscribe(frameNumber => {
				frameNumbers.push(frameNumber);
			});

			framePlayer.frame$.subscribe();
			framePlayer.skipToFrame(2);
			framePlayer.next();
			jasmine.clock().tick(300);

			expect(frameNumbers).toEqual([0, 2, 3]);
		});

		it ('should not be able to move forward if player is at the end of the set', () => {
			const frameNumbers: number[] = [];

			framePlayer.frameNumber$.subscribe(frameNumber => {
				frameNumbers.push(frameNumber);
			});

			framePlayer.frame$.subscribe();
			framePlayer.skipToFrame(3);
			framePlayer.next();
			jasmine.clock().tick(300);

			expect(frameNumbers).toEqual([0, 3, 3]);

		});

		it ('should be able to move backward if it is not at the end of the frame set', () => {
			const frameNumbers: number[] = [];

			framePlayer.frameNumber$.subscribe(frameNumber => {
				frameNumbers.push(frameNumber);
			});

			framePlayer.frame$.subscribe();
			framePlayer.skipToFrame(2);
			framePlayer.previous();
			jasmine.clock().tick(300);

			expect(frameNumbers).toEqual([0, 2, 1]);

		});

		it ('should not be able to move backward if player is at the beginning of the set', () => {
			const frameNumbers: number[] = [];

			framePlayer.frameNumber$.subscribe(frameNumber => {
				frameNumbers.push(frameNumber);
			});

			framePlayer.frame$.subscribe();
			framePlayer.previous();
			jasmine.clock().tick(300);

			expect(frameNumbers).toEqual([0, 0]);

		});
} );

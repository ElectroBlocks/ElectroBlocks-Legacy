import 'jasmine';
import { ExecuteDebugFrame, FramePlayer } from "./frame_player";
import { ArduinoFrame } from "../arduino/arduino_frame";
import { Observable } from "rxjs";
import { EmptyCommand } from "./command";
import * as blockly from "./block";
import * as blockHelper from "./blockly_helper";
import { Block } from "./block";
import { Blockly } from "./block";

describe( 'player', () => {

	let framePlayer: FramePlayer;

	let block: any|Block;

	let blocklyMock: any|Blockly;

	let selectSpy: jasmine.Spy;

	beforeEach(() => {
		framePlayer = new FramePlayer(new ExecuteDebugFrame());
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

	describe( 'play state', () => {
		it( 'should be able to play through a series of frames', () => {
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

			const variableInfoOutputted:  Array<{}> = [];
			const frameActual: Array<{frameNumber: number, frame: ArduinoFrame}> = [];
			const frameNumberOutput: number[] = [];

			framePlayer.setFrames(frames);


			framePlayer.frame$.subscribe(frame => frameActual.push(frame));
			framePlayer.variables$
				.subscribe(variable => variableInfoOutputted.push(variable))
			framePlayer.frameNumber$
				.subscribe(frameNumber => frameNumberOutput.push(frameNumber))

			framePlayer.play(true);

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

		});

		it ('should be able to play through not play if no frames are set', () => {

		});

		it ('should know if the player is playing', () => {

		});

		it ('should know if it\'s on the last frame', () => {

		});

	} );

	describe('forward & backward & skip', () => {

		it ('should be able to move forward if it\s not at the end of the frames set', () => {

		});

		it ('should not be able to move forward if player is at the end of the set', () => {

		});

		it ('should be able to move backward if it is not at teh end of the frame set', () => {

		});

		it ('should not be able to move backward if player is at the beginning of the set', () => {

		});

		it ('should be able to skip to another frame in the set', () => {

		});

	} );


} );

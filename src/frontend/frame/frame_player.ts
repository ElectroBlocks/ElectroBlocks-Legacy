import { ArduinoFrame } from "../arduino/arduino_frame";
import { COMMAND_TYPE } from "./command";
import { ipcRenderer } from 'electron';
import { Observable, Subject } from "rxjs";
import { delay, delayWhen, filter, map, tap } from "rxjs/operators";
import { timer } from "rxjs/observable/timer";
import { get_blockly } from "./block";


export enum FrameExecutionType {
	DIRECT, NEXT
}

export interface FrameType {
	frame: ArduinoFrame;
	type: FrameExecutionType
}

export class FramePlayer {

	/**
	 * The subject that controls the next frame.
	 */
	private readonly frameSubject = new Subject<FrameType>();

	/**
	 * True if observable should continue to play
	 */
	private playFrame = false;

	/**
	 * True if it should only execute on frame
	 */
	private executeOnce = false;

	/**
	 * The current frame in the list that the observable is on
	 */
	private currentFrame = 0;

	private frames: ArduinoFrame[] = [];

	public readonly frame$: Observable<{frameNumber: number, frame: ArduinoFrame}> =
		this.frameSubject
			.asObservable()
			.pipe(
				filter(() => this.executeOnce || this.playFrame),
				filter(() => this.frames.length > 0),
				tap(frameType => {
					const frame = frameType.frame;

					if (frameType.type == FrameExecutionType.DIRECT) {
						this.frameExecutor.executeCommand(frame.setupCommandUSB().command)
					}

					if (frame.command.type == COMMAND_TYPE.USB) {
						this.frameExecutor.executeCommand(frame.nextCommand().command)
					}
				}),
				tap(frameInfo => {
					console.log(this.currentFrame, 'current frame');
					this.scrubBar.value = this.currentFrame.toString();
					const block =
						get_blockly().mainWorkspace.getBlockById(frameInfo.frame.blockId);
					block.select();
				}),
				delay(200),
				tap(() => this.executeOnce = false),
				map((frame: FrameType) => {
					return {
						frameNumber: this.currentFrame,
						frame: frame.frame
					}
				}),
				tap(() => {
					if (this.playFrame && this.currentFrame != this.frames.length -1) {
						this.currentFrame += 1;
						this.play();

					}
				})
			);


	constructor(
		private frameExecutor: ExecuteFrameInterface,
		private scrubBar: HTMLInputElement,

	) {}

	/**
	 * Sets the Arduino Frames for the Player
	 * @param frames
	 */
	public setFrames(frames: ArduinoFrame[]) {
		this.frames = frames;
		this.currentFrame = 0;
	}

	/**
	 * Plays the currentFrame in the list of frames.
	 */
	public play() {

		if (this.frames.length == 0) {
			return;
		}

		if (this.currentFrame >= this.frames.length) {
			this.currentFrame = 0; // Reset back to zero
		}

		const frame = this.frames[ this.currentFrame ];

		if (!frame) {
			return;
		}

		this.playFrame = true;
		this.frameSubject.next( {
			frame,
			type: FrameExecutionType.NEXT
		});
	}

	public next() {
		if (this.frames.length == 0) {
			return;
		}

		this.executeOnce = true;
		this.currentFrame = this.currentFrame == this.frames.length - 1 ? this.currentFrame : this.currentFrame + 1;
		this.skipToFrame(this.currentFrame);
	}

	public previous() {
		if (this.frames.length == 0) {
			return;
		}
		this.executeOnce = true;
		this.currentFrame = this.currentFrame == 0 ? 0 : this.currentFrame -1;
		this.skipToFrame(this.currentFrame);
	}

	/**
	 * Signals a stop for the frames observable
	 */
	public stop() {

		if (this.frames.length == 0) {
			return;
		}

		this.playFrame = false;
	}

	/**
	 * Skips to the frame number
	 */
	public skipToFrame(frameNumber: number) {
		this.executeOnce = true;
		this.playFrame = false;
		this.currentFrame = frameNumber;
		this.frameSubject.next( {
			frame: this.frames[ this.currentFrame ],
			type: FrameExecutionType.DIRECT
		});
	}


}

export class ExecuteUSBFrame implements ExecuteFrameInterface {


	constructor() {}

	public executeCommand(command: string) {
		ipcRenderer.send('send:message', command);
	}



}

export class ExecuteDebugFrame implements ExecuteFrameInterface {
	executeCommand( command: string ): void {
		console.log(command, 'USB COMMAND');
	}


}

export interface ExecuteFrameInterface {

	executeCommand(command: string): void;
}

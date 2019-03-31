import { ArduinoFrame } from "../arduino/arduino_frame";
import { COMMAND_TYPE } from "./command";
import { ipcRenderer } from 'electron';
import { Subject } from "rxjs";
import { delay, delayWhen, filter, tap } from "rxjs/operators";
import { timer } from "rxjs/observable/timer";


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

	public readonly frame$ =
		this.frameSubject
			.asObservable()
			.pipe(
				filter(() => this.executeOnce || this.playFrame),
				tap(frameType => {
					const frame = frameType.frame;

					if (frameType.type == FrameExecutionType.DIRECT) {
						this.frameExecutor.executeCommand(frame.setupCommandUSB().command)
					}

					if (frame.command.type == COMMAND_TYPE.USB) {
						this.frameExecutor.executeCommand(frame.nextCommand().command)
					}
				}),
				delayWhen(frameType => {
					if (frameType.frame.command.type == COMMAND_TYPE.TIME) {
						return timer(parseInt(frameType.frame.command.command));
					}

					return timer(200);
				}),
				tap(() => this.executeOnce = false),
				tap(() => this.currentFrame += 1),
				tap(() => {
					if (this.playFrame && this.currentFrame < this.frames.length) {
						this.play();
					}
				})
			);


	constructor(
		private frameExecutor: ExecuteFrameInterface
	) {}

	/**
	 * Sets the Arduino Frames for the Player
	 * @param frames
	 */
	public setFrames(frames: ArduinoFrame[]) {
		this.frames = frames;
	}

	/**
	 * Plays the currentFrame in the list of frames.
	 */
	public play() {
		this.playFrame = true;
		this.frameSubject.next( {
			frame: this.frames[ this.currentFrame ],
			type: FrameExecutionType.NEXT
		});
	}

	/**
	 * Signals a stop for the frames observable
	 */
	public stop() {
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

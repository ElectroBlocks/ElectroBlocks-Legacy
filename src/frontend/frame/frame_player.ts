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

	public readonly frame$ = this.frameSubject
								.asObservable()
								.pipe(
									filter(() => this.executeOnce || this.playFrame),
									tap(frameType => {
										const frame = frameType.frame;
										const executeFrame = new ExecuteUSBFrame(frame);

										if (frameType.type == FrameExecutionType.DIRECT) {
											executeFrame.usbSetupFrame();
										}

										if (frame.command.type == COMMAND_TYPE.USB) {
											executeFrame.playCommand();
										}
									}),
									delayWhen(frameType => {
										if (frameType.frame.command.type == COMMAND_TYPE.TIME) {
											return timer(parseInt(frameType.frame.command.command));
										}

										return timer(0);
									}),
									tap(() => this.executeOnce = false),
									tap(() => this.currentFrame += 1),
									delay(200),
									tap(() => {
										if (this.playFrame && this.currentFrame < this.frames.length - 1) {
											this.play();
										}
									})
								);


	constructor(private frames: ArduinoFrame[]) {}

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

export class ExecuteUSBFrame {


	constructor(private frame: ArduinoFrame) {}

	public playCommand() {
		ipcRenderer.send('send:message', this.frame.command.command);
	}

	public usbSetupFrame()
	{
		const usbSetupCommand = this.frame.setupCommandUSB();
		ipcRenderer.send('send:message', usbSetupCommand);
	}

}

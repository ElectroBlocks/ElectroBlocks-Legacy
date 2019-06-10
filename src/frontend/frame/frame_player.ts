import { ExecuteFrameInterface } from "./frame_execute";
import { ArduinoFrame } from "../arduino/arduino_frame";
import { COMMAND_TYPE } from "./command";
import * as  BluebirdPromise   from 'bluebird';
import { Subject } from "rxjs";
import { FrameLocation } from "./frame";
import {  share } from "rxjs/operators";
import { FrameOutput } from "./frame_output";

/**
 *
 */
export class FramePlayer {

	/**
	 * Used to control the speed. The higher the speed the lower the delay
	 * The faster the blocks will execute.
	 */
	public speed = 1;

	/**
	 * The subject used to pipe change frame events
	 */
	private changeFrameSubject = new Subject<FrameOutput>();

	/**
	 * Used to output changed frame events so that ui and other things can be updated.
	 */
	public readonly changeFrame$ = this.changeFrameSubject
		.asObservable()
		.pipe(share());

	/**
	 * Current location, used to go as close to where the user was if new frames are created.
	 */
	private currentFrameLocation: FrameLocation;

	/**
	 * List of frames for the player to execute
	 */
	private frames: ArduinoFrame[] = [];

	/**
	 * Whether or not playing in play mode
	 */
	private playing = false;

	/**
	 * The current frame being executed
	 */
	private currentFrame = 0;

	constructor(private frameExecutor: ExecuteFrameInterface) { }

	/**
	 * Sets the list of frames to execute
	 * 
	 * @param frames
	 */
	public setFrames(frames: ArduinoFrame[]) {
		this.playing = false;
		this.frames = frames;

		if (!this.currentFrameLocation) {
			this.currentFrameLocation = this.frames[0].frameLocation;
		}

		const currentFrame = this.frames
			.findIndex(frame => frame.frameLocation == this.currentFrameLocation);

		this.currentFrame = currentFrame < 0 ? 0 : currentFrame;
	}

	/**
	 * Starts playing all the frames
	 */
	public async play() {
		this.playing = true;
		await this.playNextFrame();
	}

	/**
	 * Stops the player from continuing to execute frames
	 */
	public async stop() {
		this.playing = false;
	}

	/**
	 * Returns true if it's on the last frame
	 */
	public isLastFrame() {
		return this.currentFrame >= this.lastFrameNumber();
	}

	/**
	 * Returns true if the player is playing
	 */
	public isPlaying() {
		return this.playing;
	}

	/**
	 * Returns the index of the last frame it will play
	 */
	public lastFrameNumber() {
		return this.frames.length - 1
	}

	/**
	 * Goes back one frames and stops the playing
	 */
	public async previous() {
		this.currentFrame -= 1;
		this.currentFrame = this.currentFrame < 0 ? 0 : this.currentFrame;
		this.playing = false;
		await this.playNextFrame();
	}

	/**
	 * Goes to the next frame and stop playing
	 */
	public async next() {
		this.currentFrame += 1;
		this.currentFrame = this.currentFrame > this.lastFrameNumber() ?
				this.lastFrameNumber() : this.currentFrame;
		this.playing = false;
		await this.playNextFrame();
	}

	/**
	 * Skips to the frame the frame index and stops playing
	 * 
	 * @param frameNumber
	 */
	public async skipToFrame(frameNumber: number) {
		this.playing = false;
		this.currentFrame = frameNumber < 0 ? 0: frameNumber;
		this.currentFrame = this.currentFrame >= this.lastFrameNumber() ?
				this.lastFrameNumber() : this.currentFrame;

		await this.executeFrame(true);
	}

	/**
	 * A recursive method that will continue to execute all the frames until
	 * It reaches the last one.
	 *
	 * It's recursive because we won't always be starting from 0.
	 */
	private async playNextFrame() {
		await this.executeFrame(this.currentFrame === 0);

		if (this.playing && !this.isLastFrame()) {
			this.currentFrame += 1;
			await this.playNextFrame();
			return;
		}

		if (this.playing && this.isLastFrame()) {
			this.currentFrame = 0;
			this.playing = false;
		}
	}

	/**
	 * Executes the frames
	 *
	 * 1) Determining if the frame exists, so that it can be executed
	 * 2) Sends a message up to be executed by node -> usb or something else
	 * 3) Sends another message through the observable
	 * 4) Delays the next frame by a number of milliseconds.
	 */
	private async executeFrame( runSetup: boolean) {

		if (this.canExecuteFrame()) {
			this.playing = false;
			return;
		}

		this.setFrameLocation();

		this.sendMessage(runSetup);

		this.sendFrameOutput();
		
		await this.delay();
	}

	/**
	 * Creates a FrameOutput interface object.
	 * Right now this is used in observers to update the ui
	 */
	private sendFrameOutput() {
		const frame = this.frames[this.currentFrame];

		const usbMessage = frame.command.type == COMMAND_TYPE.MESSAGE ?
			frame.command.command : '';

		const bluetoothMessage = frame.command.type == COMMAND_TYPE.BLUETOOTH_MESSAGE ?
			frame.command.command : '';

		this.changeFrameSubject.next( { 
			frameNumber: this.currentFrame, 
			usbMessage, 
			bluetoothMessage, 
			variables: frame.variables, 
			frameLocation: frame.frameLocation, 
			lastFrame: this.isLastFrame(),
			blockId: frame.blockId 
		});
	}

	/**
	 * Sets the location of where block last frame is being executes
	 * Example We gone through loop block 2 times.
	 */
	private setFrameLocation() {
		this.currentFrameLocation = this.frames[this.currentFrame].frameLocation;
	}

	/**
	 * Sends the messages up to node / electron or somewhere else.
	 *
	 * @param runSetup
	 */
	private sendMessage(runSetup: boolean) {

		const frame = this.frames[this.currentFrame];

		if (runSetup) {
			this.frameExecutor.executeCommand( frame.setupCommandUSB().command )
		}

		if (frame.command.type == COMMAND_TYPE.USB) {
			this.frameExecutor.executeCommand( frame.nextCommand().command )
		}
	}

	/**
	 * Delays the going to the next frame
	 */
	private async delay() {
		const command = this.frames[this.currentFrame].command;

		let time = 400 / this.speed;

		if (command.type === COMMAND_TYPE.TIME) {
			time = parseInt(command.command);
		}

		await BluebirdPromise.delay(time);
	}

	/**
	 * Returns true if the frame can be executed.
	 */
	private canExecuteFrame() {
		return this.frames.length == 0 || !this.frames[this.currentFrame];
	}
}



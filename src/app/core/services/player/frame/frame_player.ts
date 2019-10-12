import { BlocklyService } from './../../blockly.service';
import { ExecuteFrameInterface, ExecuteFrameProvider } from './frame_execute';
import { ArduinoFrame } from '../arduino/arduino_frame';
import * as BluebirdPromise from 'bluebird';
import { ReplaySubject, BehaviorSubject } from 'rxjs';
import { share, publishReplay } from 'rxjs/operators';
import { FrameOutput } from './frame_output';
import * as _ from 'lodash';
import { Injectable, Inject } from '@angular/core';

/**
 * Frame player that executes the frame
 */
@Injectable({ providedIn: 'root' })
export class FramePlayer {
  /**
   * Used to control the speed. The higher the speed the lower the delay
   * The faster the blocks will execute.
   */
  public speed = 1;

  /**
   * The subject used to pipe change frame events
   */
  private changeFrameSubject = new ReplaySubject<FrameOutput>(20);

  public readonly changeFrame$ = this.changeFrameSubject
    .asObservable()
    .pipe(share());

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

  constructor(
    @Inject(ExecuteFrameProvider)
    public readonly frameExecutor: ExecuteFrameInterface
  ) {}

  /**
   * Fix FrameLocation Problem
   *  What about loops increase or decrease or if setup blocks get removed.
   *  Move all this logic out of player into
   *
   * Sets the list of frames to execute
   *
   * @param frames
   * @param keepCurrentIndex means we keep the current index
   */
  public async setFrames(frames: ArduinoFrame[], keepCurrentIndex = false) {
    const numberOfOldFrames = this.frames.length;
    const oldCurrentFrameNumber = this.currentFrame;
    this.playing = false;
    this.frames = frames;

    if (!this.frameExecutor.isReady()) {
      return;
    }

    if (frames.length === 0) {
      await this.frameExecutor.reset();
      return;
    }
    if (!keepCurrentIndex || numberOfOldFrames >= this.frames.length) {
      await this.skipToFrame(0);
      return;
    }
    console.log(oldCurrentFrameNumber);
    await this.skipToFrame(oldCurrentFrameNumber);
    return;
  }

  public async resetState() {
    await this.skipToFrame(this.currentFrame);
  }

  public isReady() {
    return this.frameExecutor.isReady();
  }

  /**
   * Gets all the frames
   */
  public getFrames() {
    return this.frames;
  }

  public getCurrentFrame() {
    return this.frames[this.currentFrame];
  }

  /**
   * Starts playing all the frames
   */
  public async play() {
    if (this.isPlaying() && !this.isLastFrame()) {
      return;
    }

    this.playing = true;

    if (this.isLastFrame()) {
      this.currentFrame = 0;
    }

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
    return this.frames.length - 1;
  }

  /**
   * Goes back one frames and stops the playing
   */
  public async previous() {
    this.currentFrame -= 1;
    this.currentFrame = this.currentFrame < 0 ? 0 : this.currentFrame;
    this.playing = false;
    await this.executeFrame(this.currentFrame === 0);
  }

  /**
   * Goes to the next frame and stop playing
   */
  public async next() {
    this.currentFrame += 1;
    this.currentFrame =
      this.currentFrame > this.lastFrameNumber()
        ? this.lastFrameNumber()
        : this.currentFrame;
    this.playing = false;
    await this.executeFrame(this.currentFrame === 0);
  }

  /**
   * Skips to the frame the frame index and stops playing
   *
   * @param frameNumber
   */
  public async skipToFrame(frameNumber: number) {
    this.playing = false;
    this.currentFrame = frameNumber < 0 ? 0 : frameNumber;
    this.currentFrame =
      this.currentFrame >= this.lastFrameNumber()
        ? this.lastFrameNumber()
        : this.currentFrame;
    console.log(frameNumber, 'framenumber');
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
  private async executeFrame(runSetup: boolean) {
    if (!this.canExecuteFrame()) {
      this.playing = false;
      return;
    }

    await this.sendMessage(runSetup);

    this.sendFrameOutput();

    await this.delay();
  }

  /**
   * Creates a FrameOutput interface object.
   * Right now this is used in observers to update the ui
   */
  private sendFrameOutput() {
    const frame = this.frames[this.currentFrame];
    console.log(frame, 'frame executing');
    this.changeFrameSubject.next({
      state: frame.state,
      blockId: frame.blockId,
      lastFrame: this.currentFrame === this.lastFrameNumber(),
      frameLocation: frame.frameLocation,
      frameNumber: this.currentFrame
    });
  }

  /**
   * Sends the messages up to node / electron or somewhere else.
   *
   * @param runSetup
   */
  private async sendMessage(runSetup: boolean) {
    const frame = this.frames[this.currentFrame];

    await this.frameExecutor.executeFrame(
      frame.state,
      this.frames[this.lastFrameNumber()].state,
      runSetup
    );
  }

  /**
   * Delays the going to the next frame
   */
  private async delay() {
    const delay = this.frames[this.currentFrame].state.delay;

    let time = 400 / this.speed;
    await BluebirdPromise.delay(time + delay);
  }

  /**
   * Returns true if the frame can be executed.
   */
  private canExecuteFrame() {
    return (
      this.frames.length > 0 && this.frames[this.currentFrame] !== undefined
    );
  }
}

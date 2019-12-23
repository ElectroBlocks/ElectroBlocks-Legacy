import { FrameOutput } from '../../core/player/frame/frame_output';
import { ArduinoFrame } from '../../core/player/arduino/arduino_frame';
import { FramePlayer } from '../../services/player/frame_player';
import { BlocklyService } from '../../services/blockly/blockly.service';
import { Component, OnInit } from '@angular/core';
import { map, startWith, share } from 'rxjs/operators';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  public frameNumber$ = this.player.changeFrame$.pipe(
    map(frameInfo => frameInfo.frameNumber + 1),
    share(),
    startWith(0)
  );

  public numberOfFrames$ = this.blocklyService.frames$.pipe(
    map(frames => frames.length),
    share(),
    startWith(this.player.getFrames().length)
  );

  public noFrames$ = this.numberOfFrames$.pipe(
    map(numberOfFrames => numberOfFrames <= 0),
    share(),
    startWith(this.player.getFrames().length <= 0)
  );

  constructor(
    private blocklyService: BlocklyService,
    public readonly player: FramePlayer
  ) {}

  async scrubBarFrameChange($event) {
    await this.player.skipToFrame(parseInt($event.srcElement.value, 0) - 1);
  }

  changeSpeed($event) {
    this.player.speed = parseInt($event.srcElement.value, 0);
  }

  async previous() {
    await this.player.previous();
  }

  async next() {
    await this.player.next();
  }

  async replay() {
    await this.player.replay();
  }

  async play() {
    if (!this.player.isPlaying()) {
      await this.player.play();
      return;
    }

    await this.player.stop();
  }
}

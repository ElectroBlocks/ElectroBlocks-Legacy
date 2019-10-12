import { FrameOutput } from './../core/services/player/frame/frame_output';
import { ArduinoFrame } from './../core/services/player/arduino/arduino_frame';
import { FramePlayer } from './../core/services/player/frame/frame_player';
import { BlocklyService } from './../core/services/blockly.service';
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

  public loop$ = this.player.changeFrame$.pipe(
    map(frameInfo => {
      if (
        frameInfo.frameLocation.location === 'setup' ||
        frameInfo.frameLocation.location === 'pre-setup'
      ) {
        return 'setup';
      }
      return frameInfo.frameLocation.iteration + 1;
    }),
    share(),
    startWith('setup')
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

  previous() {
    this.player.previous();
  }

  next() {
    this.player.next();
  }

  async play() {
    if (!this.player.isPlaying()) {
      await this.player.play();
      return;
    }

    await this.player.stop();
  }
}

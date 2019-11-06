import { Component, OnInit } from '@angular/core';
import { FramePlayer } from '../../core/services/player/frame/frame_player';
import { share, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {
  public loop$ = this.player.changeFrame$.pipe(
    map((frameInfo) => {
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

  constructor(private player: FramePlayer) {}

  ngOnInit() {}
}

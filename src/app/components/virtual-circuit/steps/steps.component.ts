import { Component, ViewChild, ElementRef } from '@angular/core';
import { FramePlayer } from '../../../services/player/frame_player';
import { share, map, startWith, tap, switchMap } from 'rxjs/operators';
import { BlocklyService } from '../../../services/blockly/blockly.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent  {
  @ViewChild('stepsList', { static: false }) stepsList: ElementRef<
    HTMLOListElement
  >;

  public loop$ = this.player.changeFrame$.pipe(
    map(frameInfo => {
      if (
        frameInfo.frameLocation.location === 'setup' ||
        frameInfo.frameLocation.location === 'pre-setup'
      ) {
        return 'Setup';
      }
      return 'Loop: ' + (frameInfo.frameLocation.iteration + 1);
    }),
    share(),
    startWith('Setup')
  );

  public steps$ = combineLatest([
    this.blocklyService.frames$.pipe(startWith([])),
    this.player.changeFrame$.pipe(
      map(frame => frame.frameNumber),
      startWith(1)
    )
  ]).pipe(
    map(([frames, frameNumber]) => {
      const steps = this.player.getFrames().map(frame => frame.explanation);
      const mappedSteps = steps.map((step, index) => {
        return {
          step,
          selected: frameNumber === index
        };
      });

      return mappedSteps;
    }),
    tap(mappedSteps => {
      if (!this.stepsList) {
        return;
      }
      const frameNumber = mappedSteps.findIndex(step => step.selected);

      const orderedList = this.stepsList.nativeElement;

      const element = orderedList.querySelector(
        `li:nth-of-type(${frameNumber})`
      );

      const isScrollableByUser =
        orderedList.parentElement.clientHeight <= orderedList.clientHeight;

      if (element && isScrollableByUser) {
        element.scrollIntoView();
      } else {
        orderedList.parentElement.scrollTo(0, 0);
      }
    })
  );

  constructor(
    private player: FramePlayer,
    private blocklyService: BlocklyService
  ) {}

  jumpToStep(event: Event, frameNumber: number) {
    this.player.skipToFrame(frameNumber);
  }
}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FramePlayer } from '../../core/services/player/frame/frame_player';
import { share, map, startWith, tap, switchMap } from 'rxjs/operators';
import { BlocklyService } from '../../core/services/blockly.service';
import { combineLatest, merge } from 'rxjs';
import { FrameOutput } from '../../core/services/player/frame/frame_output';
import { ArduinoFrame } from '../../core/services/player/arduino/arduino_frame';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {
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
    this.blocklyService.frames$,
    this.player.changeFrame$
  ]).pipe(
    map(([frames, frameOutput]) => {
      console.log(frameOutput, frames, 'loll');
      const steps = this.player.getFrames().map(frame => frame.explanation);
      const frameNumber = frameOutput.frameNumber;
      const mappedSteps = steps.map((step, index) => {
        return {
          step,
          selected: frameNumber === index
        };
      });

      console.log(mappedSteps, 'mappedSteps');
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

  ngOnInit() {}

  jumpToStep(event: Event, frameNumber: number) {
    this.player.skipToFrame(frameNumber);
  }
}

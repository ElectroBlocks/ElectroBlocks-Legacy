import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
  NgZone
} from '@angular/core';
import { FramePlayer } from './../../core/services/player/frame/frame_player';

@Component({
  selector: 'app-virtual-circuit-container',
  templateUrl: './virtual-circuit-container.component.html',
  styleUrls: ['./virtual-circuit-container.component.scss']
})
export class VirtualCircuitContainerComponent implements OnInit {
  stepContainerHeight = '39.5%';
  svgHeight = '58.5%';

  isResizingDivs = false;

  @ViewChild('svgGrabber', { static: false }) grabber: ElementRef<
    HTMLDivElement
  >;

  constructor() {}

  ngOnInit() {}

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isResizingDivs) {
      return;
    }

    const topMenuHeight = 50;
    const svgContainerHeight = event.y - topMenuHeight;
    const stepContainerHeight =
      document.getElementById('blocklyDiv').clientHeight -
      svgContainerHeight +
      10;

    if (stepContainerHeight <= 80 || svgContainerHeight <= 30) {
      return;
    }

    this.svgHeight = svgContainerHeight + 'px';
    this.stepContainerHeight = stepContainerHeight + 'px';
  }

  grabberMouseUp(event: MouseEvent) {
    this.isResizingDivs = false;
    console.log('mouse up');
  }

  grabberMouseDown(event: MouseEvent) {
    this.isResizingDivs = true;
    console.log('mouse down');
  }
}

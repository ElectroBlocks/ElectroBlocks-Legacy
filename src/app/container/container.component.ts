import {
  Component,
  HostListener,
  ViewChild,
  ElementRef,
  OnDestroy
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlocklyService } from '../core/services/blockly.service';
import { ElectronService } from '../core/services';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnDestroy {
  bottomContainerHeight = '39.5%';
  topContainerHeight = '58.5%';

  isResizingDivs = false;

  @ViewChild('grabber', { static: false }) grabber: ElementRef<HTMLDivElement>;

  public readonly displayMode: 'Arduino' | 'Virtual-Circuit';

  constructor(
    private route: ActivatedRoute,
    private blocklyService: BlocklyService,
    public readonly electronService: ElectronService
  ) {
    this.displayMode = this.route.snapshot.data['containerMode'];
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isResizingDivs) {
      return;
    }

    const topMenuHeight = this.electronService.isElectron ? 50 : 86;
    const svgContainerHeight = event.y - topMenuHeight;
    const bottomContainerHeight =
      document.getElementById('blocklyDiv').clientHeight -
      svgContainerHeight -
      22;

    if (bottomContainerHeight <= 80 || svgContainerHeight <= 30) {
      return;
    }

    this.topContainerHeight = svgContainerHeight + 'px';
    this.bottomContainerHeight = bottomContainerHeight + 'px';
  }

  grabberMouseUp(event: MouseEvent) {
    this.isResizingDivs = false;
  }

  grabberMouseDown(event: MouseEvent) {
    this.isResizingDivs = true;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      // HACK to make sure blockly loads
      this.blocklyService.resizeWorkspace();
    }, 10);
  }

  ngOnDestroy() {}
}

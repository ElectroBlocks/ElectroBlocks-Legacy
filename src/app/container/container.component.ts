import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
  OnDestroy
} from "@angular/core";
import { Router, ActivationStart, ActivatedRoute } from "@angular/router";
import { Subscription, Observable } from "rxjs";
import {
  filter,
  map,
  share,
  startWith,
  tap,
  shareReplay,
  distinctUntilChanged,
  publishReplay
} from "rxjs/operators";

@Component({
  selector: "app-container",
  templateUrl: "./container.component.html",
  styleUrls: ["./container.component.scss"]
})
export class ContainerComponent implements OnInit, OnDestroy {
  stepContainerHeight = "39.5%";
  svgHeight = "58.5%";

  isResizingDivs = false;

  @ViewChild("svgGrabber", { static: false }) grabber: ElementRef<
    HTMLDivElement
    >;
  
  public readonly displayMode: 'Arduino' | 'Virtual-Circuit';

  constructor(private route: ActivatedRoute) {
    this.displayMode = this.route.snapshot.data['containerMode'];
  }

  ngOnInit() {
    console.log("lol lol called");
  }

  @HostListener("document:mousemove", ["$event"])
  onMouseMove(event: MouseEvent) {
    if (!this.isResizingDivs) {
      return;
    }

    const topMenuHeight = 50;
    const svgContainerHeight = event.y - topMenuHeight;
    const stepContainerHeight =
      document.getElementById("blocklyDiv").clientHeight -
      svgContainerHeight -
      22;

    if (stepContainerHeight <= 80 || svgContainerHeight <= 30) {
      return;
    }

    this.svgHeight = svgContainerHeight + "px";
    this.stepContainerHeight = stepContainerHeight + "px";
  }

  grabberMouseUp(event: MouseEvent) {
    this.isResizingDivs = false;
    console.log("mouse up");
  }

  grabberMouseDown(event: MouseEvent) {
    this.isResizingDivs = true;
    console.log("mouse down");
  }

  ngOnDestroy() {}
}

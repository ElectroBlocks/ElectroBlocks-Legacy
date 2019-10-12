import { FramePlayer } from './../core/services/player/frame/frame_player';
import { BlocklyService } from '../core/services/blockly.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-blockly',
  templateUrl: './blockly.component.html',
  styleUrls: ['./blockly.component.scss']
})
export class BlocklyComponent implements OnInit {
  @ViewChild('blockContent', { static: false }) blockContent: ElementRef;

  constructor(
    private blocklyService: BlocklyService,
    private framePlayer: FramePlayer,
    private router: Router
  ) {}

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.blocklyService.setUpBlock(this.blockContent.nativeElement);
      this.blocklyService.blocklyEvents$.subscribe(console.log);
    }, 10);

    this.framePlayer.changeFrame$.subscribe(changeFrame => {
      this.blocklyService.selectBlock(changeFrame.blockId);
    });
  }
}

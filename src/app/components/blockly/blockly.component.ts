import { FramePlayer } from '../../services/player/frame_player';
import { BlocklyService } from '../../services/blockly/blockly.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-blockly',
  templateUrl: './blockly.component.html',
  styleUrls: ['./blockly.component.scss']
})
export class BlocklyComponent implements OnInit, AfterViewInit {
  @ViewChild('blockContent', { static: false }) blockContent: ElementRef;

  constructor(
    private blocklyService: BlocklyService,
    private framePlayer: FramePlayer
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.blocklyService.setUpBlock(this.blockContent.nativeElement);
    }, 10);

    this.framePlayer.changeFrame$.subscribe(changeFrame => {
      this.blocklyService.selectBlock(changeFrame.blockId);
    });
  }
}

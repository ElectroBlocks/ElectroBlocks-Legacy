import { Component, OnInit } from '@angular/core';
import { BlocklyService } from '../../services/blockly/blockly.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  constructor(private blocklyService: BlocklyService) {}

  ngOnInit() {
    this.blocklyService.resizeWorkspace();
  }
}

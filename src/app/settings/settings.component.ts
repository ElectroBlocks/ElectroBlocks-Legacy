import { Component, OnInit } from '@angular/core';
import { BlocklyService } from '../core/services/blockly.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  constructor(private blocklyService: BlocklyService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {
      // HACK to make sure blockly loads
      this.blocklyService.resizeWorkspace();
    }, 10);
  }
}

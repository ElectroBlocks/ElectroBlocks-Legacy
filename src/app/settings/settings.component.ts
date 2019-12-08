import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BlocklyService } from '../core/services/blockly.service';
import {
  Router,
  ActivationStart,
  Route,
  ActivatedRoute
} from '@angular/router';
import { MatSelectChange } from '@angular/material';
import { ToolboxComponent } from './toolbox/toolbox.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, AfterViewInit {
  constructor(private blocklyService: BlocklyService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {
      // HACK to make sure blockly loads
      this.blocklyService.resizeWorkspace();
    }, 10);
  }
}

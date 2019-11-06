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
  public firstSelectedOption = 'toolbox';

  constructor(
    private blocklyService: BlocklyService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    console.log(activatedRoute, 'activatedRoute');
    this.firstSelectedOption = this.activatedRoute.snapshot.firstChild.data[
      'settingSelected'
    ];
  }

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {
      // HACK to make sure blockly loads
      this.blocklyService.resizeWorkspace();
    }, 10);
  }

  changeHelpMenu(event: MatSelectChange) {
    switch (event.value) {
      case 'help':
        this.router.navigate([
          'settings',
          { outlets: { settingContainer: 'help' } }
        ]);
        break;
      case 'toolbox':
        this.router.navigate([
          'settings',
          { outlets: { settingContainer: 'toolbox' } }
        ]);
        break;
      case 'bug':
        this.router.navigate([
          'settings',
          { outlets: { settingContainer: 'bug' } }
        ]);
        break;
      case 'about':
        this.router.navigate([
          'settings',
          { outlets: { settingContainer: 'about' } }
        ]);
        break;
    }
    console.log(event, 'option selected');
  }
}

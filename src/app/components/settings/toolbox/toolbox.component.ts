import { Component, OnInit } from '@angular/core';
import {
  ToolboxService,
  ToolboxEntry
} from '../../../services/toolbox/toolbox.service';
import { MatSelectionListChange } from '@angular/material';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.scss']
})
export class ToolboxComponent implements OnInit {
  public toolBoxMenu = this.toolboxService.fetchToolBox();

  constructor(private toolboxService: ToolboxService) {}
  ngOnInit() {}

  updateToolbox(matSelectionListChange: MatSelectionListChange) {
    const toolboxEntries = matSelectionListChange.source.options.map((e) => {
      return {
        name: e.value,
        show: e.selected
      };
    });
    this.toolboxService.saveToolBox(toolboxEntries);
  }
}

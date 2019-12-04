import { Component, OnInit } from '@angular/core';
import { BlocklyService } from '../../core/services/blockly.service';
import { MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'app-advanced',
  templateUrl: './advanced.component.html',
  styleUrls: ['./advanced.component.scss']
})
export class AdvancedComponent implements OnInit {
  showArduinoSetupFunction: boolean;

  skinColor: string;

  ledColor: string;

  constructor(private blocklyService: BlocklyService) {
    this.showArduinoSetupFunction =
      localStorage.getItem('show_setup_function_arduino') === true.toString();
    this.skinColor = localStorage.getItem('skin_color') || '#a424d3';
    this.ledColor = localStorage.getItem('led_color');
  }

  ngOnInit() {}

  onChangeshowArduionSetupFunction($event: MatSlideToggleChange) {
    this.blocklyService.showSetupInArduinoStart($event.checked);
    localStorage.setItem(
      'show_setup_function_arduino',
      $event.checked.toString()
    );
    this.showArduinoSetupFunction = $event.checked;
  }

  onNewSkinColor(color: string) {
    localStorage.setItem('skin_color', color);
    this.skinColor = color;
  }

  onNewLedColor(color: string) {
    localStorage.setItem('led_color', color);
    this.ledColor = color;
  }

  reset() {
    localStorage.removeItem('led_color');
    this.ledColor = null;

    localStorage.removeItem('show_setup_function_arduino');
    this.blocklyService.showSetupInArduinoStart(false);
    this.showArduinoSetupFunction = false;

    localStorage.setItem('skin_color', '#a424d3');
    this.skinColor = '#a424d3';
  }
}

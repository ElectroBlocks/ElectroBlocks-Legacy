import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.scss']
})
export class ToolboxComponent implements OnInit {
  readonly defaultToolbox = [
    { name: 'Logic', isChecked: true },
    { name: 'Loops', isChecked: true },
    { name: 'List', isChecked: true },
    { name: 'Variables', isChecked: true },
    { name: 'Functions', isChecked: true },
    { name: 'Color', isChecked: true },
    { name: 'Math', isChecked: true },
    { name: 'Text', isChecked: true },
    { name: 'Bluetooth', isChecked: true },
    { name: 'Buttons', isChecked: true },
    { name: 'Message', isChecked: true },
    { name: 'Pins', isChecked: true },
    { name: 'Time', isChecked: true },
    { name: 'LCD Screen', isChecked: true },
    { name: 'Led', isChecked: true },
    { name: 'Led Light Strip', isChecked: true },
    { name: 'Led Matrix', isChecked: true },
    { name: 'Motor / Servo', isChecked: true },
    { name: 'IR Remote', isChecked: true },
    { name: 'Motion Sensors', isChecked: true },
    { name: 'RFID', isChecked: true },
    { name: 'Temp / Humidity', isChecked: true }
  ];

  currentToolbox = [];

  constructor() {
    if (localStorage.getItem('toolBox')) {
      const storedMenuList = JSON.parse(
        localStorage.getItem('toolBox')
      ) as Array<{ name: string; isChecked: boolean }>;
      this.currentToolbox = this.defaultToolbox.map((menuOption) => {
        const storedMenuOption = storedMenuList.find(
          (o) => o.name === menuOption.name
        );
        if (storedMenuOption === undefined) {
          return menuOption;
        }

        return { name: menuOption.name, isChecked: storedMenuOption.isChecked };
      });
      console.log(this.currentToolbox, 'currentToolbox');
    } else {
      this.currentToolbox = this.defaultToolbox;
    }
  }

  ngOnInit() {}
}

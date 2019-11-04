import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.scss']
})
export class ToolboxComponent implements OnInit {
  currentToolbox = Object.entries({
    ...defaultToolbox,
    ...JSON.parse(localStorage.getItem('toolBox'))
  });

  constructor() {}

  ngOnInit() {}
}

const defaultToolbox = {
  Logic: { isChecked: true },
  Loops: { isChecked: true },
  List: { isChecked: true },
  Variables: { isChecked: true },
  Functions: { isChecked: true },
  Color: { isChecked: true },
  Math: { isChecked: true },
  Text: { isChecked: true },
  Bluetooth: { isChecked: true },
  Buttons: { isChecked: true },
  Message: { isChecked: true },
  Pins: { isChecked: true },
  Time: { isChecked: true },
  'LCD Screen': { isChecked: true },
  Led: { isChecked: true },
  'Led Light Strip': { isChecked: true },
  'Led Matrix': { isChecked: true },
  'Motor / Servo': { isChecked: true },
  'IR Remote': { isChecked: true },
  'Motion Sensors': { isChecked: true },
  RFID: { isChecked: true },
  'Temp / Humidity': { isChecked: true }
};

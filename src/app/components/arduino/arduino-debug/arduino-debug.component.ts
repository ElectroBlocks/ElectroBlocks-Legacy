import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { Variable } from '../../../core/player/frame/variable';
import {
  rgbToHex,
  Color
} from '../../../core/player/frame_genorator/color';

@Component({
  selector: 'app-arduino-debug',
  templateUrl: './arduino-debug.component.html',
  styleUrls: ['./arduino-debug.component.scss']
})
export class ArduinoDebugComponent implements OnInit {
  variables$ = of<Variable[]>([
    {
      name: 'favorite color',
      type: 'Colour',
      value: { red: 150, green: 0, blue: 140 }
    },
    {
      name: 'counter',
      type: 'Number',
      value: 333
    },
    {
      name: 'name',
      type: 'String',
      value: 'Fred'
    },
    {
      name: 'rainbow',
      type: 'Colour List',
      value: [
        { red: 150, green: 0, blue: 140 },
        { red: 20, green: 150, blue: 234 }
      ]
    },
    {
      name: 'iLikeIcecream',
      type: 'Boolean',
      value: true
    }
  ]);

  constructor() {}

  ngOnInit() {}

  rgbToHex(color: Color) {
    return rgbToHex(color);
  }

  printValue(variable: Variable) {
    if (variable.type === 'Colour') {
      return `Red = ${variable.value.red} Green = ${variable.value.green} Blue = ${variable.value.blue}`;
    }

    return JSON.stringify(variable.value);
  }
}

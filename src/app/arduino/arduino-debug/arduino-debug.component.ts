import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { Variable } from '../../core/services/player/frame/variable';
import {
  rgbToHex,
  Color
} from '../../core/services/player/frame_genorator/color';

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
      value: { red: 50, green: 0, blue: 40 }
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
      name: 'iLikeIcecream',
      type: 'Boolean',
      value: true
    },
    {
      name: 'rainbow',
      type: 'Colour List',
      value: [
        { red: 50, green: 0, blue: 40 },
        { red: 50, green: 150, blue: 0 }
      ]
    }
  ]);

  constructor() {}

  ngOnInit() {}

  rgbToHex(color: Color) {
    return rgbToHex(color);
  }
}

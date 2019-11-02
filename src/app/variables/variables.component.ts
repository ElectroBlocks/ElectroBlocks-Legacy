import {
  rgbToHex,
  Color
} from '../core/services/player/frame_genorator/color';
import { Variable } from '../core/services/player/frame/variable';
import { FramePlayer } from '../core/services/player/frame/frame_player';
import { Component } from '@angular/core';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-variables',
  templateUrl: './variables.component.html',
  styleUrls: ['./variables.component.scss']
})
export class VariablesComponent {
  public variables$ = this.player.changeFrame$.pipe(
    map(frameChange => this.updateVariables(frameChange.state.variables)),
    startWith([])
  );

  constructor(private player: FramePlayer) {}

  public updateVariables(variables: { [key: string]: Variable }) {
    let variableList = [];
    Object.keys(variables).forEach(key => {
      if (variables[key].type === 'Number') {
        variables[key].value = +(+variables[key].value).toFixed(5);
      }
      variableList.push(variables[key]);
    });

    variableList = variableList.map(variable => {
      return variable;
    });

    return variableList;
  }

  rgbToHex(color: Color) {
    return rgbToHex(color);
  }
}

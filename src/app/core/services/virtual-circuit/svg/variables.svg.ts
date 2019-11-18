import { Doc, G } from 'svg.js';
import { ArduinoState } from '../../player/arduino/state/arduino.state';
import { Variable } from '../../player/frame/variable';
import { Color, rgbToHex } from '../../player/frame_genorator/color';

export class VariablesSvg {
  public readonly textGroup: G;

  constructor(public readonly baseSvg: svgjs.Doc) {
    this.textGroup = this.baseSvg.group();
  }

  public matchState(state: ArduinoState) {
    this.textGroup.clear();
    this.createTitle();
    const variables = Object.values(state.variables);
    const fontSvg = { family: 'Biryani', size: '1.25em' };

    variables.forEach((variable) => {
      if (variable.type === 'Colour') {
        const color = variable.value as Color;
        this.textGroup
          .text(
            `- ${variable.name} = (red = ${color.red}, green = ${color.green}, blue = ${color.blue})`
          )
          .fill(`${rgbToHex(color)}`)
          .font(fontSvg)

          .move(20, this.textGroup.bbox().y2);
        return;
      }

      if (variable.type === 'Colour List') {
        const colors = variable.value as Color[];

        if (colors.length === 0) {
          this.textGroup
            .text(`- []`)
            .move(20, this.textGroup.bbox().y2 + 30)
            .font(fontSvg);
          return;
        }

        this.textGroup
          .text(`- [`)
          .move(20, this.textGroup.bbox().y2 + 30)
          .font(fontSvg);
        colors.forEach((color) => {
          this.textGroup
            .text(
              `(red = ${color.red}, green = ${color.green}, blue = ${color.blue}),`
            )
            .fill(`${rgbToHex(color)}`)
            .font(fontSvg)
            .move(20, this.textGroup.bbox().y2);
        });

        this.textGroup
          .text(`]`)
          .move(20, this.textGroup.bbox().y2 + 30)
          .font(fontSvg);

        return;
      }

      const value = this.getValue(variable);

      this.textGroup
        .text(`- ${variable.name} = ${value}`)
        .font(fontSvg)
        .move(20, this.textGroup.bbox().y2)
        .width(100);
    });
  }

  public getValue(variable: Variable) {
    if (variable.type === 'String') {
      return `"${variable.value}"`;
    }
    if (variable.type === 'Number') {
      return variable.value;
    }

    if (variable.type === 'Boolean') {
      return variable.value ? 'true' : 'false';
    }

    if (variable.type === 'String List') {
      return '[' + variable.value.map((value) => `"${value}"`).join(', ') + ']';
    }

    if (variable.type === 'Number List') {
      return '[' + variable.value.join(', ') + ']';
    }

    if (variable.type === 'Boolean List') {
      return (
        '[' +
        variable.value.map((value) => (value ? 'true' : 'false')).join(', ') +
        ']'
      );
    }
  }
  public createTitle() {
    this.textGroup.text('Variables').font({ family: 'Biryani', size: '1.5em' });
  }

  public move(x: number, y: number) {
    this.textGroup.move(x, y);
  }

  public show() {
    this.textGroup.show();
  }

  public hide() {
    this.textGroup.hide();
  }
}

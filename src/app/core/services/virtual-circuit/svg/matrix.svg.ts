import { publishReplay } from 'rxjs/operators';
import { ComponentSvg } from './component.svg';
import { ElectricAttachmentComponentState } from '../../player/arduino/state/electric.state';
import { ArduinoState } from '../../player/arduino/state/arduino.state';
import { Circle, Parent } from 'svg.js';
import { LedMatrixState } from '../../player/arduino/state/led_matrix.state';
import { ARDUINO_UNO_PINS } from '../../player/arduino/arduino_frame';

export class MatrixSvg extends ComponentSvg {
  constructor(public readonly svg: Parent) {
    super(svg);
    this.arduinoPins = [
      ARDUINO_UNO_PINS.PIN_10,
      ARDUINO_UNO_PINS.PIN_11,
      ARDUINO_UNO_PINS.PIN_12
    ];
  }

  isComponent(component: ElectricAttachmentComponentState): boolean {
    return component instanceof LedMatrixState;
  }

  matchState(state: ArduinoState): void {
    const matrixState = state.components.find(
      this.isComponent
    ) as LedMatrixState;

    if (!this.isComponent(matrixState)) {
      return;
    }

    matrixState.leds.forEach(ledState => {
      const circle = this.svg
        .select(`#_${ledState.row}-${ledState.col} circle`)
        .first() as Circle;

      if (circle) {
        circle.node.style.fill = '';
        circle.fill(ledState.isOn ? '#AA0000' : '#FFFFFF');
      }
    });
  }

  public resetComponent() {
    for (let row = 1; row <= 8; row += 1) {
      for (let col = 1; col <= 8; col += 1) {
        const circle = this.svg
          .select(`#_${row}-${col} circle`)
          .first() as Circle;

        if (circle) {
          circle.node.style.fill = '';
          circle.fill('#FFFFFF');
        }
      }
    }
  }
}

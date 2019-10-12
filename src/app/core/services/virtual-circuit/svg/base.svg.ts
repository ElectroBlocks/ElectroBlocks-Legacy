import { Parent } from 'svg.js';
import { ARDUINO_UNO_PINS } from '../../player/arduino/arduino_frame';

export abstract class BaseSvg {
  protected arduinoPins: ARDUINO_UNO_PINS[] = [];

  constructor(public readonly svg: Parent) {}

  move(x: number, y: number) {
    this.svg.move(x, y);

    return this;
  }

  height(size: string) {
    this.svg.height(size);

    return this;
  }

  remove() {
    this.svg.remove();
  }

  getArduinoPins() {
    return this.arduinoPins;
  }
}

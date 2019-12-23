import { ComponentSvg } from './component.svg';
import { ArduinoState } from '../../player/arduino/state/arduino.state';
import { ElectricAttachmentComponentState } from '../../player/arduino/state/electric.state';
import { NeoPixelStripState } from '../../player/arduino/state/neo_pixel_strip.state';
import { Parent } from 'svg.js';
import { Color } from '../../player/frame_genorator/color';
import { ARDUINO_UNO_PINS } from '../../player/arduino/arduino_frame';

export class NeopixelSvg extends ComponentSvg {
  constructor(
    public readonly svg: Parent,
    public readonly numberOfLeds: number,
    public readonly pin: ARDUINO_UNO_PINS
  ) {
    super(svg);
    this.setNumberOfNeoPixels();
    this.arduinoPins.push(this.pin);
  }

  isComponent(component: ElectricAttachmentComponentState): boolean {
    return (
      component instanceof NeoPixelStripState &&
      component.analogPin === this.pin &&
      component.numberOfLeds === this.numberOfLeds
    );
  }

  matchState(state: ArduinoState): void {
    const neoPixelState = state.components.find(c =>
      this.isComponent(c)
    ) as NeoPixelStripState;

    if (!this.isComponent(neoPixelState)) {
      return;
    }

    neoPixelState.neoPixels.forEach(pixel => {
      this.setPixelColor(pixel.position, pixel.color);
    });
  }

  setPixelColor(position: number, color: Color) {
    this.svg
      .select(`#LED-${position} circle`)
      .first()
      .fill({ r: color.red, g: color.green, b: color.blue } as any);
  }

  resetComponent() {
    for (let i = 1; i <= this.numberOfLeds; i += 1) {
      this.setPixelColor(i, { red: 255, blue: 255, green: 255 });
    }
  }

  setNumberOfNeoPixels() {
    for (let i = 1; i <= 60; i += 1) {
      const led = this.svg.select(`#_${i}`).first();

      if (!led) {
        return;
      }

      if (i <= this.numberOfLeds) {
        led.show();
      }

      if (i > this.numberOfLeds) {
        led.hide();
      }
    }

    if (this.numberOfLeds <= 12) {
      this.svg
        .select('#LEVEL1')
        .first()
        .hide();
      this.svg
        .select('#LEVEL2')
        .first()
        .hide();
      this.svg
        .select('#LEVEL3')
        .first()
        .hide();
      this.svg
        .select('#LEVEL4')
        .first()
        .hide();
    }

    if (this.numberOfLeds > 12) {
      this.svg
        .select('#LEVEL1')
        .first()
        .show();
      this.svg
        .select('#LEVEL2')
        .first()
        .hide();
      this.svg
        .select('#LEVEL3')
        .first()
        .hide();
      this.svg
        .select('#LEVEL4')
        .first()
        .hide();
    }

    if (this.numberOfLeds > 24) {
      this.svg
        .select('#LEVEL1')
        .first()
        .show();
      this.svg
        .select('#LEVEL2')
        .first()
        .show();
      this.svg
        .select('#LEVEL3')
        .first()
        .hide();
      this.svg
        .select('#LEVEL4')
        .first()
        .hide();
    }

    if (this.numberOfLeds > 36) {
      this.svg
        .select('#LEVEL1')
        .first()
        .show();
      this.svg
        .select('#LEVEL2')
        .first()
        .show();
      this.svg
        .select('#LEVEL3')
        .first()
        .show();
      this.svg
        .select('#LEVEL4')
        .first()
        .hide();
    }

    if (this.numberOfLeds > 48) {
      this.svg
        .select('#LEVEL1')
        .first()
        .show();
      this.svg
        .select('#LEVEL2')
        .first()
        .show();
      this.svg
        .select('#LEVEL3')
        .first()
        .show();
      this.svg
        .select('#LEVEL4')
        .first()
        .show();
    }
  }
}

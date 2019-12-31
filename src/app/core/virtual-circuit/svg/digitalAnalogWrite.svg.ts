import { ComponentSvg } from './component.svg';
import { ArduinoState } from '../../player/arduino/state/arduino.state';
import { ElectricAttachmentComponentState } from '../../player/arduino/state/electric.state';
import { PinState, PIN_TYPE } from '../../player/arduino/state/pin.state';
import { Parent, Text } from 'svg.js';
import { ARDUINO_UNO_PINS } from '../../player/arduino/arduino_frame';

export class DigitalAnalogWriteSvg extends ComponentSvg {
  constructor(
    public readonly svg: Parent,
    public readonly pinType: PIN_TYPE,
    public readonly pin: ARDUINO_UNO_PINS
  ) {
    super(svg);
    this.arduinoPins.push(this.pin);
  }

  public matchState(state: ArduinoState): void {
    const pinState = state.components.find(c =>
      this.isComponent(c)
    ) as PinState;

    if (!pinState) {
      return;
    }

    const pinStateText = this.svg.select('#STATE_TEXT').first() as Text;

    this.changeLightBulb(pinState);

    if (pinState.type === PIN_TYPE.DIGITAL_OUTPUT) {
      pinStateText.node.textContent = `POWER ${
        pinState.state > 0 ? 'ON' : 'OFF'
      }`;
      return;
    }

    if (pinState.type === PIN_TYPE.ANALOG_OUTPUT) {
      pinStateText.node.textContent = `POWER ${pinState.state}`;
      return;
    }
  }

  public changeLightBulb(pinState: PinState) {
    const raysElements = (this.svg
      .select('#RAYS')
      .first() as Parent).children();

    const lightBulb = this.svg.select('#LIGHT_BULB').first();

    if (pinState.state <= 0) {
      lightBulb.fill('#F7F4E7');
      raysElements.forEach(e => e.hide());
      return;
    }

    if (pinState.type === PIN_TYPE.DIGITAL_OUTPUT) {
      lightBulb.fill('#FFF2A0');
      raysElements.forEach(e => e.show());
      return;
    }

    if (pinState.type === PIN_TYPE.ANALOG_OUTPUT) {
      const opacity = pinState.state > 255 ? 1 : pinState.state / 256;
      lightBulb.fill('#FFF2A0');
      lightBulb.opacity(opacity);
      raysElements.forEach(e => {
        e.show();
        e.opacity(opacity);
      });
      return;
    }
  }

  public isComponent(component: ElectricAttachmentComponentState): boolean {
    return (
      component instanceof PinState &&
      component.type === this.pinType &&
      component.pin === this.pin
    );
  }
  public resetComponent() {
    const pinText = this.svg.select('#PIN_TEXT').first() as Text;
    const pinStateText = this.svg.select('#STATE_TEXT').first() as Text;
    const lightBulb = this.svg.select('#LIGHT_BULB').first();
    const raysElements = (this.svg
      .select('#RAYS')
      .first() as Parent).children();

    pinText.node.textContent = `PIN ${this.pin}`;
    pinStateText.node.textContent = 'POWER OFF';

    lightBulb.fill('#F7F4E7');
    raysElements.forEach(e => e.hide());
  }
}

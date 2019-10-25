import { ComponentSvg } from './component.svg';
import { ArduinoState } from '../../player/arduino/state/arduino.state';
import { ElectricAttachmentComponentState } from '../../player/arduino/state/electric.state';
import { PinState, PIN_TYPE } from '../../player/arduino/state/pin.state';
import { Parent, Text } from 'svg.js';
import { ARDUINO_UNO_PINS } from '../../player/arduino/arduino_frame';

export class DigitalAnalogReadSvg extends ComponentSvg {
  constructor(
    public readonly svg: Parent,
    public readonly pinType: PIN_TYPE,
    public readonly pin: ARDUINO_UNO_PINS
  ) {
    super(svg);
    this.arduinoPins.push(this.pin);
  }

  public matchState(state: ArduinoState): void {
    const pinState = state.components.find((c) =>
      this.isComponent(c)
    ) as PinState;

    if (!pinState) {
      return;
    }

    const pinText = this.svg.select('#PIN_TEXT').first() as Text;
    pinText.node.textContent = `Pin ${this.pin}`;

    const pinStateText = this.svg.select('#READING_VALUE').first() as Text;
    if (pinState.type === PIN_TYPE.DIGITAL_INPUT) {
      const sensingPowerWord = pinState.state > 0 ? 'ON' : 'OFF';
      pinStateText.node.textContent = `Has power: ${sensingPowerWord}`;
    }

    if (pinState.type === PIN_TYPE.ANALOG_INPUT) {
      pinStateText.node.textContent = `Power level: ${pinState.state}`;
    }

    pinStateText.cx(8 + pinStateText.length() / 2);
  }

  public isComponent(component: ElectricAttachmentComponentState): boolean {
    return (
      component instanceof PinState &&
      this.pinType === component.type &&
      this.pin === component.pin
    );
  }

  public resetComponent() {
    const pinStateText = this.svg.select('#READING_VALUE').first() as Text;
    pinStateText.node.textContent = ``;
  }
}

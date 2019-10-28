import { ComponentSvg } from './component.svg';
import { Parent, Text } from 'svg.js';
import { ArduinoState } from '../../player/arduino/state/arduino.state';
import { ElectricAttachmentComponentState } from '../../player/arduino/state/electric.state';
import { ARDUINO_UNO_PINS } from '../../player/arduino/arduino_frame';
import { TemperatureState } from '../../player/arduino/state/temperature.state';

export class TempSensorSvg extends ComponentSvg {
  constructor(
    public readonly svg: Parent,
    public readonly pin: ARDUINO_UNO_PINS
  ) {
    super(svg);
    this.arduinoPins.push(pin);
  }

  public matchState(state: ArduinoState): void {
    const tempState = state.components.find((c) =>
      this.isComponent(c)
    ) as TemperatureState;

    const tempTextNode = this.svg.select('#TEMP_TEXT').first() as Text;
    const humidityTextNode = this.svg.select('#HUMIDITY_TEXT').first() as Text;

    tempTextNode.node.textContent = `Temperature ${tempState.temperature}˚C`;
    humidityTextNode.node.textContent = `Humidity ${tempState.humidity}`;

    humidityTextNode.x((120 - humidityTextNode.length()) / 2);
    tempTextNode.x((170 - tempTextNode.length()) / 2);
  }

  public isComponent(component: ElectricAttachmentComponentState): boolean {
    return component instanceof TemperatureState && component.pin === this.pin;
  }

  public resetComponent() {}
}

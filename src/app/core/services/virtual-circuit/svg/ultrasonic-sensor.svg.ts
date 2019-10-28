import { Parent, Text } from 'svg.js';
import { ArduinoState } from '../../player/arduino/state/arduino.state';
import { ElectricAttachmentComponentState } from '../../player/arduino/state/electric.state';
import { ComponentSvg } from './component.svg';
import { ARDUINO_UNO_PINS } from '../../player/arduino/arduino_frame';
import { UltraSonicSensorState } from '../../player/arduino/state/ultrasonic-sensor.state';

export class UltraSonicSensorSvg extends ComponentSvg {
  constructor(
    public readonly svg: Parent,
    public readonly trigPin: ARDUINO_UNO_PINS,
    public readonly echoPin: ARDUINO_UNO_PINS
  ) {
    super(svg);
    this.arduinoPins.push(this.trigPin);
    this.arduinoPins.push(this.echoPin);
  }

  public matchState(state: ArduinoState): void {
    const ultraSonicState = state.components.find((c) =>
      this.isComponent(c)
    ) as UltraSonicSensorState;

    const oneCmDistance = -4;
    const cyDistance =
      oneCmDistance * ultraSonicState.cm <= -200
        ? -200
        : oneCmDistance * ultraSonicState.cm;

    this.svg
      .select('#DISTANCE')
      .first()
      .cy(cyDistance);

    const distanceText = this.svg.select('#DISTANCE_TEXT').first() as Text;

    distanceText.node.textContent = `${ultraSonicState.cm} CM`;
    distanceText.x((79 - distanceText.length()) / 2);
  }

  public isComponent(component: ElectricAttachmentComponentState): boolean {
    return (
      component instanceof UltraSonicSensorState &&
      component.trigPin === this.trigPin &&
      component.echoPin === this.echoPin
    );
  }

  public resetComponent() {}
}

import { Parent, Text } from 'svg.js';
import { ArduinoState } from '../../player/arduino/state/arduino.state';
import { ServoState } from '../../player/arduino/state/servo.state';
import { ElectricAttachmentComponentState } from '../../player/arduino/state/electric.state';
import { ComponentSvg } from './component.svg';
import { ARDUINO_UNO_PINS } from '../../player/arduino/arduino_frame';

export class ServoSvg extends ComponentSvg {
  private degree = 0;

  private rotateBoundBox = this.svg
    .select('#CenterOfCicle')
    .first()
    .bbox();

  constructor(
    public readonly svg: Parent,
    public readonly pin: ARDUINO_UNO_PINS
  ) {
    super(svg);
    this.arduinoPins.push(this.pin);
  }

  public matchState(state: ArduinoState): void {
    const servoState = state.components
      .filter((servo) => servo instanceof ServoState)
      .find((servo: ServoState) => servo.pin === this.pin) as ServoState;

    if (servoState) {
      this.degree = servoState.degree;
      this.rotate();
      this.updateText();
    }
  }

  isComponent(component: ElectricAttachmentComponentState): boolean {
    return component instanceof ServoState && component.pin === this.pin;
  }

  public rotate() {
    this.svg
      .select('#moving_part')
      .first()
      .rotate(
        (this.degree + 4) * -1,
        this.rotateBoundBox.x,
        this.rotateBoundBox.y
      );
  }

  public updateText() {
    this.updateNameText();

    this.updateAngleText();
  }

  updateAngleText() {
    const degreeText = this.svg.select('#servo_degree').first() as Text;

    degreeText.node.textContent = `${this.degree}˚`;

    degreeText.x((70 - degreeText.length()) / 2);
  }

  updateNameText() {
    const servoName = this.svg.select('#servo_name').first() as Text;

    servoName.node.textContent = `Servo ${this.pin.toString()}`;

    servoName.x((70 - servoName.length()) / 2);
  }

  resetComponent() {
    this.degree = 0;
    this.rotate();
    this.updateText();
  }
}

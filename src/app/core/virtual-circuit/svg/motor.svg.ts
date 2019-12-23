import { AnimationSVG } from './component.svg';
import { ArduinoState } from '../../player/arduino/state/arduino.state';
import { ElectricAttachmentComponentState } from '../../player/arduino/state/electric.state';
import { Parent, Animation, Text } from 'svg.js';
import { MotorState } from '../../player/arduino/state/motor.state';

export class MotorSvg extends AnimationSVG {
  private motorDirection: string;
  private motorSpeed = 0;

  constructor(
    public readonly svg: Parent,
    public readonly startingState: MotorState
  ) {
    super(svg);
  }

  private animationObject: Animation | any;

  public matchState(state: ArduinoState): void {
    const motorState = state.components.find(c =>
      this.isComponent(c)
    ) as MotorState;

    if (!motorState) {
      return;
    }

    this.setText(motorState);

    if (motorState.speed <= 0 && this.animationObject) {
      this.animationObject.stop();
      return;
    }

    if (
      this.motorDirection === '' ||
      motorState.direction !== this.motorDirection ||
      this.motorSpeed !== motorState.speed ||
      (this.animationObject && !this.animationObject.active)
    ) {
      this.rotate(motorState.direction.toLowerCase(), motorState.speed);
      this.motorDirection = motorState.direction;
      this.motorSpeed = motorState.speed;
      return;
    }
  }

  private setText(motorState: MotorState) {
    const motorText = this.svg.select('#motor_info').first() as Text;

    motorText.node.textContent = `Motor ${motorState.motorNumber}`;

    const speedText = this.svg.select('#speed').first() as Text;

    speedText.node.textContent = `Speed ${motorState.speed}`;

    const directionText = this.svg.select('#direction').first() as Text;

    directionText.node.textContent = `Direction ${motorState.direction.toLowerCase()}`;
  }

  public isComponent(component: ElectricAttachmentComponentState): boolean {
    return (
      component instanceof MotorState &&
      component.motorNumber === this.startingState.motorNumber
    );
  }

  public stop() {
    if (this.animationObject) {
      this.animationObject.stop(true, true);
    }
  }

  public resetComponent() {
    this.stop();
    const speedText = this.svg.select('#speed').first() as Text;

    speedText.node.textContent = `Speed 0`;

    const directionText = this.svg.select('#direction').first() as Text;

    directionText.node.textContent = `Direction`;
  }

  public rotate(direction = 'forward', speed = 1) {
    const centerCircle = this.svg.select('#inner-circle').first();
    if (this.animationObject) {
      this.animationObject.stop(true, true);
    }

    const timeItTakesToLoop2TimesAround = 700 + 3000 / speed;
    this.animationObject = (this.svg
      .select('#motor')
      .first()
      .animate(timeItTakesToLoop2TimesAround, '-')
      .rotate(
        direction === 'forward' ? 720 : -720,
        centerCircle.cx(),
        centerCircle.cy()
      ) as any).loop();
  }
}

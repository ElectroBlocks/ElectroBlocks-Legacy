import { ComponentSvg } from './component.svg';
import { ArduinoState } from '../../player/arduino/state/arduino.state';
import { ElectricAttachmentComponentState } from '../../player/arduino/state/electric.state';
import { Parent, Animation } from 'svg.js';
import { MotorState } from '../../player/arduino/state/motor.state';

export class MotorSvg extends ComponentSvg {
  private motorDirection: string;

  constructor(
    public readonly svg: Parent,
    public readonly startingState: MotorState
  ) {
    super(svg);
  }

  private animationObject: Animation | any;

  public matchState(state: ArduinoState): void {
    const motorState = state.components.find((c) =>
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
      motorState.direction !== this.motorDirection
    ) {
      this.rotate(motorState.direction.toLowerCase());
      this.motorDirection = motorState.direction;
      return;
    }
  }

  private setText(motorState: MotorState) {}

  public shouldExist(state: ArduinoState): boolean {
    return state.components.find((c) => this.isComponent(c)) !== undefined;
  }

  public isComponent(component: ElectricAttachmentComponentState): boolean {
    return (
      component instanceof MotorState &&
      component.motorNumber == this.startingState.motorNumber
    );
  }

  public resetComponent() {
    if (this.animationObject) {
      this.animationObject.stop(true, true);
      // TODO RESET SPEED
    }
  }

  public rotate(direction = 'forward') {
    const centerCircle = this.svg.select('#inner-circle').first();
    if (this.animationObject) {
      this.animationObject.stop(true, true);
    }
    this.animationObject = (this.svg
      .select('#propellor')
      .first()
      .animate(2000, '-')
      .rotate(
        direction == 'forward' ? 720 : -720,
        centerCircle.cx(),
        centerCircle.cy()
      ) as any).loop();
  }
}

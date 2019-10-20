import { ComponentSvg } from './component.svg';
import { ArduinoState } from '../../player/arduino/state/arduino.state';
import { ElectricAttachmentComponentState } from '../../player/arduino/state/electric.state';
import { Parent } from 'svg.js';
import { MotorState } from '../../player/arduino/state/motor.state';

export class MotorSvg extends ComponentSvg {
  constructor(
    public readonly svg: Parent,
    public readonly startingState: MotorState
  ) {
    super(svg);
  }

    private animationObject: any;  
    
  public matchState(state: ArduinoState): void {}

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
    throw new Error('Method not implemented.');
  }
    
    public rotate() {

        const centerCircle = this.svg.select('#inner-circle').first();

        this.animationObject = (this.svg
          .select('#propellor')
          .first()
          .animate(1000)
          .rotate(360, centerCircle.cx(), centerCircle.cy()) as any).loop();
    }

}

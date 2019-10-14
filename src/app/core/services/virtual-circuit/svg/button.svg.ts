import { ComponentSvg } from './component.svg';
import { ArduinoState } from '../../player/arduino/state/arduino.state';
import { ElectricAttachmentComponentState } from '../../player/arduino/state/electric.state';
import { ButtonState } from '../../player/arduino/state/button.state';
import { Parent, Text } from 'svg.js';


export class ButtonSvg extends ComponentSvg {

    constructor(public readonly state: ButtonState, public readonly svg: Parent) {
        super(svg);
        this.arduinoPins.push(state.pin);
    }

    public matchState(state: ArduinoState): void {

    }    
    
    public shouldExist(state: ArduinoState): boolean {
        return state.components.find(b =>  this.isComponent(b)) !== undefined;
    }
    public isComponent(component: ElectricAttachmentComponentState): boolean {
        return component instanceof ButtonState && component.pin === this.state.pin;
    }

    public resetComponent() {
        
    }


}
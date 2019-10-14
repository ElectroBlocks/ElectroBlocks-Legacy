import { ARDUINO_UNO_PINS } from './../arduino_frame';
import { ElectricComponentType } from './electric.component.type';
import {
  ElectricAttachmentComponentState,
  SensorComponent
} from './electric.state';

export class ButtonState extends SensorComponent {

    public readonly type = 'button_component';
    public readonly electricComponentType = ElectricComponentType.BUTTON;
  
    constructor(
        public readonly pin: ARDUINO_UNO_PINS, 
        public readonly isPressed: boolean) {
        super();
        this.pins.push(pin);
    }


    public getFieldValue(dataKeySaveInSetupBlock: string) {
        if (dataKeySaveInSetupBlock == 'is_button_pressed') {
            return this.isPressed;
        }

        return this.isPressed;
    }

    public isEqual(state: ElectricAttachmentComponentState): boolean {
        return state instanceof ButtonState && state.pin === state.pin;
    }
}
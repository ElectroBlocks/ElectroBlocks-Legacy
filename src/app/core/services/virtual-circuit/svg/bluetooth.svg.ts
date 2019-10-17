import { ComponentSvg } from './component.svg';
import { ArduinoState } from '../../player/arduino/state/arduino.state';
import { ElectricAttachmentComponentState } from '../../player/arduino/state/electric.state';
import { ButtonState } from '../../player/arduino/state/button.state';
import { Parent, Text } from 'svg.js';
import { BluetoothState } from '../../player/arduino/state/bluetooth.state';

export class BluetoothSVG extends ComponentSvg {
  constructor(
    public readonly svg: Parent,
    public readonly state: BluetoothState
  ) {
    super(svg);
  }

  public matchState(state: ArduinoState): void {}
  public shouldExist(state: ArduinoState): boolean {
    return state.components.find(c => this.isComponent(c)) !== undefined;
  }
  public isComponent(component: ElectricAttachmentComponentState): boolean {
    return this.state.isEqual(component);
  }

  public resetComponent() {}
}

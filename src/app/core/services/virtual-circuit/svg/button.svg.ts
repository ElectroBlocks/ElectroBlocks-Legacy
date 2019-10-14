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
    const btnState = state.components.find(b =>
      this.isComponent(b)
    ) as ButtonState;
    const buttonTextNode = this.svg.select('#BUTTON_TEXT').first() as Text;
    buttonTextNode.node.textContent = `Button ${btnState.pin}`;
    const pressedStateNode = this.svg.select('#PRESSED_STATE').first() as Text;

    if (btnState.isPressed) {
      this.svg
        .select('#THUMB_UP')
        .first()
        .show();
      this.svg
        .select('#THUMB_DOWN')
        .first()
        .hide();
      pressedStateNode.node.textContent = 'Pressed';
      return;
    }

    this.svg
      .select('#THUMB_UP')
      .first()
      .hide();
    this.svg
      .select('#THUMB_DOWN')
      .first()
      .show();
    pressedStateNode.node.textContent = 'Not Pressed';
    return;
  }

  public shouldExist(state: ArduinoState): boolean {
    return state.components.find(b => this.isComponent(b)) !== undefined;
  }
  public isComponent(component: ElectricAttachmentComponentState): boolean {
    return component instanceof ButtonState && component.pin === this.state.pin;
  }

  public resetComponent() {}
}

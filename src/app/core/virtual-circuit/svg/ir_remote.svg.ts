import { ComponentSvg } from './component.svg';
import { ArduinoState } from '../../player/arduino/state/arduino.state';
import { ElectricAttachmentComponentState } from '../../player/arduino/state/electric.state';
import { PinState, PIN_TYPE } from '../../player/arduino/state/pin.state';
import { Parent, Text } from 'svg.js';
import { ARDUINO_UNO_PINS } from '../../player/arduino/arduino_frame';
import { IRRemoteState } from '../../player/arduino/state/ir_remote.state';

export class IRRemoteSvg extends ComponentSvg {
  constructor(
    public readonly svg: Parent,
    public readonly analogPin: ARDUINO_UNO_PINS
  ) {
    super(svg);
    this.arduinoPins.push(analogPin);
  }

  public matchState(state: ArduinoState): void {
    const irRemote = state.components.find(c =>
      this.isComponent(c)
    ) as IRRemoteState;

    if (!irRemote.hasCode) {
      this.notRecievingCode();
      return;
    }
    this.svg
      .select('#recieving_code_text')
      .first()
      .show();
    const codeText = this.svg.select('#code').first() as Text;
    codeText.node.textContent = irRemote.code || 'NOT SET';
    codeText.show();
    codeText.x((79 - codeText.length()) / 2);

    this.svg
      .select('#FOUND_SOMETHING rect')
      .first()
      .fill('#AA0000');

    this.svg
      .select('#Signnal')
      .first()
      .show();
  }

  public notRecievingCode() {
    this.svg
      .select('#code')
      .first()
      .hide();
    this.svg
      .select('#recieving_code_text')
      .first()
      .hide();

    this.svg
      .select('#FOUND_SOMETHING rect')
      .first()
      .fill('#DEE2DE');

    this.svg
      .select('#Signnal')
      .first()
      .hide();
  }

  public isComponent(component: ElectricAttachmentComponentState): boolean {
    return (
      component instanceof IRRemoteState &&
      component.analogPin === this.analogPin
    );
  }
  public resetComponent() {}
}

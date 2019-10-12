import { ComponentSvg } from './component.svg';
import { ArduinoState } from '../../player/arduino/state/arduino.state';
import { ElectricAttachmentComponentState } from '../../player/arduino/state/electric.state';
import { Parent, Text } from 'svg.js';
import { RFIDState } from '../../player/arduino/state/rfid.state';

export class RFIDSvg extends ComponentSvg {
  constructor(public readonly state: RFIDState, public readonly svg: Parent) {
    super(svg);
    this.arduinoPins.push(state.txPin);
    this.arduinoPins.push(state.rxPin);
  }

  public matchState(state: ArduinoState): void {
    const rfidState = state.components.find(c =>
      this.isComponent(c)
    ) as RFIDState;
    if (rfidState.scannedCard) {
      this.updateText(rfidState.tag, rfidState.cardNumber);
      this.svg
        .select('#RFID')
        .first()
        .show();
    } else {
      this.svg
        .select('#RFID')
        .first()
        .hide();
    }
  }

  public updateText(tag: string, cardNumber: string) {
    const tagNode = this.svg.select('#Text_Tag').first() as Text;
    const cardNumberNode = this.svg.select('#Card_Numebr').first() as Text;

    cardNumberNode.node.textContent = `Card#: ${cardNumber}`;
    tagNode.node.textContent = `Tag: ${tag}`;
  }

  public shouldExist(state: ArduinoState): boolean {
    return state.components.find(c => this.isComponent(c)) !== undefined;
  }
  public isComponent(component: ElectricAttachmentComponentState): boolean {
    return (
      component instanceof RFIDState &&
      this.state.txPin === component.txPin &&
      this.state.rxPin === component.rxPin
    );
  }
  public resetComponent() {}
}

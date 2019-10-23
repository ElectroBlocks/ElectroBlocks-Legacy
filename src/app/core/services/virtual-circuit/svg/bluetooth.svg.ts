import { ComponentSvg } from './component.svg';
import { ArduinoState } from '../../player/arduino/state/arduino.state';
import { ElectricAttachmentComponentState } from '../../player/arduino/state/electric.state';
import { Parent, Text } from 'svg.js';
import { BluetoothState } from '../../player/arduino/state/bluetooth.state';

export class BluetoothSVG extends ComponentSvg {
  constructor(
    public readonly svg: Parent,
    public readonly state: BluetoothState
  ) {
    super(svg);
    this.arduinoPins.push(state.txPin);
    this.arduinoPins.push(state.rxPin);
  }

  public matchState(state: ArduinoState): void {
    const bluetoothState = state.components.find(c =>
      this.isComponent(c)
    ) as BluetoothState;

    if (bluetoothState.sendMessage.length > 0) {
      this.displayMessage(bluetoothState.sendMessage, 'Sending Message:');
      return;
    }

    if (bluetoothState.hasMessage) {
      this.displayMessage(bluetoothState.receivedMessage, 'Received Message:');
      return;
    }

    this.svg
      .select('#MESSAGE_BUBBLE')
      .first()
      .hide();
    this.svg
      .select('#MESSAGE_LINE_1')
      .first()
      .hide();
    this.svg
      .select('#MESSAGE_LINE_2')
      .first()
      .hide();
    this.svg
      .select('#MESSAGE_LINE_3')
      .first()
      .hide();
  }
  
  public isComponent(component: ElectricAttachmentComponentState): boolean {
    return this.state.isEqual(component);
  }

  public resetComponent() {}

  private displayMessage(message: string, header: string) {
    this.svg
      .select('#MESSAGE_BUBBLE')
      .first()
      .show();
    const textLine1 = this.svg.select('#MESSAGE_LINE_1').first() as Text;
    textLine1.show();
    textLine1.node.textContent = header;
    if (message.length > 38) {
      message = message.slice(0, 35) + '...';
    }
    const textLine2 = this.svg.select('#MESSAGE_LINE_2').first() as Text;
    textLine2.node.textContent = message.slice(0, 18);
    textLine2.show();
    const textLine3 = this.svg.select('#MESSAGE_LINE_3').first() as Text;

    if (message.length > 18) {
      textLine3.node.textContent = message.slice(18);
      textLine3.show();
    } else {
      textLine3.hide();
    }
  }
}

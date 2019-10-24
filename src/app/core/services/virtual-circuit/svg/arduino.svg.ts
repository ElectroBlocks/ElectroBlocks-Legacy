import { Parent, Text } from 'svg.js';
import { BaseSvg } from './base.svg';
import { ArduinoState } from '../../player/arduino/state/arduino.state';
import { ARDUINO_UNO_PINS } from '../../player/arduino/arduino_frame';
import { ArduinoMessageState } from '../../player/arduino/state/arduino-message.state';

export class ArduinoSvg extends BaseSvg {
  public matchState(state: ArduinoState): void {

    if (state.txLedOn) {
    }

    if (!state.txLedOn) {
      this.turnOffLed(ARDUINO_LEDS.TX_LED);
    }

    if (state.powerLedOn) {
      this.turnOnLed(ARDUINO_LEDS.POWER_LED);
    }

    if (!state.powerLedOn) {
      this.turnOffLed(ARDUINO_LEDS.POWER_LED);
    }



    if (state.sendMessage.length > 0) {
      this.turnOffLed(ARDUINO_LEDS.RX_LED);
      this.showMessage('Send Message:', state.sendMessage);
      return;
    }

    const message = state.components.find(c => c instanceof ArduinoMessageState) as ArduinoMessageState;

    if (message && message.recievingMessage) {
            this.turnOnLed(ARDUINO_LEDS.RX_LED);
      this.showMessage('Recieved Message:', message.message);
      return;
    }

    this.hideMessage();
      this.turnOffLed(ARDUINO_LEDS.RX_LED);

  }

  /**
   * Turns on an led
   */
  public turnOnLed(led: ARDUINO_LEDS) {
    if (led === ARDUINO_LEDS.POWER_LED) {
      this.svg.select(`#${ARDUINO_LEDS.POWER_LED}`).first().node.style.fill =
        LED_COLORS.POWER_ON;

      return this;
    }

    this.svg.select(`#${led}`).first().node.style.fill = LED_COLORS.LED_ON;

    return this;
  }

  public turnOffLed(led: ARDUINO_LEDS) {
    this.svg.select(`#${led}`).first().node.style.fill = LED_COLORS.LED_OFF;

    return this;
  }

  public hideWires() {
    this.hidePinWires();
    const powerLedGroup = this.svg
      .select(`#${ARDUINO_BREADBOARD_WIRES.Power}`)
      .first() as Parent;

    powerLedGroup.children().forEach(wire => {
      wire.hide();
    });

    return this;
  }

  public hidePinWires() {
    const wirePinGroup = this.svg
      .select(`#${ARDUINO_BREADBOARD_WIRES.Wires_To_Pins}`)
      .first() as Parent;

    wirePinGroup.children().forEach(wire => {
      wire.hide();
    });

    return this;
  }

  public hideWire(wire: ARDUINO_BREADBOARD_WIRES) {
    this.svg
      .select(`#${wire}`)
      .first()
      .hide();

    return this;
  }

  public showWire(wire: ARDUINO_BREADBOARD_WIRES) {
    this.svg
      .select(`#${wire}`)
      .first()
      .show();
    return this;
  }

  public showMessage(title: string, message: string) {
    const titleNode = this.svg.select('#MESSAGE_ARDUINO_TITLE').first() as Text;

    titleNode.node.textContent = title;
    titleNode.show();

    if (message.length > 34) {
      message = message.slice(0, 31) + '...';
    }

    const textLine1 = this.svg
      .select('#MESSAGE_ARDUINO_LINE_1')
      .first() as Text;
    textLine1.node.textContent = message.slice(0, 17);
    textLine1.show();
    const textLine2 = this.svg
      .select('#MESSAGE_ARDUINO_LINE_2')
      .first() as Text;

    if (message.length > 17) {
      textLine2.node.textContent = message.slice(17);
      textLine2.show();
    } else {
      textLine2.hide();
    }

    this.svg
      .select('#MESSAGE_BUBBLE_ARDUINO')
      .first()
      .show();
  }

  public hideMessage() {
    this.svg
      .select('#MESSAGE_ARDUINO_TITLE')
      .first()
      .hide();

    this.svg
      .select('#MESSAGE_ARDUINO_LINE_1')
      .first()
      .hide();

    this.svg
      .select('#MESSAGE_ARDUINO_LINE_2')
      .first()
      .hide();

    this.svg
      .select('#MESSAGE_BUBBLE_ARDUINO')
      .first()
      .hide();
  }
}

export enum LED_COLORS {
  LED_ON = '#ffa922',
  LED_OFF = '#F2F2F2',
  POWER_ON = '#49ff7e'
}

export enum ARDUINO_LEDS {
  POWER_LED = 'POWER_LED',
  BUILT_IN_LED = 'BUILT_IN_LED',
  RX_LED = 'RX_LED',
  TX_LED = 'TX_LED'
}

export enum ARDUINO_BREADBOARD_WIRES {
  Wires_To_Pins = 'Wires_To_Pins',
  Power = 'Power',
  GND = 'GND',
  VIN = 'VIN',
  PIN_A0 = 'PIN_A0',
  PIN_A1 = 'PIN_A1',
  PIN_A2 = 'PIN_A2',
  PIN_A3 = 'PIN_A3',
  PIN_A4 = 'PIN_A4',
  PIN_A5 = 'PIN_A5',
  PIN_2 = 'PIN_2',
  PIN_3 = 'PIN_3',
  PIN_4 = 'PIN_4',
  PIN_5 = 'PIN_5',
  PIN_6 = 'PIN_6',
  PIN_7 = 'PIN_7',
  PIN_8 = 'PIN_8',
  PIN_9 = 'PIN_9',
  PIN_10 = 'PIN_10',
  PIN_11 = 'PIN_11',
  PIN_12 = 'PIN_12',
  PIN_13 = 'PIN_13'
}

export enum ARDUINO_BREADBOARD_WIRES_CONNECT_POINTS {
  PIN_13 = 'pin2C',
  PIN_12 = 'pin6C',
  PIN_11 = 'pin9C',
  PIN_10 = 'pin13C',
  PIN_9 = 'pin18C',
  PIN_8 = 'pin22C',
  PIN_7 = 'pin27C',
  PIN_6 = 'pin31C',
  PIN_5 = 'pin37C',
  PIN_4 = 'pin41C',
  PIN_3 = 'pin46C',
  PIN_2 = 'pin51C',
  PIN_A0 = 'pin54C',
  PIN_A1 = 'pin58C',
  PIN_A2 = 'pin4H',
  PIN_A3 = 'pin8H',
  PIN_A4 = 'pin12H',
  PIN_A5 = 'pin16H'
}

export const connectionToBreadboard = (pin: ARDUINO_UNO_PINS) => {
  switch (pin) {
    case ARDUINO_UNO_PINS.PIN_2:
      return ARDUINO_BREADBOARD_WIRES_CONNECT_POINTS.PIN_2;
    case ARDUINO_UNO_PINS.PIN_3:
      return ARDUINO_BREADBOARD_WIRES_CONNECT_POINTS.PIN_3;
    case ARDUINO_UNO_PINS.PIN_4:
      return ARDUINO_BREADBOARD_WIRES_CONNECT_POINTS.PIN_4;
    case ARDUINO_UNO_PINS.PIN_5:
      return ARDUINO_BREADBOARD_WIRES_CONNECT_POINTS.PIN_5;
    case ARDUINO_UNO_PINS.PIN_6:
      return ARDUINO_BREADBOARD_WIRES_CONNECT_POINTS.PIN_6;
    case ARDUINO_UNO_PINS.PIN_7:
      return ARDUINO_BREADBOARD_WIRES_CONNECT_POINTS.PIN_7;
    case ARDUINO_UNO_PINS.PIN_8:
      return ARDUINO_BREADBOARD_WIRES_CONNECT_POINTS.PIN_8;
    case ARDUINO_UNO_PINS.PIN_9:
      return ARDUINO_BREADBOARD_WIRES_CONNECT_POINTS.PIN_9;
    case ARDUINO_UNO_PINS.PIN_10:
      return ARDUINO_BREADBOARD_WIRES_CONNECT_POINTS.PIN_10;
    case ARDUINO_UNO_PINS.PIN_11:
      return ARDUINO_BREADBOARD_WIRES_CONNECT_POINTS.PIN_11;
    case ARDUINO_UNO_PINS.PIN_12:
      return ARDUINO_BREADBOARD_WIRES_CONNECT_POINTS.PIN_12;
    case ARDUINO_UNO_PINS.PIN_13:
      return ARDUINO_BREADBOARD_WIRES_CONNECT_POINTS.PIN_13;
    case ARDUINO_UNO_PINS.PIN_A0:
      return ARDUINO_BREADBOARD_WIRES_CONNECT_POINTS.PIN_A0;
    case ARDUINO_UNO_PINS.PIN_A1:
      return ARDUINO_BREADBOARD_WIRES_CONNECT_POINTS.PIN_A1;
    case ARDUINO_UNO_PINS.PIN_A2:
      return ARDUINO_BREADBOARD_WIRES_CONNECT_POINTS.PIN_A2;
    case ARDUINO_UNO_PINS.PIN_A3:
      return ARDUINO_BREADBOARD_WIRES_CONNECT_POINTS.PIN_A3;
    case ARDUINO_UNO_PINS.PIN_A4:
      return ARDUINO_BREADBOARD_WIRES_CONNECT_POINTS.PIN_A4;
    case ARDUINO_UNO_PINS.PIN_A5:
      return ARDUINO_BREADBOARD_WIRES_CONNECT_POINTS.PIN_A5;
    default:
      return ARDUINO_BREADBOARD_WIRES_CONNECT_POINTS.PIN_2;
  }
};

export const virtualCircuitPin = (pin: ARDUINO_UNO_PINS) => {
  switch (pin) {
    case ARDUINO_UNO_PINS.PIN_2:
      return ARDUINO_BREADBOARD_WIRES.PIN_2;
    case ARDUINO_UNO_PINS.PIN_3:
      return ARDUINO_BREADBOARD_WIRES.PIN_3;
    case ARDUINO_UNO_PINS.PIN_4:
      return ARDUINO_BREADBOARD_WIRES.PIN_4;
    case ARDUINO_UNO_PINS.PIN_5:
      return ARDUINO_BREADBOARD_WIRES.PIN_5;
    case ARDUINO_UNO_PINS.PIN_6:
      return ARDUINO_BREADBOARD_WIRES.PIN_6;
    case ARDUINO_UNO_PINS.PIN_7:
      return ARDUINO_BREADBOARD_WIRES.PIN_7;
    case ARDUINO_UNO_PINS.PIN_8:
      return ARDUINO_BREADBOARD_WIRES.PIN_8;
    case ARDUINO_UNO_PINS.PIN_9:
      return ARDUINO_BREADBOARD_WIRES.PIN_9;
    case ARDUINO_UNO_PINS.PIN_10:
      return ARDUINO_BREADBOARD_WIRES.PIN_10;
    case ARDUINO_UNO_PINS.PIN_11:
      return ARDUINO_BREADBOARD_WIRES.PIN_11;
    case ARDUINO_UNO_PINS.PIN_12:
      return ARDUINO_BREADBOARD_WIRES.PIN_12;
    case ARDUINO_UNO_PINS.PIN_13:
      return ARDUINO_BREADBOARD_WIRES.PIN_13;
    case ARDUINO_UNO_PINS.PIN_A0:
      return ARDUINO_BREADBOARD_WIRES.PIN_A0;
    case ARDUINO_UNO_PINS.PIN_A1:
      return ARDUINO_BREADBOARD_WIRES.PIN_A1;
    case ARDUINO_UNO_PINS.PIN_A2:
      return ARDUINO_BREADBOARD_WIRES.PIN_A2;
    case ARDUINO_UNO_PINS.PIN_A3:
      return ARDUINO_BREADBOARD_WIRES.PIN_A3;
    case ARDUINO_UNO_PINS.PIN_A4:
      return ARDUINO_BREADBOARD_WIRES.PIN_A4;
    case ARDUINO_UNO_PINS.PIN_A5:
      return ARDUINO_BREADBOARD_WIRES.PIN_A5;
    default:
      return ARDUINO_BREADBOARD_WIRES.PIN_2;
  }
};

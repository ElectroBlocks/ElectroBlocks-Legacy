import { LedColorSvg } from './led-color.svg';
import { ShowArduinoCommunicator } from './../communicators/show-arduino.comm';
import { Parent, G } from 'svg.js';
import {
  ArduinoSvg,
  virtualCircuitPin,
  connectionToBreadboard,
  ARDUINO_BREADBOARD_WIRES
} from './arduino.svg';
import { ArduinoState } from '../../player/arduino/state/arduino.state';
import { ElectricAttachmentComponentState } from '../../player/arduino/state/electric.state';
import { servoFactory } from '../factory/servo-svg.factory';
import { ServoState } from '../../player/arduino/state/servo.state';
import { ComponentSvg, AnimationSVG } from './component.svg';
import { NeoPixelStripState } from '../../player/arduino/state/neo_pixel_strip.state';
import { neoPixelFactory } from '../factory/neopixel-svg.factory';
import { LedMatrixState } from '../../player/arduino/state/led_matrix.state';
import { matrixFactory } from '../factory/matrix-svg.factory';
import {
  PinState,
  PIN_TYPE,
  PinPicture
} from '../../player/arduino/state/pin.state';
import {
  ledFactory,
  outputPinFactory,
  inputPinFactory
} from '../factory/pin.factory';
import { LedColorState } from '../../player/arduino/state/led_color.state';
import { rgbLedFactory } from '../factory/led-color.factory';
import { LCDScreenState } from '../../player/arduino/state/lcd_screen.state';
import { lcdFactory } from '../factory/lcd-svg.factory';
import { Resistor } from './resistor';
import { RFIDState } from '../../player/arduino/state/rfid.state';
import { rfidFactory } from '../factory/rfid-svg.factory';
import { buttonFactory } from '../factory/button-svg.factory';
import { resetBreadBoardWholes } from './next-wire.state';
import { ButtonState } from '../../player/arduino/state/button.state';
import { BluetoothState } from '../../player/arduino/state/bluetooth.state';
import { bluetoothFactory } from '../factory/bluetooth-svg.factory';
import { MotorState } from '../../player/arduino/state/motor.state';
import { motorFactory } from '../factory/motor-svg.factory';

export class VirtualCircuit {
  private svgs: ComponentSvg[] = [];
  private runningFinalState = false;

  constructor(
    public readonly baseSVG: svgjs.Doc,
    public readonly nodes: G,
    public readonly arduino: ArduinoSvg,
    public readonly showArduinoComm: ShowArduinoCommunicator,
    public readonly zoom: {
      zoom: (
        zoomFactor: number,
        x?: number,
        y?: number,
        otherNumber?: number
      ) => void;
      elm: Parent;
      transform: {
        x: number;
        y: number;
        scaleX: number;
      };
      setPosition: (x: number, y: number) => void;
    }
  ) {
    this.arduino.svg.on('dragstart', () => {
      this.updateWires();
    });

    this.arduino.svg.on('dragmove', () => {
      this.updateWires();
    });

    this.arduino.svg.on('dragend', () => {
      this.updateWires();
    });
  }

  public remove() {
    this.arduino.remove();
    this.svgs.forEach((s) => s.remove());
    this.baseSVG.remove();
  }

  protected updateWires() {
    this.svgs.forEach((svg) => {
      svg.updateWires();
    });
  }

  public zoomIn() {
    this.zoom.zoom(this.zoom.transform.scaleX + 0.1);
  }

  public zoomOut() {
    this.zoom.zoom(this.zoom.transform.scaleX - 0.1);
  }

  public moveAndCenter() {
    resetBreadBoardWholes();
    const containerHeight = document.getElementById('virtual-circuit')
      .clientHeight;
    const scaleFactor =
      ((containerHeight - 100) /
        this.arduino.svg.node.getClientRects()[0].height) *
      0.7;
    console.log(scaleFactor, 'scaleFactor');
    const containerWidth = document.getElementById('virtual-circuit')
      .clientWidth;
    const setXPosition =
      containerWidth / 2 - (this.arduino.svg.bbox().w / 2 + 100) * scaleFactor;
    console.log(containerHeight);
    this.zoom.zoom(scaleFactor);
    this.zoom.setPosition(
      setXPosition,
      containerHeight - (this.arduino.svg.height() - 30) * scaleFactor
    );
  }

  public matchState(state: ArduinoState) {
    this.arduino.matchState(state);

    this.svgs.forEach((svg) => {
      svg.matchState(state);
    });

    const resetSvgs = this.svgs.filter((svg) => {
      return !svg.shouldExist(state);
    });

    resetSvgs.forEach((svg) => {
      svg.resetComponent();
    });
  }

  public hideArduino() {
    this.arduino.hideWires();
    this.arduino.svg.hide();
    this.svgs.forEach((svg) => {
      svg.hideWires();
      if (svg instanceof Resistor) {
        svg.svg.hide();
      }

      if (svg instanceof LedColorSvg) {
        svg.resistors.forEach((resistor) => resistor.svg.hide());
      }
    });
  }

  async matchFinalState(state: ArduinoState, runSetup: boolean) {
    if (!runSetup || this.runningFinalState) {
      console.log('not running final state with', state);
      return;
    }
    console.log('running final state with', state);

    this.runningFinalState = true;
    this.svgs.forEach((svg) => {
      if (!svg.shouldExist(state)) {
        svg.remove();
        svg.getArduinoPins().forEach((pin) => {
          this.arduino.hideWire(virtualCircuitPin(pin));
        });
        this.svgs = this.svgs.filter((svgCompare) => svgCompare !== svg);
      }
    });

    const components = state.components;
    for (let i = 0; i < components.length; i += 1) {
      const doesComponentExist =
        this.svgs.findIndex((svg) => svg.isComponent(components[i])) >= 0;

      if (!doesComponentExist) {
        await this.createComponent(components[i]);
      }
    }
    this.runningFinalState = false;
  }

  public moveRight() {
    this.zoom.setPosition(this.zoom.transform.x + 5, this.zoom.transform.y);
  }

  public moveLeft() {
    this.zoom.setPosition(this.zoom.transform.x - 5, this.zoom.transform.y);
  }

  public moveUp() {
    this.zoom.setPosition(this.zoom.transform.x, this.zoom.transform.y - 5);
  }

  public moveDown() {
    this.zoom.setPosition(this.zoom.transform.x, this.zoom.transform.y + 5);
  }

  async createComponent(component: ElectricAttachmentComponentState) {
    if (component instanceof ServoState) {
      this.svgs.push(
        await servoFactory(
          this,
          component,
          !this.showArduinoComm.getShowArduino()
        )
      );
      return;
    }

    if (component instanceof NeoPixelStripState) {
      this.svgs.push(
        await neoPixelFactory(
          this,
          component,
          !this.showArduinoComm.getShowArduino()
        )
      );
      return;
    }

    if (component instanceof RFIDState) {
      this.svgs.push(
        await rfidFactory(
          this,
          component,
          !this.showArduinoComm.getShowArduino()
        )
      );
      return;
    }

    if (component instanceof MotorState) {
      this.svgs.push(
        await motorFactory(
          this,
          component,
          !this.showArduinoComm.getShowArduino()
        )
      );
      return;
    }

    if (component instanceof LedMatrixState) {
      this.svgs.push(
        await matrixFactory(this, !this.showArduinoComm.getShowArduino())
      );
      return;
    }

    if (
      component instanceof PinState &&
      component.pinPicture === PinPicture.LED
    ) {
      (await ledFactory(
        this,
        component,
        !this.showArduinoComm.getShowArduino()
      )).forEach((c) => this.svgs.push(c));
      return;
    }

    if (
      component instanceof PinState &&
      [PIN_TYPE.DIGITAL_OUTPUT, PIN_TYPE.ANALOG_OUTPUT].includes(component.type)
    ) {
      this.svgs.push(
        await outputPinFactory(
          this,
          component,
          !this.showArduinoComm.getShowArduino()
        )
      );
      return;
    }

    if (
      component instanceof PinState &&
      [PIN_TYPE.DIGITAL_INPUT, PIN_TYPE.ANALOG_INPUT].includes(component.type)
    ) {
      this.svgs.push(
        await inputPinFactory(
          this,
          component,
          !this.showArduinoComm.getShowArduino()
        )
      );
      return;
    }
    if (component instanceof LedColorState) {
      this.svgs.push(
        await rgbLedFactory(
          this,
          component,
          !this.showArduinoComm.getShowArduino()
        )
      );
      return;
    }

    if (component instanceof BluetoothState) {
      this.svgs.push(
        await bluetoothFactory(
          this,
          component,
          !this.showArduinoComm.getShowArduino()
        )
      );
      return;
    }

    if (component instanceof LCDScreenState) {
      this.svgs.push(
        await lcdFactory(
          this,
          component,
          !this.showArduinoComm.getShowArduino()
        )
      );
      return;
    }

    if (component instanceof ButtonState) {
      this.svgs.push(
        await buttonFactory(
          this,
          component,
          !this.showArduinoComm.getShowArduino()
        )
      );
      return;
    }
  }

  public reset() {
    this.svgs.forEach((component) => {
      component.getArduinoPins().forEach((pin) => {
        this.arduino.hideWire(virtualCircuitPin(pin));
      });
      component.remove();
    });
    this.svgs.forEach((c) => {
      c = undefined;
    });

    this.svgs = [];
  }

  public stopAllAnimations() {
    this.svgs
      .filter((svg) => svg instanceof AnimationSVG)
      .forEach((svg: AnimationSVG) => svg.stop());
  }
}

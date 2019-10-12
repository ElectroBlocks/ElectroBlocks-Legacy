import { Element } from 'svg.js';
import {
  returnBottomHole,
  takeClosestBottomBreadboardHole,
  takeNextBottomBreadboardHole
} from './next-wire.state';
import { VirtualCircuit } from './virtual-circuit';
import { ComponentSvg } from './component.svg';
import { connectionToBreadboard } from './arduino.svg';
import { ARDUINO_UNO_PINS } from '../../player/arduino/arduino_frame';

export class Wire implements Line {
  constructor(
    public readonly line: svgjs.Line,
    private component: Element,
    private breadBoardHole: Element,
    private connectionInfo: {
      type: 'power' | 'ground' | 'breadboard';
      holeNumber: number;
    },
    private color: string
  ) {}

  updateConnection() {
    const [x1, y1] = this.getHoleXY();
    const [x2, y2] = this.getBottomMiddlePoint();

    this.line
      .plot(x1, y1, x2, y2)
      .stroke({ width: 2, color: this.color, linecap: 'round' });
  }

  getBottomMiddlePoint() {
    const { scaleX, scaleY, x, y } = this.component.ctm().extract();

    return [
      scaleX * this.component.x() + x + (this.component.width() * scaleX) / 2,
      scaleY * this.component.y() + y + this.component.height() * scaleY
    ];
  }

  getHoleXY(): [number, number] {
    const { x, y } = this.breadBoardHole.ctm().extract();

    const innerX = this.breadBoardHole.cx();
    const innerY = this.breadBoardHole.cy();

    return [innerX + x, innerY + y];
  }

  public destroyWire() {
    if (
      this.connectionInfo.type == 'ground' ||
      this.connectionInfo.type == 'power'
    ) {
      returnBottomHole(this.connectionInfo.holeNumber);
    }

    this.line.remove();
  }
}

export interface Line {
  readonly line: svgjs.Line;

  destroyWire(): void;

  updateConnection(): void;
}

class BreadboardWire implements Line {
  constructor(
    public readonly line: svgjs.Line,
    private breadBoardHole2: Element,
    private breadBoardHole1: Element,
    private bottomBreadboardHoleNumber: number,
    private color: string
  ) {}

  getHoleXY(whole: Element): [number, number] {
    const { x, y } = whole.ctm().extract();

    const innerX = whole.cx();
    const innerY = whole.cy();

    return [innerX + x, innerY + y];
  }

  updateConnection() {
    const [x1, y1] = this.getHoleXY(this.breadBoardHole1);
    const [x2, y2] = this.getHoleXY(this.breadBoardHole2);

    this.line
      .plot(x1, y1, x2, y2)
      .stroke({ width: 2, color: this.color, linecap: 'round' });
  }

  public destroyWire() {
    returnBottomHole(this.bottomBreadboardHoleNumber);

    this.line.remove();
  }
}

export const createWireBreadboardHoleBreadboardHole = (
  virtualCircuit: VirtualCircuit,
  breadboardHole1: Element,
  breadboardHole2: Element,
  holeNumber: number,
  color: string
) => {
  const dateWireLine = virtualCircuit.baseSVG.line(1, 1, 2, 2);

  const dataWire = new BreadboardWire(
    dateWireLine,
    breadboardHole2,
    breadboardHole1,
    holeNumber,
    color
  );

  virtualCircuit.nodes.add(dateWireLine);
  dataWire.updateConnection();

  return dataWire;
};

export const createLedBreadboardWire = (
  virtualCircuit: VirtualCircuit,
  baseSvg: ComponentSvg,
  connectionElement: Element,
  breadboardHole: Element,
  color: string
) => {
  const dateWireLine = virtualCircuit.baseSVG.line(1, 1, 2, 2);
  virtualCircuit.nodes.add(dateWireLine);

  const dataWire = new Wire(
    dateWireLine,
    connectionElement,
    breadboardHole,
    { type: 'breadboard', holeNumber: -1 },
    color
  );

  baseSvg.addWire(dataWire);
  dataWire.updateConnection();
};

export const createBreadboardWire = (
  virtualCircuit: VirtualCircuit,
  baseSvg: ComponentSvg,
  connectionElement: Element,
  arduinoUnoPin: ARDUINO_UNO_PINS,
  color: string
) => {
  const dateWireLine = virtualCircuit.baseSVG.line(1, 1, 2, 2);
  virtualCircuit.nodes.add(dateWireLine);
  const dataWire = new Wire(
    dateWireLine,
    connectionElement,
    virtualCircuit.arduino.svg
      .select(`#${connectionToBreadboard(arduinoUnoPin)}`)
      .first() as Element,
    { type: 'breadboard', holeNumber: -1 },
    color
  );

  baseSvg.addWire(dataWire);
  dataWire.updateConnection();

  return dataWire;
};

export const createPowerWire = (
  virtualCircuit: VirtualCircuit,
  componentSvg: ComponentSvg,
  connectionElement: Element,
  pin?: ARDUINO_UNO_PINS,
  direction?: 'right' | 'left'
) => {
  const powerWireLine = virtualCircuit.baseSVG.line(1, 1, 2, 2);
  virtualCircuit.nodes.add(powerWireLine);

  const nextPowerWireIndex = pin
    ? takeClosestBottomBreadboardHole(pin, direction)
    : takeNextBottomBreadboardHole();

  const powerWire = new Wire(
    powerWireLine,
    connectionElement,
    virtualCircuit.arduino.svg
      .select(`#pin${nextPowerWireIndex}W`)
      .first() as Element,
    { type: 'power', holeNumber: nextPowerWireIndex },
    '#FF422A'
  );

  componentSvg.addWire(powerWire);
  powerWire.updateConnection();

  return powerWire.getHoleXY();
};

export const createGroundWire = (
  virtualCircuit: VirtualCircuit,
  componentSvg: ComponentSvg,
  connectionElement: Element,
  pin?: ARDUINO_UNO_PINS,
  direction?: 'right' | 'left'
) => {
  const groundWireLine = virtualCircuit.baseSVG.line(1, 1, 2, 2);
  virtualCircuit.nodes.add(groundWireLine);
  const nextGroundWireIndex = pin
    ? takeClosestBottomBreadboardHole(pin, direction)
    : takeNextBottomBreadboardHole();

  const groundWire = new Wire(
    groundWireLine,
    connectionElement,
    virtualCircuit.arduino.svg
      .select(`#pin${nextGroundWireIndex}X`)
      .first() as Element,
    { type: 'ground', holeNumber: nextGroundWireIndex },
    '#000000'
  );

  componentSvg.addWire(groundWire);
  groundWire.updateConnection();

  return groundWire.getHoleXY();
};

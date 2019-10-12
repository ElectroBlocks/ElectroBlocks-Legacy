import { VirtualCircuit } from '../svg/virtual-circuit';
import { LedMatrixState } from '../../player/arduino/state/led_matrix.state';
import { Element, Parent } from 'svg.js';
import { MatrixSvg } from '../svg/matrix.svg';
import { virtualCircuitPin } from '../svg/arduino.svg';
import {
  createBreadboardWire,
  createGroundWire,
  createPowerWire
} from '../svg/wire';
import { ARDUINO_UNO_PINS } from '../../player/arduino/arduino_frame';
import { fetchSVGXMLData } from './fetch.svg';

export const matrixFactory = async (
  virtualCircuit: VirtualCircuit,
  componentOnly = false
) => {
  const matrixSvgString = `./assets/svgs/matrix.svg`;

  const matrixSvg = new MatrixSvg(virtualCircuit.baseSVG
    .svg(await fetchSVGXMLData(matrixSvgString))
    .children()
    .pop() as Parent);

  virtualCircuit.nodes.add(matrixSvg.svg);
  virtualCircuit.arduino.showWire(virtualCircuitPin(ARDUINO_UNO_PINS.PIN_12));
  virtualCircuit.arduino.showWire(virtualCircuitPin(ARDUINO_UNO_PINS.PIN_11));
  virtualCircuit.arduino.showWire(virtualCircuitPin(ARDUINO_UNO_PINS.PIN_10));

  matrixSvg.height('3.1in');

  createPowerWire(virtualCircuit, matrixSvg, matrixSvg.svg
    .select('#VCC')
    .first() as Element);

  createGroundWire(virtualCircuit, matrixSvg, matrixSvg.svg
    .select('#GND')
    .first() as Element);

  createBreadboardWire(
    virtualCircuit,
    matrixSvg,
    matrixSvg.svg.select('#DATA').first() as Element,
    ARDUINO_UNO_PINS.PIN_12,
    '#ff834b'
  );

  createBreadboardWire(
    virtualCircuit,
    matrixSvg,
    matrixSvg.svg.select('#CS').first() as Element,
    ARDUINO_UNO_PINS.PIN_10,
    '#6aa3ff'
  );

  createBreadboardWire(
    virtualCircuit,
    matrixSvg,
    matrixSvg.svg.select('#CLK').first() as Element,
    ARDUINO_UNO_PINS.PIN_11,
    '#ffe472'
  );

  const positionY =
    virtualCircuit.baseSVG
      .select(`#breadboardbreadboard`)
      .first()
      .ctm()
      .extract().transformedY - 200;

  matrixSvg.move(-50, positionY);

  (matrixSvg.svg as any).draggy();

  if (componentOnly) {
    matrixSvg.hideWires();
  }
  matrixSvg.updateWires();
  return matrixSvg;
};

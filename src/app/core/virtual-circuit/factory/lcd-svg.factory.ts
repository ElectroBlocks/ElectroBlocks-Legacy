import { VirtualCircuit } from '../svg/virtual-circuit';
import { LCDScreenState } from '../../player/arduino/state/lcd_screen.state';
import { Element, Parent } from 'svg.js';
import { LcdSvg } from '../svg/lcd.svg';
import {
  createBreadboardWire,
  createGroundWire,
  createPowerWire
} from '../svg/wire';
import { ARDUINO_UNO_PINS } from '../../player/arduino/arduino_frame';
import { virtualCircuitPin } from '../svg/arduino.svg';
import { fetchSVGXMLData } from './fetch.svg';

export const lcdFactory = async (
  virtualCircuit: VirtualCircuit,
  lcdState: LCDScreenState,
  componentOnly = false
) => {
  const lcdString = `./assets/svgs/LCD.svg`;

  const lcdSvg = new LcdSvg(
    virtualCircuit.baseSVG
      .svg(await fetchSVGXMLData(lcdString))
      .children()
      .pop() as Parent,
    lcdState.columns,
    lcdState.rows
  );

  createPowerWire(virtualCircuit, lcdSvg, lcdSvg.svg
    .select('#VCC_CONNECT')
    .first() as Element);

  const [positionX, positionY] = createGroundWire(
    virtualCircuit,
    lcdSvg,
    lcdSvg.svg.select('#GND_CONNECT').first() as Element
  );

  createBreadboardWire(
    virtualCircuit,
    lcdSvg,
    lcdSvg.svg.select('#SDA_CONNECT').first() as Element,
    ARDUINO_UNO_PINS.PIN_A4,
    '#F15A24'
  );

  createBreadboardWire(
    virtualCircuit,
    lcdSvg,
    lcdSvg.svg.select('#SCL_CONNECT').first() as Element,
    ARDUINO_UNO_PINS.PIN_A5,
    '#FF00FF'
  ).getHoleXY();

  virtualCircuit.arduino.showWire(virtualCircuitPin(ARDUINO_UNO_PINS.PIN_A5));
  virtualCircuit.arduino.showWire(virtualCircuitPin(ARDUINO_UNO_PINS.PIN_A4));

  virtualCircuit.nodes.add(lcdSvg.svg);
  (lcdSvg.svg as any).draggy();

  lcdSvg.move(positionX - 30, positionY - 300);
  lcdSvg.updateWires();

  if (componentOnly) {
    lcdSvg.hideWires();
    lcdSvg.move(positionX - 30, positionY);
  }

  return lcdSvg;
};

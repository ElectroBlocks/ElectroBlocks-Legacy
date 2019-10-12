import * as fs from 'fs';
import * as path from 'path';
import { NeopixelSvg } from '../svg/neopixel.svg';
import { Element, Parent } from 'svg.js';
import { VirtualCircuit } from '../svg/virtual-circuit';
import { NeoPixelStripState } from '../../player/arduino/state/neo_pixel_strip.state';
import {
  createBreadboardWire,
  createGroundWire,
  createPowerWire
} from '../svg/wire';
import { virtualCircuitPin } from '../svg/arduino.svg';
import { fetchSVGXMLData } from './fetch.svg';

export const neoPixelFactory = async (
  virtualCircuit: VirtualCircuit,
  componentState: NeoPixelStripState,
  componentOnly = false
) => {
  const neoPixelString = `./assets/svgs/led_light_strip.svg`;

  const neoPixel = new NeopixelSvg(
    virtualCircuit.baseSVG
      .svg(await fetchSVGXMLData(neoPixelString))
      .children()
      .pop() as Parent,
    componentState.numberOfLeds,
    componentState.analogPin
  );

  createGroundWire(virtualCircuit, neoPixel, neoPixel.svg
    .select('#CONNECT_GND')
    .first() as Element);

  createPowerWire(virtualCircuit, neoPixel, neoPixel.svg
    .select('#CONNECT_POWER')
    .first() as Element);

  createBreadboardWire(
    virtualCircuit,
    neoPixel,
    neoPixel.svg.select('#CONNECT_DATA').first() as Element,
    neoPixel.pin,
    '#006837'
  );

  virtualCircuit.arduino.showWire(virtualCircuitPin(neoPixel.pin));

  virtualCircuit.nodes.add(neoPixel.svg);
  (neoPixel.svg as any).draggy();

  if (componentOnly) {
    neoPixel.hideWires();
  }

  return neoPixel;
};

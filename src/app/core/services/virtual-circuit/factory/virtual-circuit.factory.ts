import { VirtualCircuit } from './../svg/virtual-circuit';
import { assert } from 'chai';
import { Doc } from 'svg.js';
import { Parent } from 'svg.js';
import { ArduinoSvg, virtualCircuitPin } from '../svg/arduino.svg';
import { fetchSVGXMLData } from './fetch.svg';

import 'svg.pan-zoom.js';
import 'svg.draggy.js';
import { ShowArduinoCommunicator } from '../communicators/show-arduino.comm';

export const virtualCircuitFactory = async (
  showArduinoComm: ShowArduinoCommunicator
) => {
  const baseSVG: svgjs.Doc = new Doc('virtual-circuit');

  const nodes = baseSVG.group();
  const virtualArduinoSVGPath = './assets/svgs/arduino-breadboard-wired-2.svg';

  const arduino = new ArduinoSvg(baseSVG
    .svg(await fetchSVGXMLData(virtualArduinoSVGPath))
    .children()
    .pop() as Parent);

  nodes.add(arduino.svg);

  arduino.hidePinWires();
  arduino.hideMessage();

  const zoom = (nodes as any).panZoom();
  (arduino.svg as any).draggy();

  const virtualCircuit = new VirtualCircuit(
    baseSVG,
    nodes,
    arduino,
    showArduinoComm,
    zoom
  );
  virtualCircuit.moveAndCenter();
  (window as any).virtualCircuit = virtualCircuit;
  return virtualCircuit;
};

import { VirtualCircuit } from '../svg/virtual-circuit';
import * as fs from 'fs';
import * as path from 'path';
import { Parent } from 'svg.js';
import { Resistor } from '../svg/resistor';
import { fetchSVGXMLData } from './fetch.svg';

export const resistorFactory = async (
  virtualCircuit: VirtualCircuit,
  pinWholeId: string,
  resistorType: 'regular' | 'small' = 'regular'
) => {
  const svgName =
    resistorType == 'regular' ? 'resistor.svg' : 'resistor-small.svg';

  let resistorString = `./assets/svgs/${svgName}`;

  const resistor = new Resistor(
    virtualCircuit.baseSVG
      .svg(await fetchSVGXMLData(resistorString))
      .children()
      .pop() as Parent,
    virtualCircuit.baseSVG.select(`#${pinWholeId}`).first() as Parent,
    pinWholeId.includes('H') // this means it's on the over side of the breadboard.
  );

  (window as any).resistor = resistor;
  virtualCircuit.nodes.add(resistor.svg);
  (resistor.svg as any).draggy();

  return resistor;
};

import { VirtualCircuit } from '../svg/virtual-circuit';
import { TemperatureState } from '../../player/arduino/state/temperature.state';
import { TempSensorSvg } from '../svg/temp-sensor.svg';
import { fetchSVGXMLData } from './fetch.svg';
import { Parent, Element } from 'svg.js';
import {
  createBreadboardWire,
  createPowerWire,
  createGroundWire
} from '../svg/wire';
import { virtualCircuitPin } from '../svg/arduino.svg';

export const tempSensorFactory = async (
  virtualCircuit: VirtualCircuit,
  componentState: TemperatureState,
  componentOnly = false
) => {
  const svgString = './assets/svgs/temp-humidity.svg';

  const tempSensorSvg = new TempSensorSvg(
    virtualCircuit.baseSVG
      .svg(await fetchSVGXMLData(svgString))
      .children()
      .pop() as Parent,
    componentState.pin
  );

  createGroundWire(
    virtualCircuit,
    tempSensorSvg,
    tempSensorSvg.svg.select('#GND line').first() as Element,
    tempSensorSvg.pin,
    'right'
  );

  createBreadboardWire(
    virtualCircuit,
    tempSensorSvg,
    tempSensorSvg.svg.select('#SIG line').first() as Element,
    tempSensorSvg.pin,
    '#ce6e17'
  );

  const [xPosition] = createPowerWire(
    virtualCircuit,
    tempSensorSvg,
    tempSensorSvg.svg.select('#VCC line').first() as Element,
    tempSensorSvg.pin,
    'left'
  );

  virtualCircuit.nodes.add(tempSensorSvg.svg);
  (tempSensorSvg.svg as any).draggy();
  virtualCircuit.arduino.showWire(virtualCircuitPin(componentState.pin));
  tempSensorSvg.svg.size(200, 250);
  tempSensorSvg.move(xPosition - 85, -150);
  tempSensorSvg.updateWires();

  if (componentOnly) {
    tempSensorSvg.hideWires();
  }
  return tempSensorSvg;
};

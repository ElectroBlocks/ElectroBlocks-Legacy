import { IRRemoteState } from '../../player/arduino/state/ir_remote.state';
import { VirtualCircuit } from '../svg/virtual-circuit';
import { ButtonState } from '../../player/arduino/state/button.state';
import { fetchSVGXMLData } from './fetch.svg';
import { ButtonSvg } from '../svg/button.svg';
import { Element, Parent } from 'svg.js';
import {
  createBreadboardWire,
  createGroundWire,
  createPowerWire
} from '../svg/wire';
import { virtualCircuitPin } from '../svg/arduino.svg';
import { IRRemoteSvg } from '../svg/ir_remote.svg';

export const irRemoteFactory = async (
  virtualCircuit: VirtualCircuit,
  componentState: IRRemoteState,
  componentOnly = false
) => {
  const svgPath = `./assets/svgs/ir_remote/ir_remote.svg`;
  const svgString = await fetchSVGXMLData(svgPath);

  const iRRemoteSvg = new IRRemoteSvg(
    virtualCircuit.baseSVG
      .svg(svgString)
      .children()
      .pop() as Parent,
    componentState.analogPin
  );

  virtualCircuit.nodes.add(iRRemoteSvg.svg);
  (iRRemoteSvg.svg as any).draggy();
  iRRemoteSvg.svg.size(150, 200);

  const [positionX] = createBreadboardWire(
    virtualCircuit,
    iRRemoteSvg,
    iRRemoteSvg.svg.select('#SIG_WIRE').first() as Element,
    iRRemoteSvg.analogPin,
    '#FFA500'
  ).getHoleXY();

  iRRemoteSvg.move(positionX - 94, -150);

  createPowerWire(
    virtualCircuit,
    iRRemoteSvg,
    iRRemoteSvg.svg.select('#VCC_WIRE').first() as Element,
    iRRemoteSvg.analogPin,
    'left'
  );

  createGroundWire(
    virtualCircuit,
    iRRemoteSvg,
    iRRemoteSvg.svg.select('#GND_WIRE').first() as Element,
    iRRemoteSvg.analogPin,
    'left'
  );

  virtualCircuit.arduino.showWire(virtualCircuitPin(componentState.analogPin));

  iRRemoteSvg.updateWires();

  if (componentOnly) {
    iRRemoteSvg.hideWires();
  }
  return iRRemoteSvg;
};

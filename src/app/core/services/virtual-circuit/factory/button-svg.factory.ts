import { VirtualCircuit } from '../svg/virtual-circuit';
import { ButtonState } from '../../player/arduino/state/button.state';
import { fetchSVGXMLData } from './fetch.svg';
import { ButtonSvg } from '../svg/button.svg';
import { Element, Parent } from 'svg.js';
import { createBreadboardWire, createGroundWire } from '../svg/wire';
import { virtualCircuitPin } from '../svg/arduino.svg';
import { resistorPinWhole as resistorPinHole } from './pin.factory';

export const buttonFactory = async (
  virtualCircuit: VirtualCircuit,
  componentState: ButtonState,
  componentOnly = false
) => {
  const buttonSvgString = './assets/svgs/button-2.svg';

  const buttonSvg = new ButtonSvg(
    componentState,
    virtualCircuit.baseSVG
      .svg(await fetchSVGXMLData(buttonSvgString))
      .children()
      .pop() as Parent
  );

  buttonSvg.svg.size(150, 200);

  virtualCircuit.nodes.add(buttonSvg.svg);
  (buttonSvg.svg as any).draggy();
  virtualCircuit.arduino.showWire(virtualCircuitPin(componentState.pin));

  createBreadboardWire(
    virtualCircuit,
    buttonSvg,
    buttonSvg.svg.select('#PIN_WIRE').first() as Element,
    componentState.pin,
    '#FFA500'
  );

  const wireHole = virtualCircuit.baseSVG
    .select(`#${resistorPinHole(componentState.pin)}`)
    .first();

  const positionX = wireHole.ctm().extract().x + wireHole.cx() - 100;

  createGroundWire(
    virtualCircuit,
    buttonSvg,
    buttonSvg.svg.select('#GND_WIRE').first() as Element,
    componentState.pin,
    'right'
  );

  const positionY =
    virtualCircuit.baseSVG
      .select(`#breadboardbreadboard`)
      .first()
      .ctm()
      .extract().transformedY - 175;

  buttonSvg.move(positionX, positionY);
  buttonSvg.updateWires();
  if (componentOnly) {
    buttonSvg.hideWires();
  }
  return buttonSvg;
};

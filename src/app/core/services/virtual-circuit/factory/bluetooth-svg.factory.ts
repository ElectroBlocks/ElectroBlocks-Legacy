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
import { resistorPinWhole as resistorPinHole } from './pin.factory';
import { BluetoothSVG } from '../svg/bluetooth.svg';
import { BluetoothState } from '../../player/arduino/state/bluetooth.state';

export const bluetoothFactory = async (
  virtualCircuit: VirtualCircuit,
  componentState: BluetoothState,
  componentOnly = false
) => {
  const bluetoothSVGString = './assets/svgs/bluetooth.svg';

  const bluetoothSVG = new BluetoothSVG(
    virtualCircuit.baseSVG
      .svg(await fetchSVGXMLData(bluetoothSVGString))
      .children()
      .pop() as Parent,
    componentState
  );
  virtualCircuit.nodes.add(bluetoothSVG.svg);

  (bluetoothSVG.svg as any).draggy();
  virtualCircuit.arduino.showWire(virtualCircuitPin(componentState.txPin));
  virtualCircuit.arduino.showWire(virtualCircuitPin(componentState.rxPin));

  createBreadboardWire(
    virtualCircuit,
    bluetoothSVG,
    bluetoothSVG.svg.select('#WIRE_TX').first() as Element,
    componentState.txPin,
    '#FFA500'
  );

  createBreadboardWire(
    virtualCircuit,
    bluetoothSVG,
    bluetoothSVG.svg.select('#WIRE_RX').first() as Element,
    componentState.rxPin,
    '#FFA500'
  );

  const txPinHole = virtualCircuit.baseSVG
    .select(`#${resistorPinHole(componentState.txPin)}`)
    .first();

  const positionX = txPinHole.ctm().extract().x + txPinHole.cx() - 50;

  createGroundWire(
    virtualCircuit,
    bluetoothSVG,
    bluetoothSVG.svg.select('#GND_BOX').first() as Element,
    componentState.txPin,
    'right'
  );

  createPowerWire(
    virtualCircuit,
    bluetoothSVG,
    bluetoothSVG.svg.select('#_5V_BOX').first() as Element,
    componentState.txPin,
    'right'
  );

  const positionY =
    virtualCircuit.baseSVG
      .select(`#breadboardbreadboard`)
      .first()
      .ctm()
      .extract().transformedY - 175;

  bluetoothSVG.move(positionX, positionY);
  bluetoothSVG.updateWires();

  return bluetoothSVG;
};

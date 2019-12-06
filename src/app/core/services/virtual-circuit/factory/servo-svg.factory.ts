import { Element, Parent } from 'svg.js';
import { ServoSvg } from '../svg/servo.svg';
import { ServoState } from '../../player/arduino/state/servo.state';
import { virtualCircuitPin } from '../svg/arduino.svg';
import { VirtualCircuit } from '../svg/virtual-circuit';
import {
  createBreadboardWire,
  createGroundWire,
  createPowerWire
} from '../svg/wire';
import { ARDUINO_UNO_PINS } from '../../player/arduino/arduino_frame';
import { fetchSVGXMLData } from './fetch.svg';

export const servoFactory = async (
  virtualCircuit: VirtualCircuit,
  componentState: ServoState,
  componentOnly = false
) => {
  const servoString = './assets/svgs/servo.svg';

  const servoSvg = new ServoSvg(
    virtualCircuit.baseSVG
      .svg(await fetchSVGXMLData(servoString))
      .children()
      .pop() as Parent,
    componentState.pin
  );

  virtualCircuit.nodes.add(servoSvg.svg);

  (servoSvg.svg as any).draggy();

  servoSvg.height('2.1in');

  virtualCircuit.arduino.showWire(virtualCircuitPin(servoSvg.pin));

  const [positionX] = createBreadboardWire(
    virtualCircuit,
    servoSvg,
    servoSvg.svg.select('#DATA_BOX').first() as Element,
    servoSvg.pin,
    '#FFA500'
  ).getHoleXY();

  servoSvg.move(positionX - 60, -150);
  servoSvg.updateWires();

  if (
    [ARDUINO_UNO_PINS.PIN_13, ARDUINO_UNO_PINS.PIN_A2].includes(servoSvg.pin)
  ) {
    createGroundWire(
      virtualCircuit,
      servoSvg,
      servoSvg.svg.select('#GND_BOX').first() as Element,
      servoSvg.pin,
      'left'
    );

    createPowerWire(
      virtualCircuit,
      servoSvg,
      servoSvg.svg.select('#_5V_BOX').first() as Element,
      servoSvg.pin,
      'left'
    );
  } else if (
    [ARDUINO_UNO_PINS.PIN_A0, ARDUINO_UNO_PINS.PIN_A1].includes(servoSvg.pin)
  ) {
    createPowerWire(
      virtualCircuit,
      servoSvg,
      servoSvg.svg.select('#_5V_BOX').first() as Element,
      servoSvg.pin,
      'left'
    );

    createGroundWire(
      virtualCircuit,
      servoSvg,
      servoSvg.svg.select('#GND_BOX').first() as Element,
      servoSvg.pin,
      'left'
    );
  } else {
    createPowerWire(
      virtualCircuit,
      servoSvg,
      servoSvg.svg.select('#_5V_BOX').first() as Element,
      servoSvg.pin,
      'left'
    );

    createGroundWire(
      virtualCircuit,
      servoSvg,
      servoSvg.svg.select('#GND_BOX').first() as Element,
      servoSvg.pin,
      'left'
    );
  }

  servoSvg.updateText();

  if (componentOnly) {
    servoSvg.hideWires();
  }

  return servoSvg;
};

import { VirtualCircuit } from '../svg/virtual-circuit';
import { LedColorState } from '../../player/arduino/state/led_color.state';
import { LedColorSvg } from '../svg/led-color.svg';
import { Element, Parent } from 'svg.js';
import { connectionToBreadboard, virtualCircuitPin } from '../svg/arduino.svg';
import {
  createGroundWire,
  createLedBreadboardWire,
  createWireBreadboardHoleBreadboardHole
} from '../svg/wire';
import { resistorFactory } from './resistor.factory';
import { takeClosestBottomBreadboardHole } from '../svg/next-wire.state';
import { ARDUINO_UNO_PINS } from '../../player/arduino/arduino_frame';
import { async } from '@angular/core/testing';
import { fetchSVGXMLData } from './fetch.svg';

export const rgbLedFactory = async (
  virtualCircuit: VirtualCircuit,
  componentState: LedColorState,
  componentOnly = false
) => {
  if (componentState.type == 'BREADBOARD') {
    return await breadboardRgbLedFactory(
      virtualCircuit,
      componentState,
      componentOnly
    );
  }

  if (componentState.type == 'BUILT_IN') {
    return await builtColorLedFactory(
      virtualCircuit,
      componentState,
      componentOnly
    );
  }
};

const builtColorLedFactory = async (
  virtualCircuit: VirtualCircuit,
  componentState: LedColorState,
  componentOnly = false
) => {
  let ledString = `./assets/svgs/built-in-color-led.svg`;
  virtualCircuit.arduino.showWire(virtualCircuitPin(componentState.bluePin));
  virtualCircuit.arduino.showWire(virtualCircuitPin(componentState.redPin));
  virtualCircuit.arduino.showWire(virtualCircuitPin(componentState.greenPin));

  const led = new LedColorSvg(
    virtualCircuit.baseSVG
      .svg(await fetchSVGXMLData(ledString))
      .children()
      .pop() as Parent,
    componentState.redPin,
    componentState.greenPin,
    componentState.bluePin,
    'BUILT_IN',
    []
  );

  createLedBreadboardWire(
    virtualCircuit,
    led,
    led.svg.select('#RED_PIN line').first() as Element,
    virtualCircuit.arduino.svg
      .select(`#${connectionToBreadboard(led.redPin)}`)
      .first() as Element,
    '#AA0000'
  );

  createLedBreadboardWire(
    virtualCircuit,
    led,
    led.svg.select('#GREEN_PIN line').first() as Element,
    virtualCircuit.arduino.svg
      .select(`#${connectionToBreadboard(led.greenPin)}`)
      .first() as Element,
    '#00AA00'
  );

  createLedBreadboardWire(
    virtualCircuit,
    led,
    led.svg.select('#BLUE_PIN line').first() as Element,
    virtualCircuit.arduino.svg
      .select(`#${connectionToBreadboard(led.bluePin)}`)
      .first() as Element,
    '#0000AA'
  );

  if (led.redPin == ARDUINO_UNO_PINS.PIN_11) {
    createGroundWire(
      virtualCircuit,
      led,
      led.svg.select('#GND_PIN line').first() as Element,
      led.greenPin,
      'left'
    );
  }

  if (led.redPin == ARDUINO_UNO_PINS.PIN_6) {
    createGroundWire(
      virtualCircuit,
      led,
      led.svg.select('#GND_PIN line').first() as Element,
      led.redPin,
      'right'
    );
  }

  virtualCircuit.nodes.add(led.svg);
  (led.svg as any).draggy();

  (window as any).point = virtualCircuit.arduino.svg
    .select(`#${connectionToBreadboard(led.bluePin)}`)
    .first();
  const ledXPosition = virtualCircuit.arduino.svg
    .select(`#${connectionToBreadboard(led.bluePin)}`)
    .first()
    .cx();

  const ledYPosition =
    virtualCircuit.baseSVG
      .select(`#breadboardbreadboard`)
      .first()
      .ctm()
      .extract().transformedY - 40;

  led.setColor('#FFFFFF');
  led.move(ledXPosition, ledYPosition);
  led.updateWires();

  if (componentOnly) {
    led.resistors.forEach(resistor => resistor.svg.hide());
    led.hideWires();
  }

  return led;
};

const breadboardRgbLedFactory = async (
  virtualCircuit: VirtualCircuit,
  componentState: LedColorState,
  componentOnly = false
) => {
  let ledString = './assets/svgs/rgb-led-no-resistor.svg';
  virtualCircuit.arduino.showWire(virtualCircuitPin(componentState.bluePin));
  virtualCircuit.arduino.showWire(virtualCircuitPin(componentState.redPin));
  virtualCircuit.arduino.showWire(virtualCircuitPin(componentState.greenPin));

  const redResistor = await resistorFactory(
    virtualCircuit,
    `${connectionToBreadboard(componentState.redPin).replace('C', 'D')}`,
    'small'
  );
  redResistor.updateWires();

  (window as any).redResistor = redResistor;

  const greenResistor = await resistorFactory(
    virtualCircuit,
    `${connectionToBreadboard(componentState.greenPin).replace('C', 'D')}`,
    'small'
  );
  greenResistor.updateWires();

  const blueResistor = await resistorFactory(
    virtualCircuit,
    `${connectionToBreadboard(componentState.bluePin).replace('C', 'D')}`,
    'small'
  );
  blueResistor.updateWires();

  const led = new LedColorSvg(
    virtualCircuit.baseSVG
      .svg(await fetchSVGXMLData(ledString))
      .children()
      .pop() as Parent,
    componentState.redPin,
    componentState.greenPin,
    componentState.bluePin,
    'BREADBOARD',
    [blueResistor, redResistor, greenResistor]
  );

  createLedBreadboardWire(
    virtualCircuit,
    led,
    led.svg.select('#RED_PIN line').first() as Element,
    virtualCircuit.arduino.svg
      .select(`#${connectionToBreadboard(led.redPin).replace('C', 'E')}`)
      .first() as Element,
    '#AA0000'
  );

  const breadboardGNDWire =
    parseInt(
      connectionToBreadboard(led.redPin)
        .replace('C', '')
        .replace('pin', '')
    ) + 2;

  createLedBreadboardWire(
    virtualCircuit,
    led,
    led.svg.select('#GND_PIN line').first() as Element,
    virtualCircuit.arduino.svg
      .select(`#pin${breadboardGNDWire}E`)
      .first() as Element,
    '#000000'
  );

  createLedBreadboardWire(
    virtualCircuit,
    led,
    led.svg.select('#GREEN_PIN line').first() as Element,
    virtualCircuit.arduino.svg
      .select(`#${connectionToBreadboard(led.greenPin).replace('C', 'E')}`)
      .first() as Element,
    '#00AA00'
  );

  createLedBreadboardWire(
    virtualCircuit,
    led,
    led.svg.select('#BLUE_PIN line').first() as Element,
    virtualCircuit.arduino.svg
      .select(`#${connectionToBreadboard(led.bluePin).replace('C', 'E')}`)
      .first() as Element,
    '#0000AA'
  );

  const holeNumber = takeClosestBottomBreadboardHole(
    componentState.redPin,
    'right'
  );

  const gndWire = createWireBreadboardHoleBreadboardHole(
    virtualCircuit,
    virtualCircuit.baseSVG
      .select(`#pin${breadboardGNDWire}A`)
      .first() as Element,
    virtualCircuit.baseSVG.select(`#pin${holeNumber}X`).first() as Element,
    holeNumber,
    '#000000'
  );

  led.addWire(gndWire);

  virtualCircuit.nodes.add(led.svg);
  (led.svg as any).draggy();

  const ledXPosition = greenResistor.svg.x();

  const ledYPosition =
    virtualCircuit.baseSVG
      .select(`#breadboardbreadboard`)
      .first()
      .ctm()
      .extract().transformedY - 80;

  led.setColor('#FFFFFF');
  led.move(ledXPosition, ledYPosition);
  led.updateWires();

  if (componentOnly) {
    led.resistors.forEach(resistor => resistor.svg.hide());
    led.hideWires();
  }

  return led;
};

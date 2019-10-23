import { VirtualCircuit } from '../svg/virtual-circuit';
import {
  PinPicture,
  PinState,
  PIN_TYPE
} from '../../player/arduino/state/pin.state';
import { Element, Parent } from 'svg.js';
import { LedSvg } from '../svg/led.svg';
import { createLedBreadboardWire, createGroundWire } from '../svg/wire';
import { connectionToBreadboard, virtualCircuitPin } from '../svg/arduino.svg';
import { ARDUINO_UNO_PINS } from '../../player/arduino/arduino_frame';
import { resistorFactory } from './resistor.factory';
import { ComponentSvg } from '../svg/component.svg';
import { fetchSVGXMLData } from './fetch.svg';
import { DigitalAnalogWriteSvg } from '../svg/digitalAnalogWrite.svg';

export const ledFactory = async (
  virtualCircuit: VirtualCircuit,
  componentState: PinState,
  componentOnly = false
) => {
  const ledString = `./assets/svgs/led.svg`;

  let svgLedString = await fetchSVGXMLData(ledString);
  svgLedString = svgLedString.replace(
    /radial-gradient/g,
    'radial-gradient-' + componentState.pin
  );

  const resistor = await resistorFactory(
    virtualCircuit,
    resistorPinWhole(componentState.pin),
    'regular'
  );
  resistor.updateWires();

  const led = new LedSvg(
    virtualCircuit.baseSVG
      .svg(svgLedString)
      .children()
      .pop() as Parent,
    componentState.pin,
    componentState.color,
    resistor
  );

  virtualCircuit.arduino.showWire(virtualCircuitPin(led.pin));

  createLedBreadboardWire(
    virtualCircuit,
    led,
    led.svg.select('#GND line').first() as Element,
    virtualCircuit.arduino.svg
      .select(`#${groundPinId(led.pin)}`)
      .first() as Element,
    '#999999'
  );

  createLedBreadboardWire(
    virtualCircuit,
    led,
    led.svg.select('#POWER line').first() as Element,
    virtualCircuit.arduino.svg
      .select(
        `#${connectionToBreadboard(led.pin)
          .replace('C', 'E')
          .replace('H', 'F')}`
      )
      .first() as Element,
    '#999999'
  );

  virtualCircuit.nodes.add(led.svg);
  (led.svg as any).draggy();

  const resistorBreadboardHole = virtualCircuit.baseSVG
    .select(`#${resistorPinWhole(led.pin)}`)
    .first();

  const ledXPosition =
    resistorBreadboardHole.ctm().extract().x +
    resistorBreadboardHole.cx() -
    led.svg.width() / 2;

  const ledYPosition =
    virtualCircuit.baseSVG
      .select(`#breadboardbreadboard`)
      .first()
      .ctm()
      .extract().transformedY - 30;

  led.move(ledXPosition, ledYPosition);
  led.updateWires();

  if (componentOnly) {
    resistor.svg.hide();
    led.hideWires();
  }
  return [led, resistor];
};

export const outputPinFactory = async (
  virtualCircuit: VirtualCircuit,
  componentState: PinState,
  componentOnly = false
) => {
  const svgPath = `./assets/svgs/pins/digital_analog_write.svg`;
  const svgString = await fetchSVGXMLData(svgPath);

  const outputPin = new DigitalAnalogWriteSvg(
    virtualCircuit.baseSVG
      .svg(svgString)
      .children()
      .pop() as Parent,
    componentState.type,
    componentState.pin
  );

  outputPin.svg.size(250, 250);

  virtualCircuit.arduino.showWire(virtualCircuitPin(outputPin.pin));

  createLedBreadboardWire(
    virtualCircuit,
    outputPin,
    outputPin.svg.select('#POWER').first() as Element,
    virtualCircuit.arduino.svg
      .select(
        `#${connectionToBreadboard(outputPin.pin)
          .replace('C', 'E')
          .replace('H', 'F')}`
      )
      .first() as Element,
    '#000000'
  );

  createGroundWire(
    virtualCircuit,
    outputPin,
    outputPin.svg.select('#GND').first() as Element,
    outputPin.pin,
    'right'
  );

  const resistorBreadboardHole = virtualCircuit.baseSVG
    .select(`#${resistorPinWhole(outputPin.pin)}`)
    .first();

  const outputPinXPosition =
    resistorBreadboardHole.ctm().extract().x +
    resistorBreadboardHole.cx() -
    outputPin.svg.width() / 2;

  const outputPinYPosition =
    virtualCircuit.baseSVG
      .select(`#breadboardbreadboard`)
      .first()
      .ctm()
      .extract().transformedY - 230;

  outputPin.move(outputPinXPosition, outputPinYPosition);
  outputPin.updateWires();

  virtualCircuit.nodes.add(outputPin.svg);
  (outputPin.svg as any).draggy();

  return outputPin;
};

const groundBreadBoardPinNumber = (pin: ARDUINO_UNO_PINS) => {
  let groundWholeNumberBreadboard =
    parseInt(
      connectionToBreadboard(pin)
        .replace('pin', '')
        .replace('C', '')
        .replace('H', ''),
      0
    ) + 2;

  // This is because we want to position the resistor so we need to move some
  // of them over by 1
  if (
    [
      ARDUINO_UNO_PINS.PIN_9,
      ARDUINO_UNO_PINS.PIN_12,
      ARDUINO_UNO_PINS.PIN_A0,
      ARDUINO_UNO_PINS.PIN_A4
    ].includes(pin)
  ) {
    groundWholeNumberBreadboard -= 1;
  }

  return groundWholeNumberBreadboard;
};

export const resistorPinWhole = (pin: ARDUINO_UNO_PINS) => {
  if (
    [
      ARDUINO_UNO_PINS.PIN_A2,
      ARDUINO_UNO_PINS.PIN_A3,
      ARDUINO_UNO_PINS.PIN_A4,
      ARDUINO_UNO_PINS.PIN_A5
    ].includes(pin)
  ) {
    return `pin${groundBreadBoardPinNumber(pin)}H`;
  } else {
    return `pin${groundBreadBoardPinNumber(pin)}D`;
  }
};

const groundPinId = (pin: ARDUINO_UNO_PINS) => {
  if (
    [
      ARDUINO_UNO_PINS.PIN_A2,
      ARDUINO_UNO_PINS.PIN_A3,
      ARDUINO_UNO_PINS.PIN_A4,
      ARDUINO_UNO_PINS.PIN_A5
    ].includes(pin)
  ) {
    return `pin${groundBreadBoardPinNumber(pin)}F`;
  } else {
    return `pin${groundBreadBoardPinNumber(pin)}E`;
  }
};

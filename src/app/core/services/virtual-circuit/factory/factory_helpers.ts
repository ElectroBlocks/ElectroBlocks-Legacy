import { ARDUINO_UNO_PINS } from '../../player/arduino/arduino_frame';
import { createGroundWire, createPowerWire } from '../svg/wire';
import { VirtualCircuit } from '../svg/virtual-circuit';
import { ComponentSvg } from '../svg/component.svg';
import { Element, Parent } from 'svg.js';

export const groundPowerOnePinComponents = (
  svgComponent: ComponentSvg,
  pin: ARDUINO_UNO_PINS,
  virtualCircuit: VirtualCircuit
) => {
  if ([ARDUINO_UNO_PINS.PIN_13, ARDUINO_UNO_PINS.PIN_A2].includes(pin)) {
    createGroundWire(
      virtualCircuit,
      svgComponent,
      svgComponent.svg.select('#GND_BOX').first() as Element,
      pin,
      'left'
    );

    createPowerWire(
      virtualCircuit,
      svgComponent,
      svgComponent.svg.select('#_5V_BOX').first() as Element,
      pin,
      'left'
    );
  } else if ([ARDUINO_UNO_PINS.PIN_A0, ARDUINO_UNO_PINS.PIN_A1].includes(pin)) {
    createPowerWire(
      virtualCircuit,
      svgComponent,
      svgComponent.svg.select('#_5V_BOX').first() as Element,
      pin,
      'left'
    );

    createGroundWire(
      virtualCircuit,
      svgComponent,
      svgComponent.svg.select('#GND_BOX').first() as Element,
      pin,
      'left'
    );
  } else {
    createPowerWire(
      virtualCircuit,
      svgComponent,
      svgComponent.svg.select('#_5V_BOX').first() as Element,
      pin,
      'left'
    );

    createGroundWire(
      virtualCircuit,
      svgComponent,
      svgComponent.svg.select('#GND_BOX').first() as Element,
      pin,
      'left'
    );
  }
};

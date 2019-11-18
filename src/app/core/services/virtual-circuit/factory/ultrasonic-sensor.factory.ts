import { VirtualCircuit } from '../svg/virtual-circuit';
import { UltraSonicSensorState } from '../../player/arduino/state/ultrasonic-sensor.state';
import { UltraSonicSensorSvg } from '../svg/ultrasonic-sensor.svg';
import { fetchSVGXMLData } from './fetch.svg';
import { Parent, Element } from 'svg.js';
import {
  createBreadboardWire,
  createPowerWire,
  createGroundWire
} from '../svg/wire';
import { virtualCircuitPin } from '../svg/arduino.svg';

export const ultrasonicSensorFactory = async (
  virtualCircuit: VirtualCircuit,
  componentState: UltraSonicSensorState,
  componentOnly = false
) => {
  const svgString = './assets/svgs/ultrasonic-sensor.svg';

  const ultraSonicSensor = new UltraSonicSensorSvg(
    virtualCircuit.baseSVG
      .svg(await fetchSVGXMLData(svgString))
      .children()
      .pop() as Parent,
    componentState.trigPin,
    componentState.echoPin
  );

  ultraSonicSensor.svg.size(150, 400);
  virtualCircuit.nodes.add(ultraSonicSensor.svg);

  (ultraSonicSensor.svg as any).draggy();

  const [positionX] = createPowerWire(
    virtualCircuit,
    ultraSonicSensor,
    ultraSonicSensor.svg.select('#VCC').first() as Element,
    ultraSonicSensor.trigPin,
    'left'
  );
  createBreadboardWire(
    virtualCircuit,
    ultraSonicSensor,
    ultraSonicSensor.svg.select('#TRIG').first() as Element,
    ultraSonicSensor.trigPin,
    '#ce6e17'
  );

  createBreadboardWire(
    virtualCircuit,
    ultraSonicSensor,
    ultraSonicSensor.svg.select('#ECHO').first() as Element,
    ultraSonicSensor.echoPin,
    '#4e4ed1'
  );

  createGroundWire(
    virtualCircuit,
    ultraSonicSensor,
    ultraSonicSensor.svg.select('#GND').first() as Element,
    ultraSonicSensor.echoPin,
    'right'
  );

  virtualCircuit.arduino.showWire(virtualCircuitPin(ultraSonicSensor.trigPin));
  virtualCircuit.arduino.showWire(virtualCircuitPin(ultraSonicSensor.echoPin));
  ultraSonicSensor.move(positionX - 60, -250);
  ultraSonicSensor.updateWires();

  if (componentOnly) {
    ultraSonicSensor.hideWires();
  }

  return ultraSonicSensor;
};

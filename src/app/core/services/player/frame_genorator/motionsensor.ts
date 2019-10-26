import { Block } from 'blockly';
import { FrameLocation } from '../frame/frame';
import { ArduinoFrame } from '../arduino/arduino_frame';
import { getInputValue } from '../frame/blockly_helper';
import { ArduinoState } from '../arduino/state/arduino.state';
import { getSensorData } from '../frame/generate_frame';
import { ArduinoMessageState } from '../arduino/state/arduino-message.state';
import { UltraSonicSensorState } from '../arduino/state/ultrasonic-sensor.state';

export const ultra_sonic_sensor_motion_block = (
  block: Block,
  frameLocation: FrameLocation,
  previousFrame?: ArduinoFrame
) => {
  const data = getSensorData();
  const loopNumber = frameLocation.iteration;
  return (data[loopNumber].find(
    (component) => component instanceof UltraSonicSensorState
  ) as UltraSonicSensorState).cm;
};

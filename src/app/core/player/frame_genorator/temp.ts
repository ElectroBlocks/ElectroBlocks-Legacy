import { Block } from 'blockly';
import { ArduinoFrame } from '../arduino/arduino_frame';
import { FrameLocation } from '../frame/frame';
import { getSensorData } from '../frame/generate_frame';
import { TemperatureState } from '../arduino/state/temperature.state';

export const temp_get_temp_block = (
  block: Block,
  frameLocation: FrameLocation,
  previousFrame?: ArduinoFrame
) => {
  const tempState = getTemperatureState(frameLocation);

  return tempState.temperature;
};

export const temp_get_humidity_block = (
  block: Block,
  frameLocation: FrameLocation,
  previousFrame?: ArduinoFrame
) => {
  const tempState = getTemperatureState(frameLocation);

  return tempState.humidity;
};

const getTemperatureState = (
  frameLocatiion: FrameLocation
): TemperatureState => {
  return getSensorData()[frameLocatiion.iteration].find(
    (c) => c instanceof TemperatureState
  ) as TemperatureState;
};

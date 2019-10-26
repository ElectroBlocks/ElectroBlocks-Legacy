import { ArduinoFrame } from '../arduino/arduino_frame';
import { FrameLocation } from '../frame/frame';
import { Block } from 'blockly';
import { getSensorData } from '../frame/generate_frame';
import { IRRemoteState } from '../arduino/state/ir_remote.state';

export const ir_remote_get_code_block = (
  block: Block,
  frameLocation: FrameLocation,
  previousFrame?: ArduinoFrame
) => {
  const irRestate = getIRSensor(frameLocation);

  return irRestate.code;
};

export const ir_remote_has_code_receive_block = (
  block: Block,
  frameLocation: FrameLocation,
  previousFrame?: ArduinoFrame
) => {
  const irRestate = getIRSensor(frameLocation);

  return irRestate.hasCode;
};

const getIRSensor = (frameLocation: FrameLocation): IRRemoteState => {
  const data = getSensorData();
  const loopNumber = frameLocation.iteration;

  return data[loopNumber].find(
    c => c instanceof IRRemoteState
  ) as IRRemoteState;
};

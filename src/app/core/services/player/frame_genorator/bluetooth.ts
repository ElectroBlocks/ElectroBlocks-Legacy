import { ArduinoFrame } from '../arduino/arduino_frame';
import { FrameLocation } from '../frame/frame';
import { Block } from 'blockly';
import { getSensorData } from '../frame/generate_frame';
import { BluetoothState } from '../arduino/state/bluetooth.state';

export const bluetooth_get_message_block = (
  block: Block,
  frameLocation: FrameLocation,
  previousFrame?: ArduinoFrame
): string => {
  const bluetoothState = getBluetoothState(frameLocation);

  return bluetoothState.receivedMessage;
};

export const bluetooth_has_message_block = (
  block: Block,
  frameLocation: FrameLocation,
  previousFrame?: ArduinoFrame
): boolean => {
  const bluetoothState = getBluetoothState(frameLocation);

  return bluetoothState.hasMessage;
};

const getBluetoothState = (frameLocation: FrameLocation): BluetoothState => {
  const data = getSensorData();
  const loopNumber = frameLocation.iteration;
  return data[loopNumber].find(
    component => component instanceof BluetoothState
  ) as BluetoothState;
};

import { ArduinoFrame } from '../arduino/arduino_frame';
import { FrameLocation } from '../frame/frame';
import { Block } from 'blockly';
import { getSensorData } from '../frame/generate_frame';
import { BluetoothState } from '../arduino/state/bluetooth.state';
import { getInputValue } from '../frame/blockly_helper';
import { ArduinoState } from '../arduino/state/arduino.state';

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

export const bluetooth_send_message_block = (
  block: Block,
  frameLocation: FrameLocation,
  previousFrame?: ArduinoFrame
) => {

  const sendMessage = getInputValue(block, 'MESSAGE', '', frameLocation) as string;


  const bluetoothState = getBluetoothState(frameLocation);
  const newBluetoothState = new BluetoothState(
    bluetoothState.rxPin,
    bluetoothState.txPin,
    bluetoothState.hasMessage,
    bluetoothState.receivedMessage,
    sendMessage
  );
  const state = previousFrame.copyState();  
  const components = state.components.filter(
    (c) => !(c instanceof BluetoothState)
  );
  components.push(newBluetoothState);
  console.log(components, 'components');

  const newState = new ArduinoState(components, state.variables, state.txLedOn, state.sendMessage, state.delay, state.powerLedOn);
  
  return [new ArduinoFrame(block.id, newState, frameLocation)];
};

const getBluetoothState = (frameLocation: FrameLocation): BluetoothState => {
  const data = getSensorData();
  const loopNumber = frameLocation.iteration;
  return data[loopNumber].find(
    component => component instanceof BluetoothState
  ) as BluetoothState;
};

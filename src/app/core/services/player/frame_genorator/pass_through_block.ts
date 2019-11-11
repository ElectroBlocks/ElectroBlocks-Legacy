import { Block } from 'blockly';
import { FrameLocation } from '../frame/frame';
import { ArduinoFrame } from '../arduino/arduino_frame';
import { ArduinoState } from '../arduino/state/arduino.state';

export const setupBlock = (message: (block: Block) => string) => {
  return (
    block: Block,
    frameLocation: FrameLocation,
    previousFrame?: ArduinoFrame
  ): ArduinoFrame[] => {
    const state = previousFrame
      ? previousFrame.state
      : ArduinoState.makeEmptyState();

    return [new ArduinoFrame(block.id, state, frameLocation, message(block))];
  };
};

export const temp_setup_block = setupBlock(
  () => 'Setting up temperature sensor.'
);
export const ir_remote_setup_block = setupBlock(() => 'Setting up ir remote.');
export const soil_sensor_setup_block = setupBlock(
  () => 'Setting up soil sensor.'
);
export const bluetooth_setup_block = setupBlock(() => 'Setting up bluetooh.');
export const rfid_setup_block = setupBlock(() => 'Setting up rfid reader.');
export const push_button_setup_block = setupBlock(
  (block: Block) =>
    `Setting up button connectted to pin ${block.getFieldValue('PIN')}.`
);
export const message_setup_block = setupBlock(
  () => 'Setting up Arduino messages.'
);
export const time_setup_block = setupBlock(
  () => 'Setting up Arduino Time (Fake).'
);
export const digital_read_setup_block = setupBlock(
  (block: Block) =>
    `Setting up ${block.getFieldValue(
      'TYPE'
    )} connectted to pin ${block.getFieldValue('PIN')}.`
);

export const analog_read_setup_block = setupBlock(
  (block: Block) =>
    `Setting up ${block.getFieldValue(
      'TYPE'
    )} connectted to pin ${block.getFieldValue('PIN')}.`
);
export const ultra_sonic_sensor_setup_block = setupBlock(
  () => 'Setting up ultrasonic sensor.'
);

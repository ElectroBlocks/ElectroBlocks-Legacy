import { ArduinoFrame, stringToPin } from '../arduino/arduino_frame';
import { PIN_TYPE, PinPicture, PinState } from '../arduino/state/pin.state';
import { FrameLocation } from '../frame/frame';
import { getInputValue } from '../frame/blockly_helper';
import { ArduinoState } from '../arduino/state/arduino.state';
import { Block } from 'blockly';
import { getSensorData } from '../frame/generate_frame';

export const digital_write_block = (
  block: Block,
  frameLocation: FrameLocation,
  previousFrame?: ArduinoFrame
): ArduinoFrame[] => {
  const pin = block.getFieldValue('PIN');
  const state = block.getFieldValue('STATE') === 'ON' ? 1 : 0;

  return generatePinFrame(
    block,
    frameLocation,
    pin,
    state,
    PIN_TYPE.DIGITAL_OUTPUT,
    previousFrame
  );
};

export const analog_write_block = (
  block: Block,
  frameLocation: FrameLocation,
  previousFrame?: ArduinoFrame
): ArduinoFrame[] => {
  const pin = block.getFieldValue('PIN');
  const state = parseInt(
    getInputValue(
      block,
      'WRITE_VALUE',
      0,
      frameLocation,
      previousFrame
    ).toString(),
    0
  );

  return generatePinFrame(
    block,
    frameLocation,
    pin,
    state,
    PIN_TYPE.ANALOG_OUTPUT,
    previousFrame
  );
};

export const analog_read_block = (
  block: Block,
  frameLocation: FrameLocation,
  previousFrame?: ArduinoFrame
) => {
  const data = getSensorData();
  const loopNumber = frameLocation.iteration;

  const pinState = data[loopNumber].find(c => {
    return (
      c instanceof PinState &&
      c.type === PIN_TYPE.ANALOG_INPUT &&
      c.pin === stringToPin(block.getFieldValue('PIN'))
    );
  }) as PinState;

  return pinState.state;
};

export const digital_read_block = (
  block: Block,
  frameLocation: FrameLocation,
  previousFrame?: ArduinoFrame
) => {
  const data = getSensorData();
  const loopNumber = frameLocation.iteration;

  const pinState = data[loopNumber].find(c => {
    return (
      c instanceof PinState &&
      c.type === PIN_TYPE.DIGITAL_INPUT &&
      c.pin === stringToPin(block.getFieldValue('PIN'))
    );
  }) as PinState;

  return pinState.state > 0;
};

const generatePinFrame = (
  block: Block,
  frameLocation: FrameLocation,
  pin: string,
  state: number,
  pinType: PIN_TYPE,
  previousFrame?: ArduinoFrame
) => {
  const arduinoState = previousFrame
    ? previousFrame.copyState()
    : ArduinoState.makeEmptyState();

  const pinState = arduinoState.components.find(
    component =>
      component instanceof PinState &&
      component.pin === stringToPin(pin) &&
      pinType === component.type
  );

  if (pinState instanceof PinState) {
    const index = arduinoState.components.indexOf(pinState);
    arduinoState.components[index] = new PinState(
      stringToPin(pin),
      pinType,
      state,
      PinPicture.GENERIC
    );
  } else {
    arduinoState.components.push(
      new PinState(stringToPin(pin), pinType, state, PinPicture.GENERIC)
    );
  }

  return [new ArduinoFrame(block.id, arduinoState, frameLocation)];
};

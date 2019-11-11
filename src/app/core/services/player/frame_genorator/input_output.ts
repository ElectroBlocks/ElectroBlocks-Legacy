import { ArduinoFrame, stringToPin } from '../arduino/arduino_frame';
import { PIN_TYPE, PinPicture, PinState } from '../arduino/state/pin.state';
import { FrameLocation } from '../frame/frame';
import { getInputValue } from '../frame/blockly_helper';
import { ArduinoState } from '../arduino/state/arduino.state';
import { Block } from 'blockly';
import { getSensorData } from '../frame/generate_frame';
import { randomLedColor } from './led';

export const digital_write_block = (
  block: Block,
  frameLocation: FrameLocation,
  previousFrame?: ArduinoFrame
): ArduinoFrame[] => {
  const pin = block.getFieldValue('PIN');
  const state = block.getFieldValue('STATE') === 'ON' ? 1 : 0;

  const pinStateFound = previousFrame
    ? (previousFrame.state.components.find(
        (c) => c instanceof PinState && c.pin === stringToPin(pin)
      ) as PinState)
    : undefined;

  const color = pinStateFound ? pinStateFound.color : randomLedColor();

  return generatePinFrame(
    block,
    new PinState(
      stringToPin(pin),
      PIN_TYPE.DIGITAL_OUTPUT,
      state,
      PinPicture.LED_ANALOG_WRITE,
      color
    ),
    frameLocation,
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

  const pinStateFound = previousFrame
    ? (previousFrame.state.components.find(
        (c) => c instanceof PinState && c.pin === stringToPin(pin)
      ) as PinState)
    : undefined;
  const color = pinStateFound ? pinStateFound.color : randomLedColor();

  return generatePinFrame(
    block,
    new PinState(
      stringToPin(pin),
      PIN_TYPE.ANALOG_OUTPUT,
      state,
      PinPicture.LED_ANALOG_WRITE,
      color
    ),
    frameLocation,
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

  const pinState = data[loopNumber].find((c) => {
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

  const pinState = data[loopNumber].find((c) => {
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
  pinState: PinState,
  frameLocation: FrameLocation,
  previousFrame?: ArduinoFrame
) => {
  const arduinoState = previousFrame
    ? previousFrame.copyState()
    : ArduinoState.makeEmptyState();

  const index = arduinoState.components.findIndex((c) => pinState.isEqual(c));

  if (index > -1) {
    arduinoState.components[index] = pinState;
  } else {
    arduinoState.components.push(pinState);
  }

  return [
    new ArduinoFrame(
      block.id,
      arduinoState,
      frameLocation,
      pinState.explanation()
    )
  ];
};

import { Block } from 'blockly';
import { FrameLocation } from '../frame/frame';
import { ArduinoFrame, stringToPin } from '../arduino/arduino_frame';
import { ArduinoState } from '../arduino/state/arduino.state';
import { PIN_TYPE, PinPicture, PinState } from '../arduino/state/pin.state';
import { getInputValue } from '../frame/blockly_helper';

export const led_block = (
  block: Block,
  frameLocation: FrameLocation,
  previousFrame?: ArduinoFrame
): ArduinoFrame[] => {
  const pin = block.getFieldValue('PIN');

  const state = block.getFieldValue('STATE') === 'ON' ? 1 : 0;

  const arduinoState = previousFrame
    ? previousFrame.copyState()
    : ArduinoState.makeEmptyState();

  const foundPinState = arduinoState.components.find(
    (c) => c instanceof PinState && c.pin === stringToPin(pin)
  ) as PinState;

  const pinState = new PinState(
    stringToPin(pin),
    PIN_TYPE.DIGITAL_OUTPUT,
    state,
    PinPicture.LED,
    foundPinState ? foundPinState.color : randomLedColor()
  );

  const components = [
    pinState,
    ...arduinoState.components.filter((c) => !c.isEqual(foundPinState))
  ];

  const newArduinoState = new ArduinoState(components, arduinoState.variables);

  return [
    new ArduinoFrame(
      block.id,
      newArduinoState,
      frameLocation,
      pinState.explanation()
    )
  ];
};

export const randomLedColor = () => {
  const randomNumber = Math.floor(Math.random() * LEDS_COLORS.length);
  console.log(randomNumber, 'random color number');
  return LEDS_COLORS[randomNumber];
};

export const led_fade_block = (
  block: Block,
  frameLocation: FrameLocation,
  previousFrame?: ArduinoFrame
): ArduinoFrame[] => {
  const arduinoState = previousFrame
    ? previousFrame.copyState()
    : ArduinoState.makeEmptyState();

  const pin = block.getFieldValue('PIN');

  const fadeNumber = parseInt(
    getInputValue(block, 'FADE', 1, frameLocation, previousFrame).toString(),
    0
  );

  const foundPinState = arduinoState.components.find(
    (c) => c instanceof PinState && c.pin === stringToPin(pin)
  ) as PinState;

  const pinState = new PinState(
    stringToPin(pin),
    PIN_TYPE.ANALOG_OUTPUT,
    fadeNumber,
    PinPicture.LED,
    foundPinState ? foundPinState.color : randomLedColor()
  );

  const components = [
    pinState,
    ...arduinoState.components.filter((c) => !c.isEqual(foundPinState))
  ];

  const newArduinoState = new ArduinoState(components, arduinoState.variables);

  return [
    new ArduinoFrame(
      block.id,
      newArduinoState,
      frameLocation,
      pinState.explanation()
    )
  ];
};

const LEDS_COLORS = [
  { red: 170, green: 0, blue: 0 },
  { red: 170, green: 0, blue: 0 },
  { red: 240, green: 225, blue: 68 },
  { red: 170, green: 0, blue: 170 },
  { red: 0, green: 170, blue: 0 }
];

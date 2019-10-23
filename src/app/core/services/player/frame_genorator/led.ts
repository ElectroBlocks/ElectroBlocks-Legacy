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

  const pinState = arduinoState.components.find(
    component =>
      component instanceof PinState &&
      component.pin === stringToPin(pin) &&
      component.pinPicture === PinPicture.LED &&
      component.type === PIN_TYPE.DIGITAL_OUTPUT
  );

  if (pinState instanceof PinState) {
    const index = arduinoState.components.indexOf(pinState);
    arduinoState.components[index] = new PinState(
      stringToPin(pin),
      PIN_TYPE.DIGITAL_OUTPUT,
      state,
      PinPicture.LED,
      pinState.color
    );
  } else {
    const color = randomLedColor();
    arduinoState.components.push(
      new PinState(
        stringToPin(pin),
        PIN_TYPE.DIGITAL_OUTPUT,
        state,
        PinPicture.LED,
        color
      )
    );
  }

  return [new ArduinoFrame(block.id, arduinoState, frameLocation)];
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

  const pinState = arduinoState.components.find(
    component =>
      component instanceof PinState &&
      component.pin === stringToPin(pin) &&
      component.pinPicture === PinPicture.LED &&
      component.type === PIN_TYPE.ANALOG_OUTPUT
  );

  if (pinState instanceof PinState) {
    const index = arduinoState.components.indexOf(pinState);
    arduinoState.components[index] = new PinState(
      stringToPin(pin),
      PIN_TYPE.ANALOG_OUTPUT,
      fadeNumber,
      PinPicture.LED,
      pinState.color
    );
  } else {
    const color = randomLedColor();
    arduinoState.components.push(
      new PinState(
        stringToPin(pin),
        PIN_TYPE.ANALOG_OUTPUT,
        fadeNumber,
        PinPicture.LED,
        color
      )
    );
  }

  return [new ArduinoFrame(block.id, arduinoState, frameLocation)];
};

const LEDS_COLORS = [
  { red: 170, green: 0, blue: 0 },
  { red: 170, green: 0, blue: 0 },
  { red: 240, green: 225, blue: 68 },
  { red: 170, green: 0, blue: 170 },
  { red: 0, green: 170, blue: 0 }
];

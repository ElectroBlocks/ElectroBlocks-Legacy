import { ARDUINO_UNO_PINS } from '../arduino/arduino_frame';

export const duplicatePinWarningTextBlocks: {
  [key: string]: { pins: ARDUINO_UNO_PINS[]; message: string };
} = {
  led_matrix_make_draw: {
    pins: [
      ARDUINO_UNO_PINS.PIN_10,
      ARDUINO_UNO_PINS.PIN_11,
      ARDUINO_UNO_PINS.PIN_12
    ],
    message: 'Please make sure no components use pin, 10, 11, or 12'
  },
  led_matrix_turn_one_on_off: {
    pins: [
      ARDUINO_UNO_PINS.PIN_10,
      ARDUINO_UNO_PINS.PIN_11,
      ARDUINO_UNO_PINS.PIN_12
    ],
    message: 'Please make sure no components use pin, 10, 11, or 12'
  }
};

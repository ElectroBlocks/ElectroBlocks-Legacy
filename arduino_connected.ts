const serialport = require('serialport');

import { interval, from } from 'rxjs';
import {
  switchMap,
  map,
  distinctUntilChanged,
  tap,
  startWith,
  share,
  publishReplay
} from 'rxjs/operators';

/**
 * Helper function to determine if usb port is an arduino.
 *
 * @param port
 * @returns {boolean}
 */
function isArduino(port) {
  if (port.vendorId || port.productId) {
    return (
      port.vendorId === '2341' ||
      port.productId === '0043' ||
      port.vendorId === '0x2341' ||
      port.productId === '0x0043'
    );
  }

  return false;
}

export const arduinoConnectted$ = interval(500).pipe(
  switchMap(() => from(serialport.list())),
  map((usbs: []) => usbs.filter(isArduino)),
  map((usbs: []) => usbs.length > 0),
  distinctUntilChanged(),
  startWith(false)
);

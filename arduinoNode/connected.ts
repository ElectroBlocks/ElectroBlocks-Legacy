import * as SerialPort from 'serialport';

import { interval, from, Observable } from 'rxjs';
import {
  switchMap,
  map,
  distinctUntilChanged,
  startWith,
  share
} from 'rxjs/operators';

/**
 * Helper function to determine if usb port is an arduino.
 *
 * @param port
 * @returns {boolean}
 */
export const isArduino = port => {
  if (port.vendorId || port.productId) {
    return (
      port.vendorId === '2341' ||
      port.productId === '0043' ||
      port.vendorId === '0x2341' ||
      port.productId === '0x0043'
    );
  }

  return false;
};

export const arduinoPorts$: Observable<SerialPort.PortInfo> = interval(
  500
).pipe(
  switchMap(() => from((SerialPort as any).list())),
  map((usbs: SerialPort.PortInfo[]) => usbs.filter(isArduino)[0]),
  distinctUntilChanged((prev, curr) => {
    if (curr === prev) {
      return true;
    }

    if (curr === undefined && prev) {
      return false;
    }

    if (prev === undefined && curr) {
      return false;
    }

    return prev.comName === curr.comName;
  }),
  share()
);

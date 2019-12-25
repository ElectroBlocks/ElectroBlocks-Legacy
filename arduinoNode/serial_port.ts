const SerialPort = require('serialport');
const Delimiter = require('@serialport/parser-delimiter');

import { BehaviorSubject } from 'rxjs';
import { interval, from, Observable } from 'rxjs';
import { switchMap, map, distinctUntilChanged, share } from 'rxjs/operators';

interface PortInfo {
  comName: string;
  manufacturer?: string;
  serialNumber?: string;
  pnpId?: string;
  path: string;
  locationId?: string;
  productId?: string;
  vendorId?: string;
}

export enum ArduinoOnlineState {
  DISCONNECTED = 'DISCONNECTED',
  CONNECTED = 'CONNECTED',
  UPLOADING_CODE = 'UPLOADING_CODE',
  UPLOAD_CODE_COMPLETE = 'UPLOAD_CODE_COMPLETE'
}

let serialPortConnection: typeof SerialPort | any;

const subjectSerialOutput = new BehaviorSubject<string>('');

export const serialOutput$ = subjectSerialOutput.pipe(share());

export const openSerialPort = async (
  portInfo: PortInfo
): Promise<ArduinoOnlineState> => {
  if (!portInfo) {
    return ArduinoOnlineState.DISCONNECTED;
  }

  const error = await closerSerialPort();

  console.log('close error ', error);

  serialPortConnection = new SerialPort(portInfo.path, {
    baudRate: 9600,
    autoOpen: true
  });

  const parser = serialPortConnection.pipe(new Delimiter({ delimiter: '\n' }));

  parser.on('data', (line: Buffer) => {
    subjectSerialOutput.next(
      line.toString('utf8', 0, line.toJSON().data.length - 1)
    );
  });

  serialPortConnection.on('close', () => {
    console.log('Serial Port was closed');
  });

  const err = await new Promise((res, rej) => {
    serialPortConnection.on('open', err => {
      res(err);
    });
  });

  if (err) {
    console.error(err, 'opening serial port error');
    return ArduinoOnlineState.DISCONNECTED;
  } else {
    return ArduinoOnlineState.CONNECTED;
  }
};

export const closerSerialPort = async () => {
  if (serialPortConnection === undefined) {
    return;
  }
  await new Promise((res, rej) => {
    serialPortConnection.close(err => res(err));
  });
};

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

export const arduinoPorts$: Observable<ArduinoOnlineState> = interval(500).pipe(
  switchMap(() => from((SerialPort as any).list())),
  map((usbs: PortInfo[]) => usbs.filter(isArduino)[0]),
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
  switchMap(usbInfo => from(openSerialPort(usbInfo))),
  share()
);

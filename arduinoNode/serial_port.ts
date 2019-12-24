import { arduinoPorts$ } from './connected';
import { share } from 'rxjs/operators';
const SerialPort = require('serialport');
import { BehaviorSubject } from 'rxjs';
const Delimiter = require('@serialport/parser-delimiter');

let serialPortConnection: typeof SerialPort | any;

const subjectSerialOutput = new BehaviorSubject<string>('');

export const serialOutput$ = subjectSerialOutput.pipe(share());

arduinoPorts$.subscribe(async (portInfo: typeof SerialPort.PortInfo) => {
  if (!portInfo) {
    return;
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
    throw new Error(err.toString());
  } else {
    console.log('open was successful');
  }
});

export const closerSerialPort = async () => {
  if (serialPortConnection === undefined) {
    return;
  }
  await new Promise((res, rej) => {
    serialPortConnection.close(err => res(err));
  });
};

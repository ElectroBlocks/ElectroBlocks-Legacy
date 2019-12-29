const SerialPort = require('serialport');
const Delimiter = require('@serialport/parser-delimiter');
const AvrGirl = require('avrgirl-arduino');
const path = require('path');
const fs = require('fs');

import { BehaviorSubject, Subject } from 'rxjs';
import { share } from 'rxjs/operators';
import * as Promisify from 'bluebird';
import axios from 'axios';

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
  UPLOAD_CODE_COMPLETE = 'UPLOAD_CODE_COMPLETE',
  UPLOAD_CODE_ERROR = 'UPLOAD_CODE_ERROR'
}

export class SerialPortArduino {
  public static readonly ARDUINO_FILE = path.join(
    '/',
    'tmp',
    'Arduino.cpp.hex'
  );

  public static readonly ARDUINO_TEMP_FOLDER = path.join('/', 'tmp');

  public static readonly DEFAULT_ARDUINO_URL =
    'http://arduino-compile.noahglaser.net/upload-code/uno';

  private timeOut: NodeJS.Timeout;

  private portInfo: PortInfo = null;

  private serialPortConnection: typeof SerialPort | any;

  private uploadingCode = false;

  private serialPortStatusSubject = new BehaviorSubject<ArduinoOnlineState>(
    ArduinoOnlineState.DISCONNECTED
  );

  private serialOutputSubject = new Subject<string>();

  public readonly serialOutput$ = this.serialOutputSubject
    .asObservable()
    .pipe(share());

  public readonly serialPortStatus$ = this.serialPortStatusSubject
    .asObservable()
    .pipe(share());

  public static isArduino(port: PortInfo): boolean {
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

  constructor() {
    this.runSerialPortCheck();
  }

  private runSerialPortCheck() {
    this.timeOut = setInterval(async () => {
      await this.checkSerialPort();
    }, 500);
  }

  private async checkSerialPort() {
    try {
      if (this.uploadingCode) {
        return;
      }
      const [arduinoUnoSerialPort] = (await SerialPort.list()).filter(port =>
        SerialPortArduino.isArduino(port)
      );

      this.portInfo = arduinoUnoSerialPort;

      if (this.serialPortConnection === undefined && this.portInfo) {
        this.open();
        return;
      }

      if (this.serialPortConnection) {
        return;
      }
      this.serialPortStatusSubject.next(ArduinoOnlineState.DISCONNECTED);
    } catch (e) {
      console.error(e, 'CHECKING_SERIAL_PORT');
      this.serialPortStatusSubject.next(ArduinoOnlineState.DISCONNECTED);
    }
  }

  private async open() {
    this.serialPortConnection = new SerialPort(this.portInfo.path, {
      baudRate: 9600,
      autoOpen: true
    });

    const parser = this.serialPortConnection.pipe(
      new Delimiter({ delimiter: '\n' })
    );

    parser.on('data', (line: Buffer) => {
      this.serialOutputSubject.next(
        line.toString('utf8', 0, line.toJSON().data.length - 1)
      );
    });

    this.serialPortConnection.on('close', () => {
      this.serialPortConnection = undefined;
      if (!this.uploadingCode) {
        this.serialPortStatusSubject.next(ArduinoOnlineState.DISCONNECTED);
      }
      console.log('Serial Port was closed');
    });

    await new Promise((res, rej) => {
      this.serialPortConnection.on('open', (portOpenError: Error) =>
        portOpenError ? rej(portOpenError) : res(undefined)
      );
    });

    this.serialPortStatusSubject.next(ArduinoOnlineState.CONNECTED);
  }

  private async close() {
    await new Promise((res, rej) => {
      if (!this.serialPortConnection) {
        res(undefined);
      }
      this.serialPortConnection.close(err => (err ? rej(err) : res(undefined)));
    });

    this.serialPortConnection = undefined;
    await Promisify.delay(300);
  }

  private writeArduinoHexFile(code) {
    if (!fs.existsSync(SerialPortArduino.ARDUINO_TEMP_FOLDER)) {
      fs.mkdirSync(SerialPortArduino.ARDUINO_TEMP_FOLDER);
    }

    if (fs.existsSync(SerialPortArduino.ARDUINO_FILE)) {
      fs.unlinkSync(SerialPortArduino.ARDUINO_FILE);
    }
    fs.writeFileSync(SerialPortArduino.ARDUINO_FILE, code);
  }

  public isOpen() {
    return this.serialPortConnection === undefined;
  }

  public async sendMessage(message: string) {
    if (this.serialPortConnection) {
      this.serialPortConnection.write(message);
      return;
    }

    console.log('error no serial port');
  }

  public async flashArduino(code: string) {
    try {
      if (this.uploadingCode) {
        return;
      }
      this.uploadingCode = true;
      this.serialPortStatusSubject.next(ArduinoOnlineState.UPLOADING_CODE);
      clearInterval(this.timeOut);
      await this.close();

      const response = await axios.post(
        SerialPortArduino.DEFAULT_ARDUINO_URL,
        code,
        {
          headers: { 'Content-Type': 'text/plain' }
        }
      );

      this.writeArduinoHexFile(response.data);

      const avrgirl = new AvrGirl({
        board: 'uno',
        port: this.portInfo.path
      });

      await new Promise((res, rej) => {
        avrgirl.flash(SerialPortArduino.ARDUINO_FILE, error =>
          error ? rej(error) : res(undefined)
        );
      });

      this.serialPortStatusSubject.next(
        ArduinoOnlineState.UPLOAD_CODE_COMPLETE
      );
      this.uploadingCode = false;
      this.runSerialPortCheck();
    } catch (e) {
      console.error(e, 'UPLOADING_ERROR');
      this.uploadingCode = false;
      this.serialPortStatusSubject.next(ArduinoOnlineState.UPLOAD_CODE_ERROR);

      this.runSerialPortCheck();
    }
  }
}

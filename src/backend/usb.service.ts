import  * as SerialPort  from 'serialport';
import { fromPromise } from "rxjs/observable/fromPromise";
import { Observable, Subject } from "rxjs";
import { interval } from "rxjs/observable/interval";
import { switchMap, map, share } from "rxjs/operators";
import Delimiter = SerialPort.parsers.Delimiter;

export class UsbService {

	public usb$: Observable<SerialPort.PortInfo|undefined> =
		interval(500)
			.pipe(
				switchMap(() => fromPromise(SerialPort.list())),
				map((ports: SerialPort.PortInfo[]) =>
					ports.find(port => this.isArduino(port))),
				share()
			);

	private messageSubject = new Subject<string>();

	public readonly message$ = this.messageSubject.asObservable().pipe(share());

	private serialPort: SerialPort;

	/**
	 * Connects the usb and start the message observable
	 */
	public async connect() {
		if (!this.isClosed()) {
			return true;
		}

		const arduinoUsb = await this.getArduinoUsbPort();

		if (!arduinoUsb) {
			return false;
		}

		this.serialPort = new SerialPort(arduinoUsb.comName.toString(), {
			baudRate: 115200,
			autoOpen: true
		});

		const parser = this.serialPort.pipe(new Delimiter({ delimiter: '\n' }));

		parser.on('data', line => {
			this.messageSubject.next(line)
		});

		return true;
	}

	/**
	 * Sends a message to the arduino
	 * @param message
	 */
	public async sendMessage(message: string) {
		const isConnected = await this.connect();
		if (isConnected) {
			this.serialPort.write(message);
		}
	}

	/**
	 * Returns true if the serial port is closed
	 */
	public isClosed() {
		return !this.serialPort || !this.serialPort.isOpen;
	}

	/**
	 * Closes the serial port / usb port
	 */
	public close() {

		if (!this.serialPort) {
			return;
		}

		this.serialPort.close();
	}

	/**
	 * Returns true if the serial port is an Arduino Uno
	 */
	public isArduino(port: SerialPort.PortInfo) {
		if (port.vendorId || port.productId) {
			return port.vendorId == '2341' || port.productId == '0043' ||
				port.vendorId == '0x2341' || port.productId == '0x0043';
		}

		return false;
	}

	/**
	 * Gets the usb serial port that is an arduino uno.
	 */
	public async getArduinoUsbPort() {
		const usbPorts = await SerialPort.list();

		return usbPorts.find(usbPort => this.isArduino(usbPort));
	}
}

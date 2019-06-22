const AvrgirlArduino = require('avrgirl-arduino');
import * as fs from "fs";
import * as path from "path";
import { UsbService } from "./usb.service";
import axios from 'axios';

export class UploadService {

	public static readonly ARDUINO_FILE = path.join('/', 'tmp', 'Arduino.cpp.hex');

	public static readonly ARDUINO_TEMP_FOLDER = path.join('/', 'tmp');

	public static readonly DEFAULT_ARDUINO_URL = 'http://arduino-compile.noahglaser.net/upload-code/uno';

	private url = UploadService.DEFAULT_ARDUINO_URL;

	constructor(private usbService: UsbService ) { }

	/**
	 * Uploads the code to arduino
	 * Code is compiled on an external server
	 */
	public async uploadCode(code: string) {
		this.usbService.close();
		const arduinoUsb = await this.usbService.getArduinoUsbPort();

		const response = await axios.post<string>(this.url, code, {
			headers: {'Content-Type': 'text/plain'}
		});

		this.createCodeFile(response.data);
		await this.flashArduino(arduinoUsb.comName);
		await this.usbService.connect();
	}

	public setUploadUrl(url: string) {
		this.url = url;
	}

	/**
	 * Uploads the code to the Arduino
	 */
	private async flashArduino(portName: string) {
		const avrgirlArduino = new AvrgirlArduino({
			port: portName,
			manualReset: true,
			board: 'uno'
		});

		await new Promise((res, rej) => {
			avrgirlArduino.flash(UploadService.ARDUINO_FILE, (err: Error) => {
				if (err) {
					rej(err);
					return;
				}

				res(undefined);
			});

		});

	}

	/**
	 * Creates the hex file to upload to the Arduino
	 */
	private createCodeFile(code: string) {
		if (!fs.existsSync(UploadService.ARDUINO_TEMP_FOLDER)) {
			fs.mkdirSync(UploadService.ARDUINO_TEMP_FOLDER);
		}

		if (fs.existsSync(UploadService.ARDUINO_FILE)) {
			fs.unlinkSync(UploadService.ARDUINO_FILE);
		}

		console.log(code, 'to file');
		fs.writeFileSync(UploadService.ARDUINO_FILE, code);
	}
}

import AvrgirlArduino from 'avrgirl-arduino';
import * as util from "util";
import * as fs from "fs";
import * as path from "path";
import { UsbService } from "./usb.service";
import axios from 'axios';

class UploadService {

	public static readonly ARDUINO_FILE = path.join('/', 'tmp', 'Arduino.cpp.hex');

	public static readonly ARDUINO_TEMP_FOLDER = path.join('/', 'tmp');

	public static readonly DEFAULT_ARDUINO_URL = 'http://arduino-compile.noahglaser.net/upload-code/uno';

	private url = UploadService.DEFAULT_ARDUINO_URL;

	constructor(private usbService: UsbService ) { }

	public async uploadCode(code: string) {
		const [arduinoUsb] = await Promise.all([
			this.usbService.getArduinoUsbPort(),
			this.usbService.close()
		]);

		const response = await axios.post<string>(this.url, code, {
			headers: {'Content-Type': 'text/plain'}
		});

		this.createCodeFile(response.data);
		await this.flashArduino(arduinoUsb.comName);
		await this.usbService.connect();
	}

	private setUrl(url: string) {
		this.url = url;
	}


	private async flashArduino(portName: string) {
		const avrgirlArduino = new AvrgirlArduino({
			port: portName,
			manualReset: true,
			board: 'uno'
		});

		const uploadCode = util.promisify(avrgirlArduino.flash);
		await uploadCode(UploadService.ARDUINO_FILE);
	}

	private createCodeFile(code: string) {
		if (!fs.existsSync(UploadService.ARDUINO_TEMP_FOLDER)) {
			fs.mkdirSync(UploadService.ARDUINO_TEMP_FOLDER);
		}

		if (fs.existsSync(UploadService.ARDUINO_FILE)) {
			fs.unlinkSync(UploadService.ARDUINO_FILE);
		}

		fs.writeFileSync(UploadService.ARDUINO_FILE, code);
	}
}

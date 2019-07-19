import { ComponentSvg } from "./component.svg";
import { ArduinoState } from "../../arduino/state/arduino.state";
import { ElectricAttachmentComponentState } from "../../arduino/state/electric.state";
import { NeoPixelStripState } from "../../arduino/state/neo_pixel_strip.state";
import { Parent } from "svg.js";
import { ARDUINO_UNO_PINS } from "../../arduino/pin";
import { Color } from "../../frame_genorator/colour";
import { virtualCircuitPin } from "./arduino.svg";


export class NeopixelSvg extends ComponentSvg {

	constructor(public readonly svg: Parent,
	            public readonly numberOfLeds: number,
	            public readonly pin: ARDUINO_UNO_PINS) {
		super(svg);
		this.setNumberOfNeoPixels();
		this.arduinoPins.push(this.pin);
	}

	isComponent( component: ElectricAttachmentComponentState ): boolean {
		return component instanceof NeoPixelStripState &&
			component.analogPin == this.pin &&
			component.numberOfLeds == this.numberOfLeds;
	}

	matchState( state: ArduinoState ): void {
		const neoPixelState = state.components.find(state => this.isComponent(state)) as NeoPixelStripState;

		neoPixelState.neoPixels.forEach(pixel => {
			this.setPixelColor(pixel.position, pixel.color);
		})
	}

	shouldExist( state: ArduinoState ): boolean {
		const neoPixelState = state.components.find(state => this.isComponent(state)) as NeoPixelStripState;

		return neoPixelState !== undefined;
	}

	setPixelColor(position: number, color: Color) {

		this.svg.select(`#LED-${position} circle`)
			.first()
			.fill({ r: color.red, g: color.green, b: color.blue } as any)
	}

	setNumberOfNeoPixels() {
		for (let i = 1; i <= 60; i += 1) {
			const led = this.svg.select(`#_${i}`)
				.first();

			if (!led) {
				return;
			}

			if (i <= this.numberOfLeds) {
				led.show();
			}

			if (i > this.numberOfLeds) {
				led.hide();
			}
		}

		if (this.numberOfLeds < 12) {
			this.svg.select('#LEVEL1').first().hide();
			this.svg.select('#LEVEL2').first().hide();
			this.svg.select('#LEVEL3').first().hide();
			this.svg.select('#LEVEL4').first().hide();
		}

		if (this.numberOfLeds > 12) {
			this.svg.select('#LEVEL1').first().show();
			this.svg.select('#LEVEL2').first().hide();
			this.svg.select('#LEVEL3').first().hide();
			this.svg.select('#LEVEL4').first().hide();
		}

		if (this.numberOfLeds > 24) {
			this.svg.select('#LEVEL1').first().show();
			this.svg.select('#LEVEL2').first().show();
			this.svg.select('#LEVEL3').first().hide();
			this.svg.select('#LEVEL4').first().hide();
		}

		if (this.numberOfLeds > 36) {
			this.svg.select('#LEVEL1').first().show();
			this.svg.select('#LEVEL2').first().show();
			this.svg.select('#LEVEL3').first().show();
			this.svg.select('#LEVEL4').first().hide();
		}

		if (this.numberOfLeds > 48) {
			this.svg.select('#LEVEL1').first().show();
			this.svg.select('#LEVEL2').first().show();
			this.svg.select('#LEVEL3').first().show();
			this.svg.select('#LEVEL4').first().show();
		}
	}

}

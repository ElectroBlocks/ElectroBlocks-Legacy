import { ComponentSvg } from "./component.svg";
import { ElectricAttachmentComponentState } from "../../arduino/state/electric.state";
import { ArduinoState } from "../../arduino/state/arduino.state";
import { Parent, Text } from "svg.js";
import { ARDUINO_UNO_PINS } from "../../arduino/arduino_frame";
import { PIN_TYPE, PinPicture, PinState } from "../../arduino/state/pin.state";
import { Color, rgbToHex } from "../../frame_genorator/color";
import { Resistor } from "./resistor";

export class LedSvg  extends ComponentSvg {


	constructor( public readonly svg: Parent,
	             public readonly pin: ARDUINO_UNO_PINS,
	             public readonly color: Color,
	             public readonly resistor: Resistor) {
		super( svg );
		this.arduinoPins.push(this.pin);

		const ledText = this.svg.select('#LED_TEXT').first() as Text;
		ledText.node.textContent = `Led ${this.pin.toString()}`;
		ledText.x( ledText.bbox().w > 39 ? -5 : 0);

		this.svg
			.select(`#radial-gradient-${this.pin} stop`)
			.last()
			.attr("stop-color", rgbToHex(color));

	}


	isComponent( component: ElectricAttachmentComponentState ): boolean {

		return component instanceof PinState &&
			   component.pinPicture == PinPicture.LED &&

		       component.pin == this.pin;
	}

	matchState( state: ArduinoState ): void {
		const led = state.components
			.find(component => this.isComponent(component)) as PinState;

		if (led === undefined) {
			this.svg.select('#ON').first().hide();
			return;
		}

		if (led.type == PIN_TYPE.DIGITAL && led.state >= 1) {
			this.svg.select('#ON').first().show();
			return;
		}

		if (led.type == PIN_TYPE.DIGITAL && led.state <= 0) {
			this.svg.select('#ON').first().hide();
			return;
		}

		if (led.type == PIN_TYPE.ANALOG) {

			const brightness = led.state > 255 ? 1 : Math.abs(led.state) / 255;

			this.svg.select('#ON').first().show().opacity(brightness);
			return;
		}
	}

	shouldExist( state: ArduinoState ): boolean {
		return state.components
			.find(component => this.isComponent(component)) !== undefined;
	}

	remove(): void {
		super.remove();
		this.resistor.remove();
	}

}
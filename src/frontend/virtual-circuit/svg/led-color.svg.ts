import { ComponentSvg } from "./component.svg";
import { ArduinoState } from "../../arduino/state/arduino.state";
import { ElectricAttachmentComponentState } from "../../arduino/state/electric.state";
import { LedColorState } from "../../arduino/state/led_color.state";
import { rgbToHex } from "../../frame_genorator/color";
import { Parent } from "svg.js";
import { ARDUINO_UNO_PINS } from "../../arduino/arduino_frame";
import { Resistor } from "./resistor";


export class LedColorSvg  extends ComponentSvg {

	constructor (public readonly svg: Parent,
	             public redPin: ARDUINO_UNO_PINS,
	             public greenPin: ARDUINO_UNO_PINS,
	             public bluePin: ARDUINO_UNO_PINS,
	             public readonly type: "BUILT_IN"|"BREADBOARD",
	             public readonly resistors: Resistor[] = []) {
		super(svg);
		this.arduinoPins.push(redPin, bluePin, greenPin);
	}

	isComponent( component: ElectricAttachmentComponentState ): boolean {
		return component instanceof LedColorState &&
			component.greenPin === this.greenPin &&
			component.bluePin === this.bluePin &&
			component.redPin === this.redPin &&
			component.type === this.type;
	}

	matchState( state: ArduinoState ): void {
		const ledColorState = state.components
			.find(c => c instanceof LedColorState) as LedColorState;

		if (!ledColorState) {
			return;
		}

		let colorHex = rgbToHex(ledColorState.color);

		this.setColor(colorHex);
	}

	setColor(colorHex: string) {

		colorHex = colorHex === '#000000' ? '#FFFFFF' : colorHex;

		const selectedColorPart = this.svg
			.select(`#COLOR_LED > path`)
			.first();

		selectedColorPart.fill(colorHex);
	}

	shouldExist( state: ArduinoState ): boolean {
		return state.components.find(c => this.isComponent(c)) != undefined;
	}

	updateWires() {
		super.updateWires();
		this.resistors.forEach(resistor => {
			resistor.updateWires();
		});
	}

	remove(): void {
		super.remove();
		this.resistors.forEach(resistor => {
			resistor.remove();
		});
	}

}

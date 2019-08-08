import { ArduinoSvg, virtualCircuitPin } from "./arduino.svg";
import { ArduinoState } from "../../arduino/state/arduino.state";
import { ElectricAttachmentComponentState } from "../../arduino/state/electric.state";
import { G } from "svg.js";
import { servoFactory } from "../factory/servo-svg.factory";
import { ServoState } from "../../arduino/state/servo.state";
import { ComponentSvg } from "./component.svg";
import { NeoPixelStripState } from "../../arduino/state/neo_pixel_strip.state";
import { neoPixelFactory } from "../factory/neopixel-svg.factory";
import { LedMatrixState } from "../../arduino/state/led_matrix.state";
import { matrixFactory } from "../factory/matrix-svg.factory";
import { PinState } from "../../arduino/state/pin.state";
import { pinFactory } from "../factory/led.factory";
import { LedColorState } from "../../arduino/state/led_color.state";
import { rgbLedFactory } from "../factory/led-color.factory";
import { LCDScreenState } from "../../arduino/state/lcd_screen.state";
import { lcdFactory } from "../factory/lcd-svg.factory";


export class VirtualCircuit {

	private svgs: ComponentSvg[] = [];

	constructor( public readonly baseSVG: svgjs.Doc,
	             public readonly nodes: G,
	             public readonly arduino: ArduinoSvg,
	             public readonly zoom: {
		             transform?:
			             {
				             scaleX: number,
				             scaleY: number,
				             transformedX: number,
				             transformedY: number
			             }
	             } ) {
		this.arduino.svg.on("dragstart", () => {
			this.updateWires();
		});

		this.arduino.svg.on("dragmove", () => {
			this.updateWires();
		});

		this.arduino.svg.on("dragend", () => {
			this.updateWires();
		});

	}

	protected updateWires() {
		this.svgs.forEach(svg => {
			svg.updateWires();
		});
	}

	public matchState( state: ArduinoState ) {
		this.arduino.matchState( state );

		this.svgs.forEach( ( svg ) => {
			svg.matchState( state );
		} );
	}

	matchFinalState( state: ArduinoState, runSetup: boolean) {

		if (!runSetup) {
			return;
		}

		this.svgs.forEach( ( svg ) => {
			if (!svg.shouldExist( state )) {
				svg.remove();
				svg.getArduinoPins().forEach(pin => {
					this.arduino.hideWire(virtualCircuitPin(pin));
				});
				this.svgs = this.svgs.filter( svgCompare => svgCompare !== svg );

			}
		} );

		state.components.forEach( component => {
			const doesComponentExist = this
				.svgs
				.filter( svg => svg.isComponent( component ) )
				.length > 0;

			if (!doesComponentExist) {
				this.createComponent( component );
			}
		} );
	}

	createComponent( component: ElectricAttachmentComponentState ) {
		if (component instanceof ServoState) {
			this.svgs.push( servoFactory( this, component ) );
			return;
		}

		if (component instanceof NeoPixelStripState) {
			this.svgs.push(neoPixelFactory(this, component));
			return;
		}

		if (component instanceof LedMatrixState) {
			this.svgs.push(matrixFactory(this, component));
			return;
		}

		if (component instanceof PinState) {
			pinFactory(this, component)
				.forEach(component => this.svgs.push(component));
			return;
		}

		if (component instanceof LedColorState) {
			this.svgs.push(rgbLedFactory(this, component));
			return;
		}

		if (component instanceof LCDScreenState) {
			this.svgs.push(lcdFactory(this, component));
			return;
		}
	}

	public reset() {
		this.svgs.forEach(component => {
			component.getArduinoPins().forEach(pin => {
				this.arduino.hideWire(virtualCircuitPin(pin));
			});
			component.remove()
		});
		this.svgs.forEach(c => {
			c = undefined;
		});

		this.svgs = [];
	}
}




